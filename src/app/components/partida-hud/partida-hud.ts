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
  @Input() miUsuario: any = null;
  @Input() rivales: any[] = [];
  @Input() tanquesNoColocados: any[] = [];
  @Input() tanqueEnMano: any = null;
  @Input() gameState: any = null;
  
  @Input() timerTurno = '00:30';
  @Input() timerTotal = '15:00';

  @Output() actionSelected = new EventEmitter<'Mover' | 'Disparar' | 'Poner'>();
  @Output() tankSelected = new EventEmitter<any>();
  
  get puntosAccion() {
    return this.miUsuario?.pa || 0;
  }

  onActionClick(accion: 'Mover' | 'Disparar' | 'Poner') {
    this.actionSelected.emit(accion);
  }

  onSelectTank(t: any) {
    this.tankSelected.emit(t);
  }
}
