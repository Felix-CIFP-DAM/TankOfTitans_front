import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PartidaHud } from '../../components/partida-hud/partida-hud';
import { PartidaMapa } from '../../components/partida-mapa/partida-mapa';
import { WebsocketService } from '../../services/websocket-service';
import { DataService } from '../../services/data-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  selectedTank: any = null;

  notification: { visible: boolean, message: string, submessage: string } = {
    visible: false,
    message: '',
    submessage: ''
  };

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

  private abandonSub?: Subscription;
  private isAbandoning = false;
  private isGameFinished = false;

  constructor(
    private router: Router,
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
    
    const idsGuardados: number[] = JSON.parse(localStorage.getItem('mis_tanques_ids') || '[]');
    console.log('[FRONT][Partida] 📋 IDs tanques desde localStorage:', idsGuardados);
    
    this.dataService.obtenerTanques().subscribe({
      next: (todosLosTanques: any[]) => {
        if (idsGuardados.length > 0) {
          this.misTanquesSeleccionados = todosLosTanques
            .filter(t => idsGuardados.includes(Number(t.id)))
            .map(t => ({
              ...t,
              vida: t.hp || 100,
              costePoner: t.costePoner || t.coste_poner || 10,
              costeAtacar: t.costeAtacar || t.coste_atacar || 15,
              costeMover: t.costeMover || t.coste_mover || 5
            }));
          this.misTanquesNoColocados = [...this.misTanquesSeleccionados];
          console.log('[FRONT][Partida] 🛡️ Tanques seleccionados listos:', this.misTanquesSeleccionados.map(t => t.nombre));
        }

        const miNick = sessionStorage.getItem('nickname') || '';
        const miIcono = sessionStorage.getItem('icono') || '';
        const miId = sessionStorage.getItem('userId') || '';
        this.miUsuario = { id: Number(miId), nickname: miNick, avatar: miIcono, pa: 100 };
        this.jugadoresInfo.set(miNick.toLowerCase(), this.miUsuario);

        this.conectarSocket();
      },
      error: (err) => {
        console.error('[FRONT][Partida] ❌ Error cargando tanques:', err);
        this.conectarSocket();
      }
    });
  }

  ngOnDestroy() {
    if (!this.isGameFinished && !this.isAbandoning && this.partidaId) {
      this.dataService.abandonarPartida(Number(this.partidaId));
    }
    this.socketSub?.unsubscribe();
    this.abandonSub?.unsubscribe();
    if (this.localTimer) clearInterval(this.localTimer);
  }

  conectarSocket() {
    this.websocketService.listen('partidaIniciada').subscribe((res: any) => {
      this.actualizarEstado(res.estado);
      const esMiTurno = String(res.estado.turnoActual) === String(this.miUsuario?.id);
      const nicknameTurno = esMiTurno ? 'TU TURNO' : (this.rivales[0]?.nickname || 'TURNO RIVAL');
      
      this.showNotification('¡PARTIDA INICIADA!', `Primer turno: ${nicknameTurno}`);
    });
    this.websocketService.listen('turnoCambiado').subscribe((res: any) => {
      console.log('[FRONT][Partida] 🔄 Turno cambiado. Estado:', res.estado);
      this.actualizarEstado(res.estado);
      const esMiTurno = String(res.estado.turnoActual) === String(this.miUsuario?.id);
      if (esMiTurno) {
        this.showNotification('ES TU TURNO', '¡Ataca o muévete!');
      }
    });
    
    this.websocketService.listen('partidaFinalizada').subscribe((res: any) => {
      console.log('[FRONT][Partida] 🏆 Partida finalizada:', res);
      
      const miId = this.miUsuario?.id;
      const soyGanador = String(res.ganadorId) === String(miId);
      const esEmpate = res.ganadorId === 'EMPATE';
      
      let title = '';
      let subtitle = '';
      
      if (esEmpate) {
        title = '¡EMPATE!';
        subtitle = 'Recompensa: 75 monedas';
      } else if (soyGanador) {
        title = '¡VICTORIA!';
        subtitle = 'Recompensa: 150 monedas';
      } else {
        title = 'DERROTA';
        subtitle = 'Recompensa: 50 monedas';
      }
      
      this.showNotification(title, subtitle);
      
      // Bloquear acciones
      this.gameState.update(s => ({ ...s, estado: 'FINALIZADA' }));

      // Redirigir al lobby (preparacion) tras unos segundos
      setTimeout(() => {
        this.router.navigate(['/preparacion'], { queryParams: { id: this.partidaId } });
      }, 6000);
    });

    this.websocketService.listen('tanqueColocado').subscribe((res: any) => {
      this.accionActual = null;
      this.tanqueEnMano = null;
      this.actualizarEstado(res.estado);
    });
    
    this.websocketService.listen('tanqueMovido').subscribe((res: any) => {
      // Reseteamos SOLO la acción tras mover (solicitud del usuario)
      this.accionActual = null;
      this.actualizarEstado(res.estado);
    });
    
    this.websocketService.listen('ataqueRealizado').subscribe((res: any) => {
      // Reseteamos SOLO la acción tras atacar (solicitud del usuario)
      this.accionActual = null;
      this.actualizarEstado(res.estado);
      
      if (res.hit === false) {
        this.showNotification('¡FALLO!', 'El proyectil no impactó en ningún tanque');
      }
    });
    
    this.websocketService.listen('error').subscribe((res: any) => {
      console.error('[FRONT][Partida] Error del servidor:', res.error);
      alert('Error en partida: ' + res.error);
    });

    this.websocketService.emit('obtenerEstadoPartida', { partidaId: this.partidaId });
    this.websocketService.listen('estadoPartida').subscribe((res: any) => {
      if (res.estado) this.actualizarEstado(res.estado);
    });

    this.abandonSub = this.websocketService.listen('jugadorAbandono').subscribe((datos: any) => {
      this.isGameFinished = true;
      alert(datos.message || 'El oponente ha abandonado la partida.');
      this.router.navigate(['/preparacion'], { queryParams: { id: this.partidaId } });
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
    const jugadoresSocket: any[] = Object.values(estado.jugadores);
    
    const jugadoresMezclados = jugadoresSocket.map((js: any) => ({
      ...js,
      avatar: js.iconoImagen || (this.jugadoresInfo.get((js.nickname || '').toLowerCase()) || {}).avatar || 'recluta.png'
    }));

    this.miUsuario = jugadoresMezclados.find((j: any) => (j.nickname || '').toLowerCase() === miNick);
    this.rivales = jugadoresMezclados.filter((j: any) => (j.nickname || '').toLowerCase() !== miNick);

    jugadoresMezclados.forEach((j: any) => {
      this.jugadoresInfo.set((j.nickname || '').toLowerCase(), j);
    });

    if (this.selectedTank) {
      const updated = (estado.tanques || []).find((t: any) => String(t.id) === String(this.selectedTank.id));
      if (!updated) console.warn('[FRONT][Partida] ⚠️ Se perdió el tanque seleccionado tras actualizar estado:', this.selectedTank.id);
      this.selectedTank = updated || null;
    }

    if (this.miUsuario) {
        const miId = this.miUsuario.id;
        const idsColocados = (estado.tanques || [])
          .filter((t: any) => String(t.propietarioId) === String(miId))
          .map((t: any) => Number(t.id));

        this.misTanquesNoColocados = this.misTanquesSeleccionados.filter(t => !idsColocados.includes(Number(t.id)));
    }
  }

  onActionSelected(accion: 'Mover' | 'Disparar' | 'Poner' | null) {
    this.accionActual = (this.accionActual === accion) ? null : accion;
    this.tanqueEnMano = null;
    if (this.accionActual !== 'Mover' && this.accionActual !== 'Disparar') {
      this.selectedTank = null;
    }
  }

  onTankSelected(tanque: any) {
    this.tanqueEnMano = tanque;
    console.log('[FRONT][Partida] 🎯 Tanque seleccionado para poner:', tanque.nombre);
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
    } else if (this.accionActual === 'Mover' && this.selectedTank) {
      this.websocketService.emit('moverTanque', {
        partidaId: this.partidaId,
        tanqueId: this.selectedTank.id,
        targetX: pos.x,
        targetY: pos.y
      });
    } else if (this.accionActual === 'Disparar' && this.selectedTank) {
      this.websocketService.emit('atacar', {
        partidaId: this.partidaId,
        atacanteId: this.selectedTank.id,
        targetX: pos.x,
        targetY: pos.y
      });
    } else {
      // Intentar seleccionar un tanque del tablero
      const tank = (this.gameState()?.tanques || []).find((t: any) => t.posX === pos.x && t.posY === pos.y);
      if (tank && String(tank.propietarioId) === String(this.miUsuario.id)) {
        this.selectedTank = tank;
        console.log('[FRONT][Partida] 🛡️ Tanque seleccionado en tablero:', tank.nombre);
      }
    }
  }

  showNotification(message: string, submessage: string = '') {
    this.notification = { visible: true, message, submessage };
    setTimeout(() => {
      this.notification.visible = false;
    }, 4000); 
  }

  rendirse() {
    if (confirm('¿Estás seguro de que quieres rendirte?')) {
      this.isAbandoning = true;
      this.dataService.abandonarPartida(Number(this.partidaId));
      this.router.navigate(['/menu']);
    }
  }

  pasarTurno() {
    this.websocketService.emit('finTurno', { partidaId: this.partidaId });
    this.accionActual = null;
    this.tanqueEnMano = null;
    this.selectedTank = null;
  }
}
