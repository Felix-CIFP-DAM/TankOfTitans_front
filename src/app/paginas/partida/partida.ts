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
  
  // Lista completa de los 3 tanques elegidos en preparación
  misTanquesSeleccionados: any[] = [];
  // Lista filtrada de tanques que aún no están en el mapa
  misTanquesNoColocados: any[] = [];
  
  rivales: any[] = [];
  miUsuario: any = null;

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
  }

  cargarDatosYConectar() {
    forkJoin({
      partidaApi: this.dataService.getEstadoPartida(Number(this.partidaId)),
      todosLosTanques: this.dataService.obtenerTanques()
    }).subscribe(({ partidaApi, todosLosTanques }) => {
      const miNick = sessionStorage.getItem('nickname');
      const miJugadorApi = partidaApi.jugadoresList.find((j: any) => j.nickname === miNick);
      
      if (miJugadorApi) {
        const idsElegidos = miJugadorApi.tanquesIds || [];
        this.misTanquesSeleccionados = todosLosTanques
          .filter(t => idsElegidos.includes(t.id))
          .map(t => ({
            id: t.id,
            nombre: t.nombre,
            tipo: t.tipo,
            vida: 100,
            sheet: 'miscelaneous-1'
          }));
        
        this.misTanquesNoColocados = [...this.misTanquesSeleccionados];
      }

      this.conectarSocket();
    });
  }

  ngOnDestroy() {
    this.socketSub?.unsubscribe();
  }

  conectarSocket() {
    this.websocketService.listen('partidaIniciada').subscribe((res: any) => {
      this.actualizarEstado(res.estado);
    });

    this.websocketService.listen('tanqueColocado').subscribe((res: any) => {
      this.actualizarEstado(res.estado);
    });

    this.websocketService.listen('tanqueMovido').subscribe((res: any) => {
      this.actualizarEstado(res.estado);
    });
    
    this.websocketService.emit('obtenerEstadoPartida', { partidaId: this.partidaId });
    this.websocketService.listen('estadoPartida').subscribe((res: any) => {
      if (res.estado) this.actualizarEstado(res.estado);
    });
  }

  actualizarEstado(estado: any) {
    this.gameState.set(estado);
    const miNick = sessionStorage.getItem('nickname');
    const jugadores = Object.values(estado.jugadores);
    
    this.miUsuario = jugadores.find((j: any) => j.nickname === miNick);
    this.rivales = jugadores.filter((j: any) => j.nickname !== miNick);

    // Filtrar tanques no colocados a partir de la lista base
    if (this.miUsuario?.tanquesColocados) {
        const idsColocados = this.miUsuario.tanquesColocados.map((tc: any) => tc.id);
        this.misTanquesNoColocados = this.misTanquesSeleccionados.filter(t => !idsColocados.includes(t.id));
    }
  }

  onActionSelected(accion: 'Mover' | 'Disparar' | 'Poner' | null) {
    if (this.accionActual === accion) {
      this.accionActual = null;
    } else {
      this.accionActual = accion;
    }
    this.tanqueEnMano = null;
  }

  onTankSelected(tanque: any) {
    this.tanqueEnMano = tanque;
  }

  onMapaClick(pos: {x: number, y: number}) {
    if (this.accionActual === 'Poner' && this.tanqueEnMano) {
      this.websocketService.emit('colocarTanque', {
        partidaId: this.partidaId,
        tanqueId: this.tanqueEnMano.id,
        x: pos.x,
        y: pos.y
      });
    }
  }
}
