import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data-service';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';
import { TalkerService } from '../../services/talker-service';

interface Tanque {
  id: number;
  nombre: string;
  tipo: string;
  imagen_icono: string;
  imagen_full: string;
  stats: {
    ataque: number;
    defensa: number;
    velocidad: number;
  };
}

interface JugadorEstado {
  nickname: string;
  avatar: string;
  listo: boolean;
  esHost: boolean;
  tanquesIds: number[];
}

@Component({
  selector: 'app-preparacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './preparacion.html',
  styleUrl: './preparacion.css'
})
export class Preparacion implements OnInit, OnDestroy {

  protected id_sala!: string;

  tanquesDisponibles: Tanque[] = [];
  jugadores: JugadorEstado[] = [];
  peloton = signal<Tanque[]>([]);
  mapasDisponibles: any[] = [];
  mapaSeleccionado = signal<any | null>(null);
  cuentaAtras = signal<number | null>(null);

  private socketSub?: Subscription;
  private abandonSub?: Subscription;
  private ultimaPartidaRecibida: any = null;
  private isNavigatingToGame = false;
  private isAbandoning = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private websocketService: WebsocketService,
    private talkerService: TalkerService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id_sala = params['id'];
      console.log('[FRONT][Preparacion] 🆔 ID de sala detectado:', this.id_sala);
      this.cargarDatos();
      if (this.id_sala) {
        this.websocketService.emit('obtenerEstadoSala', { partidaId: this.id_sala });
      }
    });

    this.socketSub = this.websocketService.listen('estadoSala').subscribe((partida: any) => {
      console.log('[FRONT][Preparacion] 📥 estadoSala recibido:', partida);
      this.actualizarJugadores(partida);
    });

    this.websocketService.listen('jugadorUnido').subscribe((partida: any) => {
      console.log('[FRONT][Preparacion] 📥 jugadorUnido recibido:', partida);
      this.actualizarJugadores(partida);
    });

    this.websocketService.listen('cuentaAtras').subscribe((count: number) => {
      this.cuentaAtras.set(count);
    });

    this.websocketService.listen('seleccionTanques').subscribe((datos: any) => {
      console.log('[FRONT][Preparacion] 🚀 ¡Partida iniciada! Redirigiendo...', datos);
      this.isNavigatingToGame = true;
      localStorage.setItem('mapa_temp', JSON.stringify(datos.mapa));
      
      const miNick = sessionStorage.getItem('nickname');
      const yo = this.jugadores.find(j => j.nickname === miNick);
      if (yo && yo.tanquesIds) {
        localStorage.setItem('mis_tanques_ids', JSON.stringify(yo.tanquesIds));
      } else {
        const pelotón = this.peloton().map(t => t.id);
        localStorage.setItem('mis_tanques_ids', JSON.stringify(pelotón));
      }
      
      this.router.navigate(['/partida'], { 
        queryParams: { 
          partidaId: this.id_sala,
          mapaId: datos.mapa.id 
        } 
      });
    });

    this.abandonSub = this.websocketService.listen('jugadorAbandono').subscribe((datos: any) => {
      console.log('[FRONT][Preparacion] 🚪 jugadorAbandono recibido:', datos);
      this.talkerService.notificarSistema('UN JUGADOR HA ABANDONADO LA SALA');
      this.websocketService.emit('obtenerEstadoSala', { partidaId: this.id_sala });
    });

    this.websocketService.listen('error').subscribe((res: any) => {
      console.error('[FRONT][Preparacion] ❌ Error del servidor:', res.error);
      this.talkerService.notificarError('ERROR: ' + res.error);
    });
  }

  ngOnDestroy(): void {
    if (!this.isNavigatingToGame && !this.isAbandoning && this.id_sala) {
      this.dataService.abandonarPartida(Number(this.id_sala));
    }
    this.socketSub?.unsubscribe();
    this.abandonSub?.unsubscribe();
  }

  cargarDatos() {
    this.dataService.obtenerTanques().subscribe((res: any[]) => {
      this.tanquesDisponibles = res.map(t => ({
        id: t.id,
        nombre: t.nombre,
        tipo: t.tipo.toLowerCase(),
        imagen_icono: `/vehiculos/miniaturas/${t.miniatura}`,
        imagen_full: `/vehiculos/portadas/${t.imagenPortada}`,
        stats: {
          ataque: t.ataque,
          defensa: t.defensa,
          velocidad: t.rangoMovimiento * 10
        }
      }));
      if (this.ultimaPartidaRecibida) {
        this.actualizarJugadores(this.ultimaPartidaRecibida);
      }
    });

    this.dataService.listarMapas().subscribe((res: any[]) => {
      this.mapasDisponibles = res;
    });
  }

  actualizarJugadores(partida: any) {
    if (!partida || !partida.jugadoresList) return;
    this.ultimaPartidaRecibida = partida;

    this.jugadores = partida.jugadoresList.map((j: any) => ({
      nickname: j.nickname,
      avatar: `/perfiles/${j.iconoImagen}`,
      listo: j.listo,
      esHost: j.nickname === partida.hostNickname,
      tanquesIds: j.tanquesIds || []
    }));

    const miNick = sessionStorage.getItem('nickname');
    const yo = this.jugadores.find(j => j.nickname === miNick);
    if (yo && yo.tanquesIds) {
      const tanquesSincronizados = yo.tanquesIds.map(id => 
        this.tanquesDisponibles.find(t => t.id === id)
      ).filter((t): t is Tanque => !!t);
      
      this.peloton.set(tanquesSincronizados);
    }

    if (partida.mapaId) {
      this.mapaSeleccionado.set({ id: partida.mapaId });
    } else {
      this.mapaSeleccionado.set(null);
    }
  }

  get ligeros() { return this.tanquesDisponibles.filter(t => t.tipo.includes('ligero')); }
  get medianos() { return this.tanquesDisponibles.filter(t => t.tipo.includes('mediano') || t.tipo.includes('medio')); }
  get pesados() { return this.tanquesDisponibles.filter(t => t.tipo.includes('pesado')); }

  seleccionarTanque(tanque: Tanque) {
    if (this.peloton().length < 3 && !this.peloton().find(t => t.id === tanque.id)) {
      this.websocketService.emit('seleccionarTanque', { 
        partidaId: this.id_sala, 
        tanqueId: tanque.id 
      });
    }
  }

  quitarTanque(tanqueId: number) {
    this.websocketService.emit('deseleccionarTanque', { 
      partidaId: this.id_sala, 
      tanqueId: tanqueId 
    });
  }

  toggleListo() {
    if (this.peloton().length !== 3) return;
    this.websocketService.emit('marcarListo', { partidaId: this.id_sala });
  }

  desconectar() {
    if (confirm('¿Estás seguro de que quieres abandonar la sala?')) {
      this.isAbandoning = true;
      this.dataService.abandonarPartida(Number(this.id_sala));
      this.router.navigate(['/menu']);
    }
  }

  volverAlMenu() {
    this.desconectar();
  }

  get yoListo(): boolean {
    const miNick = sessionStorage.getItem('nickname');
    const yo = this.jugadores.find(j => j.nickname === miNick);
    return yo ? yo.listo : false;
  }

  get soyHost(): boolean {
    const miNick = sessionStorage.getItem('nickname');
    const yo = this.jugadores.find(j => j.nickname === miNick);
    return yo ? yo.esHost : false;
  }

  seleccionarMapa(mapa: any) {
    if (!this.soyHost) return;
    this.websocketService.emit('seleccionarMapa', { 
      partidaId: this.id_sala, 
      mapaId: mapa.id 
    });
  }
}
