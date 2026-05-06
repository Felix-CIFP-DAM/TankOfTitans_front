import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partida-hud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-hud.html',
  styleUrl: './partida-hud.css',
})
export class PartidaHud {
  @Input() accionActual: 'Mover' | 'Disparar' | 'Poner' | null = null;
  @Output() actionSelected = new EventEmitter<'Mover' | 'Disparar' | 'Poner'>();
  @Output() tankSelected = new EventEmitter<any>();

  timerTurno = '00:30';
  timerTotal = '15:00';
  turnoActual = 1;
  jugadores = [
    { nombre: 'Jugador 1 (Tú)', img: '/assets/ui/user-avatar.png', puntosAccion: 5, tanques: [{ id: 1, vida: 100 }, { id: 2, vida: 80 }] },
    { nombre: 'Rival 1', img: '/assets/ui/rival-avatar.png', puntosAccion: 3, tanques: [{ id: 3, vida: 100 }, { id: 4, vida: 50 }] },
    { nombre: 'Rival 2', img: '/assets/ui/rival2-avatar.png', puntosAccion: 0, tanques: [{ id: 5, vida: 100 }] }
  ];

  usuarioActual = this.jugadores[0];
  rivalActual = this.jugadores[1];

  // Dummy tanks not yet placed on the map
  tanquesNoColocados = [
    { id: 6, name: 'Tanque Ligero', vida: 100, sheet: 'miscelaneous-1' },
    { id: 7, name: 'Tanque Pesado', vida: 200, sheet: 'miscelaneous-2' }
  ];

  onActionClick(accion: 'Mover' | 'Disparar' | 'Poner') {
    this.actionSelected.emit(accion);
  }

  onSelectTank(t: any) {
    this.tankSelected.emit(t);
  }
}
