import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PartidaHud } from '../../components/partida-hud/partida-hud';
import { PartidaMapa } from '../../components/partida-mapa/partida-mapa';
import { WebsocketService } from '../../services/websocket-service';
import { DataService } from '../../services/data-service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule, PartidaHud, PartidaMapa],
  templateUrl: './partida.html',
  styleUrl: './partida.css',
})
export class Partida implements OnInit, OnDestroy {
  partidaId!: string;
  accionActual: 'Mover' | 'Disparar' | 'Poner' | null = null;
  tanqueEnMano: any = null; 

  gameState = signal<any>(null);
  
  misTanquesSeleccionados: any[] = [];
  misTanquesNoColocados: any[] = [];
  
  rivales: any[] = [];
  miUsuario: any = null;

  timerTurnoStr = '00:30';
  timerTotalStr = '15:00';
  private localTimer: any;
  private timeTotalNum = 15 * 60;
  private timeTurnoNum = 30;

  // Fuente de verdad para datos estáticos (avatars, etc.)
  jugadoresInfo: Map<string, any> = new Map();

  private socketSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.partidaId = params['partidaId'];
      this.cargarDatosYConectar();
    });
    this.iniciarTimersLocales();
  }

  iniciarTimersLocales() {
    if (this.localTimer) clearInterval(this.localTimer);
    this.localTimer = setInterval(() => {
      if (this.gameState()?.estado === 'JUGANDO') {
        this.timeTotalNum = Math.max(0, this.timeTotalNum - 1);
        this.timeTurnoNum = Math.max(0, this.timeTurnoNum - 1);
        this.actualizarStringsTimers();
      }
    }, 1000);
  }

  actualizarStringsTimers() {
    const minT = Math.floor(this.timeTotalNum / 60).toString().padStart(2, '0');
    const secT = (this.timeTotalNum % 60).toString().padStart(2, '0');
    this.timerTotalStr = `${minT}:${secT}`;

    const minTu = Math.floor(this.timeTurnoNum / 60).toString().padStart(2, '0');
    const secTu = (this.timeTurnoNum % 60).toString().padStart(2, '0');
    this.timerTurnoStr = `${minTu}:${secTu}`;
  }

  cargarDatosYConectar() {
    console.log('[FRONT][Partida] 🛰️ Cargando datos iniciales...');
    
    forkJoin({
      partidaApi: this.dataService.getEstadoPartida(Number(this.partidaId)),
      todosLosTanques: this.dataService.obtenerTanques()
    }).subscribe({
      next: ({ partidaApi, todosLosTanques }) => {
        const miNick = sessionStorage.getItem('nickname')?.toLowerCase();
        
        // Guardar información estática de todos los jugadores
        partidaApi.jugadoresList.forEach((j: any) => {
          this.jugadoresInfo.set(j.nickname.toLowerCase(), {
            nickname: j.nickname,
            avatar: j.iconoImagen,
            pa: j.pa || 100
          });
        });

        const miJugadorApi = partidaApi.jugadoresList.find((j: any) => j.nickname.toLowerCase() === miNick);
        
        if (miJugadorApi) {
          const idsElegidos = (miJugadorApi.tanquesIds || []).map((id: any) => Number(id));
          this.misTanquesSeleccionados = todosLosTanques
            .filter(t => idsElegidos.includes(Number(t.id)))
            .map(t => ({
              ...t,
              vida: t.hp || 100,
              costePoner: t.costePoner || 10,
              costeAtacar: t.costeAtacar || 15,
              costeMover: t.costeMover || 5
            }));
          
          this.misTanquesNoColocados = [...this.misTanquesSeleccionados];
          console.log('[FRONT][Partida] 🛡️ Tanques listos para el drawer:', this.misTanquesSeleccionados.length);
        }

        // Inicializar HUD con datos de la API antes de que llegue el socket
        this.miUsuario = this.jugadoresInfo.get(miNick || '');
        this.rivales = Array.from(this.jugadoresInfo.values()).filter(j => j.nickname.toLowerCase() !== miNick);

        this.conectarSocket();
      },
      error: (err) => {
        console.error('[FRONT][Partida] ❌ Error cargando datos:', err);
        this.conectarSocket();
      }
    });
  }

  ngOnDestroy() {
    this.socketSub?.unsubscribe();
    if (this.localTimer) clearInterval(this.localTimer);
  }

  conectarSocket() {
    this.websocketService.listen('partidaIniciada').subscribe((res: any) => this.actualizarEstado(res.estado));
    this.websocketService.listen('turnoCambiado').subscribe((res: any) => this.actualizarEstado(res.estado));
    this.websocketService.listen('tanqueColocado').subscribe((res: any) => this.actualizarEstado(res.estado));
    this.websocketService.listen('tanqueMovido').subscribe((res: any) => this.actualizarEstado(res.estado));
    this.websocketService.listen('ataqueRealizado').subscribe((res: any) => this.actualizarEstado(res.estado));
    
    this.websocketService.listen('error').subscribe((res: any) => {
      console.error('[FRONT][Partida] Error del servidor:', res.error);
      alert('Error en partida: ' + res.error);
    });

    this.websocketService.emit('obtenerEstadoPartida', { partidaId: this.partidaId });
    this.websocketService.listen('estadoPartida').subscribe((res: any) => {
      if (res.estado) this.actualizarEstado(res.estado);
    });
  }

  actualizarEstado(estado: any) {
    if (!estado) return;
    this.gameState.set(estado);

    if (estado.timeLeft) {
      this.timeTotalNum = estado.timeLeft.total || 15 * 60;
      this.timeTurnoNum = estado.timeLeft.turno || 30;
      this.actualizarStringsTimers();
    }
    
    const miNick = sessionStorage.getItem('nickname')?.toLowerCase();
    const jugadoresSocket = Object.values(estado.jugadores);
    
    // Mezclar datos de perfil (API) con datos de estado (Socket - PA, Turno)
    const jugadoresMezclados = jugadoresSocket.map((js: any) => {
      const infoEstatica = this.jugadoresInfo.get(js.nickname.toLowerCase()) || {};
      return { ...infoEstatica, ...js };
    });

    this.miUsuario = jugadoresMezclados.find((j: any) => j.nickname.toLowerCase() === miNick);
    this.rivales = jugadoresMezclados.filter((j: any) => j.nickname.toLowerCase() !== miNick);

    // Actualizar tanques no colocados
    if (this.miUsuario) {
        // En el estado, tanquesColocados es una lista de {id, x, y}
        const idsColocados = (estado.tanques || [])
          .filter((t: any) => t.propietarioId === this.miUsuario.id)
          .map((t: any) => Number(t.id));

        this.misTanquesNoColocados = this.misTanquesSeleccionados.filter(t => !idsColocados.includes(Number(t.id)));
    }
  }

  onActionSelected(accion: 'Mover' | 'Disparar' | 'Poner' | null) {
    this.accionActual = (this.accionActual === accion) ? null : accion;
    this.tanqueEnMano = null;
  }

  onTankSelected(tanque: any) {
    this.tanqueEnMano = tanque;
    console.log('[FRONT][Partida] 🎯 Tanque seleccionado:', tanque.nombre);
  }

  onMapaClick(pos: {x: number, y: number}) {
    if (this.accionActual === 'Poner' && this.tanqueEnMano) {
      this.websocketService.emit('colocarTanque', {
        partidaId: this.partidaId,
        tanqueId: this.tanqueEnMano.id,
        x: pos.x,
        y: pos.y,
        tanqueData: this.tanqueEnMano
      });
    }
  }
}
