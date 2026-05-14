import { Component, OnInit, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partida-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-mapa.html',
  styleUrl: './partida-mapa.css',
})
export class PartidaMapa implements OnInit, AfterViewInit {
  @Input() accionActual: 'Mover' | 'Disparar' | 'Poner' | null = null;
  @Input() tanqueEnMano: any = null;
  @Input() gameState: any = null;
  @Input() miUsuario: any = null;
  
  @Output() onCasillaClick = new EventEmitter<{x: number, y: number}>();

  capa_suelo: any[][] = [];
  capa_objetos: any[][] = [];
  capa_tanques: any[][] = [];
  cols = 15;
  rows = 10;
  
  palettes = [
    { id: 'afueras-1', path: '/assets/tilesets/afueras-1.png' },
    { id: 'paredes-1', path: '/assets/tilesets/paredes-1.png' },
    { id: 'paredes-2', path: '/assets/tilesets/paredes-2.png' },
    { id: 'suelos-1', path: '/assets/tilesets/suelos-1.png' },
    { id: 'suelos-2', path: '/assets/tilesets/suelos-2.png' },
    { id: 'suelos-3', path: '/assets/tilesets/suelos-3.png' },
    { id: 'techos-1', path: '/assets/tilesets/techos-1.png' },
    { id: 'techos-2', path: '/assets/tilesets/techos-2.png' },
    { id: 'miscelaneous-1', path: '/assets/sprites/miscelaneous-1.png', cols: 16, rows: 16 },
    { id: 'miscelaneous-2', path: '/assets/sprites/miscelaneous-2.png', cols: 16, rows: 16 },
    { id: 'miscelaneous-3', path: '/assets/sprites/miscelaneous-3.png', cols: 16, rows: 16 },
    { id: 'miscelaneous-4', path: '/assets/sprites/miscelaneous-4.png', cols: 16, rows: 16 }
  ];

  zoomLevel = 1.0;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  translateX = 0;
  translateY = 0;

