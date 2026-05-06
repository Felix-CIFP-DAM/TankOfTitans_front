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
  @Output() onTankActionComplete = new EventEmitter<void>();

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
    { id: 'miscelaneous-1', path: '/assets/sprites/miscelaneous-1.png' },
    { id: 'miscelaneous-2', path: '/assets/sprites/miscelaneous-2.png' },
    { id: 'miscelaneous-3', path: '/assets/sprites/miscelaneous-3.png' },
    { id: 'miscelaneous-4', path: '/assets/sprites/miscelaneous-4.png' }
  ];

  zoomLevel = 1.0;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  translateX = 0;
  translateY = 0;

  // Selected tank on the board (for moving/shooting)
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
        }
      } catch (e) {
        console.error("Error cargando mapa:", e);
      }
    }
  }

  ngAfterViewInit() {
    // Timeout para permitir que Angular renderice el grid primero
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

    // Calcular zoom para que el mapa encaje dentro del viewport
    const zoomX = containerWidth / mapWidth;
    const zoomY = containerHeight / mapHeight;
    
    // Usamos el zoom menor para que el mapa entero se vea si es posible
    this.zoomLevel = Math.min(zoomX, zoomY, 2.0); 

    // Centramos el mapa
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

    // Eje X
    if (mapWidth <= containerWidth) {
      // Si el mapa es más pequeño que el contenedor, se centra y no se puede arrastrar
      this.translateX = (containerWidth - mapWidth) / 2;
    } else {
      // Si el mapa es más grande, no permitimos ver los bordes vacíos
      const minX = containerWidth - mapWidth;
      const maxX = 0;
      this.translateX = Math.max(minX, Math.min(maxX, this.translateX));
    }

    // Eje Y
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
    
    const palette = this.palettes.find(p => p.id === obj.sheet);
    if (!palette) {
       return {
         'background-image': `url('/assets/sprites/miscelaneous-1.png')`,
         'background-position': `-0px -0px`,
         'width': '48px',
         'height': '48px',
         'background-size': 'auto' 
       };
    }
    return {
      'background-image': `url('${palette.path}')`,
      'background-position': `-${(obj.x || 0) * 48}px -${(obj.y || 0) * 48}px`,
      'width': '48px',
      'height': '48px',
      'background-size': 'auto' 
    };
  }

  isHighlight(x: number, y: number): 'move' | 'shoot' | null {
    if (!this.accionActual || !this.selectedBoardTank) return null;
    
    const dx = Math.abs(x - this.selectedBoardTank.x);
    const dy = Math.abs(y - this.selectedBoardTank.y);
    const distance = dx + dy;

    if (this.accionActual === 'Mover' && distance > 0 && distance <= 3) {
      const isTransitable = this.capa_suelo[y][x]?.tipo !== 'No_Transitable' && !this.capa_objetos[y][x];
      if (isTransitable) return 'move';
    }

    if (this.accionActual === 'Disparar' && distance > 0 && distance <= 5) {
      return 'shoot';
    }

    return null;
  }

  onClickCasilla(x: number, y: number) {
    if (!this.accionActual) return;

    if (this.accionActual === 'Poner') {
      if (this.tanqueEnMano && !this.capa_objetos[y][x]) {
        this.capa_objetos[y][x] = {
          isTank: true,
          id: this.tanqueEnMano.id,
          sheet: this.tanqueEnMano.sheet,
          x: 0, y: 0
        };
        this.onTankActionComplete.emit();
      }
    } else if (this.accionActual === 'Mover') {
      if (!this.selectedBoardTank) {
        if (this.capa_objetos[y][x] && this.capa_objetos[y][x].isTank) {
          this.selectedBoardTank = {x, y};
        }
      } else {
        if (this.isHighlight(x, y) === 'move') {
          this.capa_objetos[y][x] = this.capa_objetos[this.selectedBoardTank.y][this.selectedBoardTank.x];
          this.capa_objetos[this.selectedBoardTank.y][this.selectedBoardTank.x] = null;
          this.selectedBoardTank = null;
          this.onTankActionComplete.emit();
        } else {
          this.selectedBoardTank = null;
        }
      }
    } else if (this.accionActual === 'Disparar') {
      if (!this.selectedBoardTank) {
        if (this.capa_objetos[y][x] && this.capa_objetos[y][x].isTank) {
          this.selectedBoardTank = {x, y};
        }
      } else {
        if (this.isHighlight(x, y) === 'shoot' && this.capa_objetos[y][x] && this.capa_objetos[y][x].isTank) {
          console.log("¡Boom! Tanque atacado en", x, y);
          this.selectedBoardTank = null;
          this.onTankActionComplete.emit();
        } else {
          this.selectedBoardTank = null;
        }
      }
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3.0);
    } else {
      this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
    }
    this.constrainPan();
  }

  onMouseDown(event: MouseEvent) {
    // Only drag with left click or middle click maybe?
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
