import { Component } from '@angular/core';
import { PartidaHud } from '../../components/partida-hud/partida-hud';
import { PartidaMapa } from '../../components/partida-mapa/partida-mapa';
import { WebsocketService } from '../../services/websocket-service'; // Preparando para WS

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [PartidaHud, PartidaMapa],
  templateUrl: './partida.html',
  styleUrl: './partida.css',
})
export class Partida {
  accionActual: 'Mover' | 'Disparar' | 'Poner' | null = null;
  tanqueEnMano: any = null; 

  constructor() {
    // Aquí inicializaremos el WS en el futuro
  }

  onActionSelected(accion: 'Mover' | 'Disparar' | 'Poner' | null) {
    if (this.accionActual === accion) {
      this.accionActual = null; // Toggle off
    } else {
      this.accionActual = accion;
    }
    this.tanqueEnMano = null;
  }

  onTankSelected(tanque: any) {
    this.tanqueEnMano = tanque;
  }
}
