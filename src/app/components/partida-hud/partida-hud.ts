import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges() {
    if (this.gameState) {
      // console.log('[HUD] Estado recibido:', this.gameState.turnoNumero, this.gameState.turnoActual);
    }
  }

  @Output() actionSelected = new EventEmitter<'Mover' | 'Disparar' | 'Poner' | null>();
  @Output() tankSelected = new EventEmitter<any>();
  @Output() abandonEvent = new EventEmitter<void>();
  @Output() pasarTurnoEvent = new EventEmitter<void>();
  
  get puntosAccion() {
    return this.miUsuario?.pa || 0;
  }

  esMiTurno(): boolean {
    if (!this.gameState || !this.miUsuario) return false;
    return String(this.gameState.turnoActual) === String(this.miUsuario.id);
  }

  get nicknameTurno(): string {
    if (!this.gameState) return '...';
    if (this.esMiTurno()) return 'TÚ';
    
    // Si no es mi turno, buscar en rivales
    const rival = this.rivales.find(r => String(r.id) === String(this.gameState.turnoActual));
    return rival ? rival.nickname : 'Rival';
  }

  get misTanquesEnMapa() {
    if (!this.gameState || !this.miUsuario) return [];
    return (this.gameState.tanques || []).filter((t: any) => String(t.propietarioId) === String(this.miUsuario.id));
  }

  get tanquesRivalesEnMapa() {
    if (!this.gameState || !this.miUsuario) return [];
    return (this.gameState.tanques || []).filter((t: any) => String(t.propietarioId) !== String(this.miUsuario.id));
  }

  onActionClick(accion: 'Mover' | 'Disparar' | 'Poner') {
    this.actionSelected.emit(accion);
  }

  onSelectTank(t: any) {
    this.tankSelected.emit(t);
  }

  onRendirse() {
    this.abandonEvent.emit();
  }

  onPasarTurno() {
    this.pasarTurnoEvent.emit();
  }
}
