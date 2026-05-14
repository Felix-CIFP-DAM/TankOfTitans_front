import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PartidaHud } from '../../components/partida-hud/partida-hud';
import { PartidaMapa } from '../../components/partida-mapa/partida-mapa';
import { WebsocketService } from '../../services/websocket-service';
import { DataService } from '../../services/data-service';
import { Subscription } from 'rxjs';

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
  misTanquesDisponibles: any[] = [];
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
      console.log('[FRONT][Partida] 🆔 Partida ID:', this.partidaId);
      this.conectarSocket();
    });

    // Cargar mis tanques reales para tener imágenes y nombres
    this.dataService.obtenerTanques().subscribe(tanques => {
      this.misTanquesDisponibles = tanques.map(t => ({
        id: t.id,
        nombre: t.nombre,
        tipo: t.tipo,
        vida: 100,
        sheet: 'miscelaneous-1' 
      }));
    });
  }

  ngOnDestroy() {
    this.socketSub?.unsubscribe();
  }

  conectarSocket() {
    this.websocketService.listen('partidaIniciada').subscribe((res: any) => {
      console.log('[FRONT][Partida] 🎮 Partida Iniciada!', res);
      this.gameState.set(res.estado);
      this.actualizarHUD(res.estado);
    });

    this.websocketService.listen('tanqueColocado').subscribe((res: any) => {
      console.log('[FRONT][Partida] 📍 Tanque colocado:', res);
      this.gameState.set(res.estado);
      this.actualizarHUD(res.estado);
    });

    this.websocketService.listen('tanqueMovido').subscribe((res: any) => {
      this.gameState.set(res.estado);
      this.actualizarHUD(res.estado);
    });
  }

  actualizarHUD(estado: any) {
    const miNick = sessionStorage.getItem('nickname');
    const jugadores = Object.values(estado.jugadores);
    
    this.miUsuario = jugadores.find((j: any) => j.nickname === miNick);
    this.rivales = jugadores.filter((j: any) => j.nickname !== miNick);
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
    console.log('[FRONT][Partida] 🛡️ Tanque en mano:', tanque.nombre);
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
