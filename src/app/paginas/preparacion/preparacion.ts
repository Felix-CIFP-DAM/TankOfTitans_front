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

  private socketSub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_sala = params['id'];
      this.cargarDatos();
    });

    // Escuchar cambios en la sala
    this.socketSub = this.websocketService.listen('estadoSala').subscribe((partida: any) => {
      this.actualizarJugadores(partida);
    });

    // Escuchar si alguien se une
    this.websocketService.listen('jugadorUnido').subscribe((partida: any) => {
      this.actualizarJugadores(partida);
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
        imagen_icono: `/assets/iconos_tanques/${t.miniatura}`,
        imagen_full: `/assets/portadas_tanques/${t.imagenPortada}`,
        stats: {
          ataque: t.ataque,
          defensa: t.defensa,
          velocidad: t.rangoMovimiento * 10 // Normalización simple para UI
        }
      }));
    });

    // 2. Cargar estado inicial de la sala (opcional si ya venimos de unirse)
    // El DataService podría guardar el estado último o pedimos uno nuevo
  }

  actualizarJugadores(partida: any) {
    if (!partida || !partida.jugadoresList) return;
    
    this.jugadores = partida.jugadoresList.map((j: any) => ({
      nickname: j.nickname,
      avatar: `/assets/avatares/${j.iconoImagen}`,
      listo: j.listo,
      esHost: j.nickname === partida.hostNickname
    }));
  }

  get ligeros() { return this.tanquesDisponibles.filter(t => t.tipo.includes('ligero')); }
  get medianos() { return this.tanquesDisponibles.filter(t => t.tipo.includes('mediano') || t.tipo.includes('medio')); }
  get pesados() { return this.tanquesDisponibles.filter(t => t.tipo.includes('pesado')); }

  seleccionarTanque(tanque: Tanque) {
    if (this.peloton().length < 5 && !this.peloton().find(t => t.id === tanque.id)) {
      this.peloton.update(p => [...p, tanque]);
    }
  }

  quitarTanque(tanqueId: number) {
    this.peloton.update(p => p.filter(t => t.id !== tanqueId));
    // Al quitar tanque, si estábamos listos deberíamos notificar al servidor
    // this.dataService.marcarListo(this.id_sala); // toggle de nuevo
  }

  toggleListo() {
    if (this.peloton().length !== 5) return;
    
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
