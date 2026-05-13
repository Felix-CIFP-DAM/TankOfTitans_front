import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data-service';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';

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
  cuentaAtras = signal<number | null>(null);

  private socketSub?: Subscription;
  private ultimaPartidaRecibida: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id_sala = params['id'];
      console.log('[FRONT][Preparacion] 🆔 ID de sala detectado:', this.id_sala);
      this.cargarDatos();
      // Pedir estado actual al cargar (dentro del subscribe para asegurar que tenemos el id_sala)
      if (this.id_sala) {
        this.websocketService.emit('obtenerEstadoSala', { partidaId: this.id_sala });
      }
    });

    // Escuchar cambios en la sala
    this.socketSub = this.websocketService.listen('estadoSala').subscribe((partida: any) => {
      console.log('[FRONT][Preparacion] 📥 estadoSala recibido:', partida);
      this.actualizarJugadores(partida);
    });

    // Escuchar si alguien se une
    this.websocketService.listen('jugadorUnido').subscribe((partida: any) => {
      console.log('[FRONT][Preparacion] 📥 jugadorUnido recibido:', partida);
      this.actualizarJugadores(partida);
    });

    // Escuchar cuenta atrás
    this.websocketService.listen('cuentaAtras').subscribe((count: number) => {
      this.cuentaAtras.set(count);
    });

    // Escuchar inicio de partida (envío a selección de tanques)
    this.websocketService.listen('seleccionTanques').subscribe((datos: any) => {
      console.log('[FRONT][Preparacion] 🚀 ¡Partida iniciada! Redirigiendo...', datos);
      // Navegar al juego (pasar datos por estado o queryParams si es necesario)
      this.router.navigate(['/juego'], { 
        queryParams: { 
          partidaId: this.id_sala,
          mapaId: datos.mapa.id 
        } 
      });
    });
  }

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }

  cargarDatos() {
    // 1. Cargar tanques del usuario
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
          velocidad: t.rangoMovimiento * 10 // Simplificación para UI
        }
      }));

      // Si ya habíamos recibido el estado de la sala pero no teníamos los tanques cargados, sincronizar ahora
      if (this.ultimaPartidaRecibida) {
        this.actualizarJugadores(this.ultimaPartidaRecibida);
      }
    });

    // 2. Cargar estado inicial de la sala (opcional si ya venimos de unirse)
    // El DataService podría guardar el estado último o pedimos uno nuevo
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

    // Sincronizar mi propio pelotón local con lo que dice el servidor
    const miNick = sessionStorage.getItem('nickname');
    const yo = this.jugadores.find(j => j.nickname === miNick);
    if (yo && yo.tanquesIds) {
      const tanquesSincronizados = yo.tanquesIds.map(id => 
        this.tanquesDisponibles.find(t => t.id === id)
      ).filter((t): t is Tanque => !!t);
      
      this.peloton.set(tanquesSincronizados);
    }
  }

  get ligeros() { return this.tanquesDisponibles.filter(t => t.tipo.includes('ligero')); }
  get medianos() { return this.tanquesDisponibles.filter(t => t.tipo.includes('mediano') || t.tipo.includes('medio')); }
  get pesados() { return this.tanquesDisponibles.filter(t => t.tipo.includes('pesado')); }

  seleccionarTanque(tanque: Tanque) {
    if (this.peloton().length < 3 && !this.peloton().find(t => t.id === tanque.id)) {
      // Notificar al servidor
      this.websocketService.emit('seleccionarTanque', { 
        partidaId: this.id_sala, 
        tanqueId: tanque.id 
      });
      // El servidor responderá con un estadoSala que actualizará el pelotón vía signal
    }
  }

  quitarTanque(tanqueId: number) {
    // Notificar al servidor
    this.websocketService.emit('deseleccionarTanque', { 
      partidaId: this.id_sala, 
      tanqueId: tanqueId 
    });
  }

  toggleListo() {
    if (this.peloton().length !== 3) return;

    // Llamada al backend para cambiar estado de listo
    this.websocketService.emit('marcarListo', { partidaId: this.id_sala });
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }

  // Helper para saber si el usuario actual está listo
  get yoListo(): boolean {
    const miNick = sessionStorage.getItem('nickname');
    const yo = this.jugadores.find(j => j.nickname === miNick);
    return yo ? yo.listo : false;
  }
}
