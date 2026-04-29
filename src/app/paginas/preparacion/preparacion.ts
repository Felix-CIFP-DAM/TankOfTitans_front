import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Tanque {
  id: number;
  nombre: string;
  tipo: 'ligero' | 'mediano' | 'pesado';
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
export class Preparacion implements OnInit {

  protected id_sala!: string;

  // Lista de tanques disponibles (Mock data)
  tanquesDisponibles: Tanque[] = [
    { id: 1, nombre: 'T-34', tipo: 'ligero', imagen_icono: 'vehiculos/t-34.png', imagen_full: '', stats: { ataque: 40, defensa: 30, velocidad: 90 } },
    { id: 2, nombre: 'KV-1', tipo: 'ligero', imagen_icono: 'vehiculos/KV-1.png', imagen_full: '', stats: { ataque: 35, defensa: 25, velocidad: 95 } },
    { id: 3, nombre: 'Bradley-VCI', tipo: 'mediano', imagen_icono: 'vehiculos/bradley-vci.png', imagen_full: 'vehiculos/bradley-vci-new.png', stats: { ataque: 65, defensa: 60, velocidad: 60 } },
    { id: 4, nombre: 'Paladin-AAPS', tipo: 'mediano', imagen_icono: 'vehiculos/paladin-aaps.png', imagen_full: '', stats: { ataque: 60, defensa: 70, velocidad: 50 } },
    { id: 5, nombre: 'T-72', tipo: 'pesado', imagen_icono: 'vehiculos/T-72.png', imagen_full: '', stats: { ataque: 90, defensa: 95, velocidad: 20 } },
    { id: 6, nombre: 'Stugg-III', tipo: 'pesado', imagen_icono: 'vehiculos/stugg-III.png', imagen_full: '', stats: { ataque: 85, defensa: 90, velocidad: 25 } },
    { id: 7, nombre: 'Churchill', tipo: 'ligero', imagen_icono: 'vehiculos/churchill.png', imagen_full: '', stats: { ataque: 45, defensa: 20, velocidad: 100 } },
    { id: 8, nombre: 'Humvee-Tactico', tipo: 'mediano', imagen_icono: 'vehiculos/humvee-tactico.png', imagen_full: '', stats: { ataque: 70, defensa: 55, velocidad: 65 } },
  ];

  // Estado de la sala (Mock data)
  jugadores: JugadorEstado[] = [
    { nickname: 'Jhonatah', avatar: 'perfiles/unidad-lobo-volador.png', listo: false, esHost: true },
    { nickname: 'Player_2', avatar: 'perfiles/medallista.png', listo: false, esHost: false },
    { nickname: 'TankMaster', avatar: 'perfiles/brigada-espartana.png', listo: true, esHost: false },
    { nickname: 'Ghost_Ops', avatar: 'perfiles/division-de-asalto.png', listo: false, esHost: false },
  ];

  // Pelotón seleccionado (Max 5)
  peloton = signal<Tanque[]>([]);

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí se conectaría al socket en el futuro para recibir el estado de la sala
    this.id_sala = "8493042";
  }

  get ligeros() { return this.tanquesDisponibles.filter(t => t.tipo === 'ligero'); }
  get medianos() { return this.tanquesDisponibles.filter(t => t.tipo === 'mediano'); }
  get pesados() { return this.tanquesDisponibles.filter(t => t.tipo === 'pesado'); }

  seleccionarTanque(tanque: Tanque) {
    if (this.peloton().length < 5 && !this.peloton().find(t => t.id === tanque.id)) {
      this.peloton.update(p => [...p, tanque]);
    }
  }

  quitarTanque(tanqueId: number) {
    this.peloton.update(p => p.filter(t => t.id !== tanqueId));
    // Si quitamos uno, ya no podemos estar listos
    const yo = this.jugadores.find(j => j.nickname === 'Jhonatah');
    if (yo) yo.listo = false;
  }

  toggleListo() {
    if (this.peloton().length !== 5) return;

    // Lógica para cambiar estado propio (simulado)
    const yo = this.jugadores.find(j => j.nickname === 'Jhonatah');
    if (yo) yo.listo = !yo.listo;
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