  selectedBoardTank: {x: number, y: number} | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const saved = localStorage.getItem('mapa_temp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          this.capa_suelo = parsed.data.suelo || [];
          this.capa_objetos = parsed.data.objetos || [];
          if (this.capa_suelo.length > 0) {
            this.rows = this.capa_suelo.length;
            this.cols = this.capa_suelo[0].length;
          }
          this.initTanques();
        }
      } catch (e) {
        console.error("Error cargando mapa:", e);
      }
    } else {
      this.initTanques();
    }
  }

  initTanques() {
    this.capa_tanques = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(null)
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.centerAndFitMap();
    }, 0);
  }

  @HostListener('window:resize')
  onResize() {
    this.constrainPan();
  }

  centerAndFitMap() {
    const container = this.el.nativeElement.querySelector('.mapa-viewport');
    if (!container) return;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const mapWidth = this.cols * 48;
    const mapHeight = this.rows * 48;
    const zoomX = containerWidth / mapWidth;
    const zoomY = containerHeight / mapHeight;
    this.zoomLevel = Math.min(zoomX, zoomY, 2.0); 
    this.translateX = (containerWidth - (mapWidth * this.zoomLevel)) / 2;
    this.translateY = (containerHeight - (mapHeight * this.zoomLevel)) / 2;
  }

  constrainPan() {
    const container = this.el.nativeElement.querySelector('.mapa-viewport');
    if (!container) return;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const mapWidth = this.cols * 48 * this.zoomLevel;
    const mapHeight = this.rows * 48 * this.zoomLevel;

    if (mapWidth <= containerWidth) {
      this.translateX = (containerWidth - mapWidth) / 2;
    } else {
      const minX = containerWidth - mapWidth;
      const maxX = 0;
      this.translateX = Math.max(minX, Math.min(maxX, this.translateX));
    }

    if (mapHeight <= containerHeight) {
      this.translateY = (containerHeight - mapHeight) / 2;
    } else {
      const minY = containerHeight - mapHeight;
      const maxY = 0;
      this.translateY = Math.max(minY, Math.min(maxY, this.translateY));
    }
  }

  getTileStyle(tile: any) {
    if (!tile) return {};
    const palette = this.palettes.find(p => p.id === tile.sheet);
    if (!palette) return {};
    return {
      'background-image': `url('${palette.path}')`,
      'background-position': `-${tile.x * 48}px -${tile.y * 48}px`,
      'opacity': tile.tipo === 'Transitable' && tile.x === 0 && tile.y === 0 && tile.sheet === 'suelos-1' ? '0' : '1'
    };
  }

  getObjectStyle(obj: any) {
    if (!obj) return { 'display': 'none' };
    const palette = (this.palettes as any[]).find(p => p.id === obj.sheet);
    if (!palette) return {};
    const bgSize = (palette.cols && palette.rows) ? `${palette.cols * 48}px ${palette.rows * 48}px` : 'auto';
    return {
      'background-image': `url('${palette.path}')`,
      'background-position': `-${(obj.x || 0) * 48}px -${(obj.y || 0) * 48}px`,
      'width': '48px',
      'height': '48px',
      'background-size': bgSize
    };
  }

  isHighlight(x: number, y: number): 'move' | 'shoot' | 'place' | null {
    if (this.accionActual === 'Poner' && this.tanqueEnMano) {
      if (this.esColocable(x, y)) return 'place';
    }

    if (!this.accionActual || !this.selectedBoardTank) return null;
    const dx = Math.abs(x - this.selectedBoardTank.x);
    const dy = Math.abs(y - this.selectedBoardTank.y);
    const distance = dx + dy;

    if (this.accionActual === 'Mover' && distance > 0 && distance <= 3) {
      if (this.esTransitable(x, y) && !this.hayTanque(x, y)) return 'move';
    }
    if (this.accionActual === 'Disparar' && distance > 0 && distance <= 5) return 'shoot';

    return null;
  }

  esColocable(x: number, y: number): boolean {
    if (!this.esTransitable(x, y) || this.hayTanque(x, y)) return false;
    
    // Buscar base del jugador
    const miNick = sessionStorage.getItem('nickname');
    const miJugador = this.gameState?.jugadores ? Object.values(this.gameState.jugadores).find((j: any) => j.nickname === miNick) : null;
    if (!miJugador) return false;

    // J1 es Host (Base_J1), J2 es Invitado (Base_J2)
    // En el backend lo marcamos en el GameState.
    // Por ahora simplificamos: el host es el primero en Object.keys
    const isHost = String(miJugador.id) === Object.keys(this.gameState.jugadores)[0];
    const tipoBase = isHost ? 'Base_J1' : 'Base_J2';

    // Encontrar base en el mapa
    let baseX = -1, baseY = -1;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const obj = this.capa_objetos[row][col];
        if (obj && obj.tipo === tipoBase) {
          baseX = col;
          baseY = row;
          break;
        }
      }
      if (baseX !== -1) break;
    }

    if (baseX === -1) return false;

    // Rango 4 desde la base
    return Math.abs(x - baseX) <= 4 && Math.abs(y - baseY) <= 4;
  }

  esTransitable(x: number, y: number): boolean {
    const tile = this.capa_suelo[y][x];
    const obj = this.capa_objetos[y][x];
    return tile?.tipo !== 'No_Transitable' && (!obj || obj.tipo !== 'No_Transitable');
  }

  hayTanque(x: number, y: number): boolean {
    return !!this.gameState?.tanques?.find((t: any) => t.posX === x && t.posY === y);
  }

  onClickCasilla(x: number, y: number) {
    this.onCasillaClick.emit({x, y});
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3.0);
    else this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
    this.constrainPan();
  }

  onMouseDown(event: MouseEvent) {
    if (event.button !== 0 && event.button !== 1) return;
    this.isDragging = true;
    this.dragStartX = event.clientX - this.translateX;
    this.dragStartY = event.clientY - this.translateY;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.translateX = event.clientX - this.dragStartX;
    this.translateY = event.clientY - this.dragStartY;
    this.constrainPan();
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }
}
