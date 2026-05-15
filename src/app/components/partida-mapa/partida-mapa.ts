import { Component, OnInit, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partida-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-mapa.html',
  styleUrl: './partida-mapa.css',
})
export class PartidaMapa implements OnInit, AfterViewInit, OnChanges {
  @Input() accionActual: 'Mover' | 'Disparar' | 'Poner' | null = null;
  @Input() tanqueEnMano: any = null;
  @Input() gameState: any = null;
  @Input() miUsuario: any = null;
  @Input() rivales: any[] = [];
  @Input() selectedTank: any = null;
  
  @Output() onCasillaClick = new EventEmitter<{x: number, y: number}>();

  capa_suelo: any[][] = [];
  capa_objetos: any[][] = [];
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



  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameState'] && this.gameState && this.gameState.mapa) {
      this.cargarMapaDesdeEstado();
    }
  }

  ngOnInit() {
    this.cargarMapaDesdeStorage();
  }

  cargarMapaDesdeEstado() {
    const mapa = this.gameState.mapa;
    if (mapa && mapa.data) {
      console.log('[FRONT][PartidaMapa] 🗺️ Cargando mapa desde estado:', mapa.nombre);
      this.capa_suelo = mapa.data.suelo || [];
      this.capa_objetos = mapa.data.objetos || [];
      if (this.capa_suelo.length > 0) {
        this.rows = this.capa_suelo.length;
        this.cols = this.capa_suelo[0].length;
      }
    }
  }

  cargarMapaDesdeStorage() {
    if (this.capa_suelo.length > 0) return; // Ya cargado desde estado
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
        }
      } catch (e) {
        console.error("Error cargando mapa:", e);
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.centerAndFitMap();
    }, 200);
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
    if (!tile || !tile.sheet) return {};
    const palette = this.palettes.find(p => p.id === tile.sheet);
    if (!palette) return {};
    return {
      'background-image': `url('${palette.path}')`,
      'background-position': `-${(tile.x || 0) * 48}px -${(tile.y || 0) * 48}px`,
      'opacity': tile.tipo === 'Transitable' && tile.x === 0 && tile.y === 0 && tile.sheet === 'suelos-1' ? '0' : '1'
    };
  }

  getObjectStyle(obj: any) {
    if (!obj || !obj.sheet) return { 'display': 'none' };
    const palette = (this.palettes as any[]).find(p => p.id === obj.sheet);
    if (!palette) return { 'display': 'none' };
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

    if (!this.accionActual || !this.selectedTank) return null;

    const dx = Math.abs(x - this.selectedTank.posX);
    const dy = Math.abs(y - this.selectedTank.posY);
    const distance = dx + dy;

    if (this.accionActual === 'Mover' && distance > 0 && distance <= (this.selectedTank.rangoMovimiento || 3)) {
      const hayEscombros = (this.gameState?.escombros || []).some((e: any) => e.x === x && e.y === y);
      if (this.esTransitable(x, y) && !this.hayTanque(x, y) && !hayEscombros) return 'move';
    }
    if (this.accionActual === 'Disparar' && distance > 0 && distance <= (this.selectedTank.rangoAtaque || 5)) return 'shoot';

    return null;
  }

  esColocable(x: number, y: number): boolean {
    if (!this.gameState || !this.gameState.jugadores) return false;
    if (!this.esTransitable(x, y) || this.hayTanque(x, y)) return false;
    
    if (!this.miUsuario) return false;

    const hostId = this.gameState.hostId;
    const isHost = String(this.miUsuario.id) === String(hostId);
    const tipoBase = isHost ? 'Base_J1' : 'Base_J2';

    const baseTiles: {x: number, y: number}[] = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const obj = (this.capa_objetos && this.capa_objetos[row]) ? this.capa_objetos[row][col] : null;
        const ground = (this.capa_suelo && this.capa_suelo[row]) ? this.capa_suelo[row][col] : null;
        
        if ((obj && (obj.tipo === 'Base_J1' || obj.tipo === 'Base_J2')) || 
            (ground && (ground.tipo === 'Base_J1' || ground.tipo === 'Base_J2'))) {
          // Solo añadimos si es la base del jugador actual
          if ((obj && obj.tipo === tipoBase) || (ground && ground.tipo === tipoBase)) {
            baseTiles.push({ x: col, y: row });
          }
        }
      }
    }

    if (baseTiles.length === 0) {
        // Fallback robusto para mapas antiguos
        const fbX = isHost ? 1 : (this.cols > 0 ? this.cols - 2 : 13);
        const fbY = isHost ? 1 : (this.rows > 0 ? this.rows - 2 : 8);
        baseTiles.push({ x: fbX, y: fbY });
    }
    
    // Evitar poner exactamente encima de una base (propia o rival)
    const currentObj = this.capa_objetos[y] && this.capa_objetos[y][x];
    const currentGround = this.capa_suelo[y] && this.capa_suelo[y][x];
    if ((currentObj && (currentObj.tipo === 'Base_J1' || currentObj.tipo === 'Base_J2')) ||
        (currentGround && (currentGround.tipo === 'Base_J1' || currentGround.tipo === 'Base_J2'))) {
      return false;
    }

    // Comprobar si está cerca de CUALQUIER tile de la base propia (Rango 5)
    const tile = this.capa_suelo[y][x];
    const obj = this.capa_objetos[y][x];
    // No transitable
    if (tile?.tipo === 'No_Transitable' || (obj && obj.tipo === 'No_Transitable')) return false;
    // Ocupado por tanque
    if (this.hayTanque(x, y)) return false;
    // Ocupado por escombros
    const hayEscombros = (this.gameState?.escombros || []).some((e: any) => e.x === x && e.y === y);
    if (hayEscombros) return false;

    // Solo cerca de la base propia
    return baseTiles.some(b => {
      const dx = Math.abs(x - b.x);
      const dy = Math.abs(y - b.y);
      return (dx + dy) <= 5;
    });
  }

  esTransitable(x: number, y: number): boolean {
    if (!this.capa_suelo || !this.capa_suelo[y] || !this.capa_suelo[y][x]) return false;
    const tile = this.capa_suelo[y][x];
    const obj = (this.capa_objetos && this.capa_objetos[y]) ? this.capa_objetos[y][x] : null;
    return tile?.tipo !== 'No_Transitable' && (!obj || obj.tipo !== 'No_Transitable');
  }

  hayTanque(x: number, y: number): boolean {
    return (this.gameState?.tanques || []).some((t: any) => t.posX === x && t.posY === y && t.vivo);
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

  get baseInfo() {
    if (!this.gameState || !this.gameState.jugadores) return { j1: '', j2: '', a1: '', a2: '' };
    
    // Combine miUsuario and rivales to find avatars
    const allPlayers = [this.miUsuario, ...this.rivales].filter(Boolean);

    // jugadores llega como objeto { "id1": {...}, "id2": {...} } — convertir a array
    const jugadoresArr: any[] = Array.isArray(this.gameState.jugadores)
      ? this.gameState.jugadores
      : Object.values(this.gameState.jugadores);

    const host = jugadoresArr.find((j: any) => String(j.id) === String(this.gameState.hostId));
    const guest = jugadoresArr.find((j: any) => String(j.id) !== String(this.gameState.hostId));
    
    const hostAvatar = allPlayers.find(p => p.id === host?.id)?.avatar || 'recluta.png';
    const guestAvatar = allPlayers.find(p => p.id === guest?.id)?.avatar || 'recluta.png';

    return {
      j1: host?.nickname || 'Host',
      j2: guest?.nickname || 'Rival',
      a1: hostAvatar,
      a2: guestAvatar
    };
  }

  isMyBase(tipoBase: string): boolean {
    if (!this.gameState || !this.miUsuario) return false;
    const hostId = this.gameState.hostId;
    const amIHost = String(this.miUsuario.id) === String(hostId);
    if (amIHost && tipoBase === 'Base_J1') return true;
    if (!amIHost && tipoBase === 'Base_J2') return true;
    return false;
  }

  isTopLeftBase(x: number, y: number, tipoBase: string): boolean {
    if (!tipoBase || !tipoBase.startsWith('Base_')) return false;
    const isLeftSame = x > 0 && this.capa_objetos[y][x - 1]?.tipo === tipoBase;
    const isTopSame = y > 0 && this.capa_objetos[y - 1][x]?.tipo === tipoBase;
    // It's the top-left if neither the left nor the top tile are the same base
    return !isLeftSame && !isTopSame;
  }
}
