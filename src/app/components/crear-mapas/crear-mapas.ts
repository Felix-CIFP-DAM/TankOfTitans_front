import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutotilingService } from '../../services/autotiling.service';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TalkerService } from '../../services/talker-service';


export interface TileInfo {
  x: number;
  y: number;
  sheet: string;
  tipo: 'Transitable' | 'No_Transitable' | 'Base_J1' | 'Base_J2';
}

export interface ObjectInfo {
  x: number;
  y: number;
  sheet: string;
  tipo: 'Transitable' | 'No_Transitable' | 'Base_J1' | 'Base_J2';
}

export interface PaletteDef {
  id: string;
  path: string;
  cols: number;
  rows: number;
  type: 'suelo' | 'objeto';
}

@Component({
  selector: 'app-crear-mapas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-mapas.html',
  styleUrl: './crear-mapas.css',
})
export class CrearMapas implements OnInit, OnDestroy {
  // Layers
  capa_suelo: TileInfo[][] = [];
  capa_objetos: (ObjectInfo | null)[][] = [];

  cols = 20;
  rows = 15;

  get colLabels(): string[] {
    const labels = [];
    for (let i = 0; i < this.cols; i++) {
      let label = '';
      let n = i;
      while (n >= 0) {
        label = String.fromCharCode((n % 26) + 65) + label;
        n = Math.floor(n / 26) - 1;
      }
      labels.push(label);
    }
    return labels;
  }

  get rowLabels(): string[] {
    return Array.from({ length: this.rows }, (_, i) => (i + 1).toString());
  }

  nombreMapa: string = 'Batalla en el Ebro';

  // Selection Logic
  selectedSprite: { x: number, y: number, sheet: string } = { x: 0, y: 0, sheet: 'suelos-1' };
  selectedTipo: 'Transitable' | 'No_Transitable' | 'Base_J1' | 'Base_J2' = 'Transitable';
  isMouseDown = false;

  // Zoom & Pan state
  zoomLevel = 1.0;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  translateX = 0;
  translateY = 0;

  // Palettes
  palettes: PaletteDef[] = [
    { id: 'afueras-1', path: '/assets/tilesets/afueras-1.png', cols: 8, rows: 16, type: 'suelo' },
    { id: 'paredes-1', path: '/assets/tilesets/paredes-1.png', cols: 16, rows: 15, type: 'suelo' },
    { id: 'paredes-2', path: '/assets/tilesets/paredes-2.png', cols: 16, rows: 15, type: 'suelo' },
    { id: 'suelos-1', path: '/assets/tilesets/suelos-1.png', cols: 16, rows: 12, type: 'suelo' },
    { id: 'suelos-2', path: '/assets/tilesets/suelos-2.png', cols: 16, rows: 12, type: 'suelo' },
    { id: 'suelos-3', path: '/assets/tilesets/suelos-3.png', cols: 8, rows: 16, type: 'suelo' },
    { id: 'techos-1', path: '/assets/tilesets/techos-1.png', cols: 16, rows: 8, type: 'suelo' },
    { id: 'techos-2', path: '/assets/tilesets/techos-2.png', cols: 16, rows: 8, type: 'suelo' },
    { id: 'miscelaneous-1', path: '/assets/sprites/miscelaneous-1.png', cols: 16, rows: 16, type: 'objeto' },
    { id: 'miscelaneous-2', path: '/assets/sprites/miscelaneous-2.png', cols: 16, rows: 16, type: 'objeto' },
    { id: 'miscelaneous-3', path: '/assets/sprites/miscelaneous-3.png', cols: 16, rows: 16, type: 'objeto' },
    { id: 'miscelaneous-4', path: '/assets/sprites/miscelaneous-4.png', cols: 16, rows: 16, type: 'objeto' },
  ];
  activePaletteId: string = 'suelos-1';

  get activePalette(): PaletteDef | undefined {
    return this.palettes.find(p => p.id === this.activePaletteId);
  }

  private socketSub?: Subscription;

  constructor(
    private websocketService: WebsocketService,
    private talkerService: TalkerService
  ) {
    this.initGrid();
  }

  ngOnInit() {
    this.websocketService.connect();
    this.socketSub = this.websocketService.listen('mapa:cargar').subscribe((mapData: any) => {
      if (mapData && mapData.data) {
        if (mapData.data.suelo) this.capa_suelo = mapData.data.suelo;
        if (mapData.data.objetos) this.capa_objetos = mapData.data.objetos;
        this.nombreMapa = mapData.nombreMapa || this.nombreMapa;
      }
    });

    this.websocketService.listen('mapa:guardado').subscribe((res: any) => {
      if (res.success) {
        console.log('✅ Mapa guardado con éxito:', res.mapa);
        this.talkerService.notificarExito('MAPA GUARDADO CORRECTAMENTE');
      } else {
        console.error('❌ Error al guardar:', res.mensaje);
        this.talkerService.notificarError('ERROR AL GUARDAR EL MAPA: ' + res.mensaje);
      }
    });
  }

  ngOnDestroy() {
    this.socketSub?.unsubscribe();
  }

  initGrid() {
    // Default: Suelo-1 Transitable
    this.capa_suelo = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(null).map(() => ({ x: 0, y: 0, sheet: 'suelos-1', tipo: 'Transitable' }))
    );
    this.capa_objetos = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(null)
    );
  }

  resizeGrid(newCols: number, newRows: number) {
    this.cols = newCols;
    this.rows = newRows;
    this.initGrid();
  }

  onMouseDown(x: number, y: number, event: MouseEvent) {
    if (event.button === 0 && !event.shiftKey) {
      this.isMouseDown = true;
      this.paint(x, y);
    } else if (event.button === 1 || (event.button === 0 && event.shiftKey)) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.translateX;
      this.dragStartY = event.clientY - this.translateY;
    }
  }

  onMouseEnter(x: number, y: number) {
    if (this.isMouseDown) {
      this.paint(x, y);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.translateX = event.clientX - this.dragStartX;
      this.translateY = event.clientY - this.dragStartY;
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
    this.isDragging = false;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    // Solo hacer zoom si el ratón está sobre el viewport del mapa
    const target = event.target as HTMLElement;
    if (target.closest('.grid-viewport')) {
      event.preventDefault();
      const zoomSpeed = 0.1;
      if (event.deltaY < 0) {
        this.zoomLevel = Math.min(this.zoomLevel + zoomSpeed, 3.0);
      } else {
        this.zoomLevel = Math.max(this.zoomLevel - zoomSpeed, 0.2);
      }
    }
  }

  paint(x: number, y: number) {
    if (this.selectedTipo === 'Base_J1' || this.selectedTipo === 'Base_J2') {
      this.paintBase(x, y, this.selectedTipo);
      return;
    }

    const palette = this.palettes.find(p => p.id === this.selectedSprite.sheet);
    if (!palette) return;

    if (palette.type === 'objeto') {
      this.capa_objetos[y][x] = { ...this.selectedSprite, tipo: this.selectedTipo } as ObjectInfo;
    } else {
      this.capa_suelo[y][x] = {
        x: this.selectedSprite.x,
        y: this.selectedSprite.y,
        sheet: this.selectedSprite.sheet,
        tipo: this.selectedTipo
      };
    }
  }

  paintBase(x: number, y: number, tipo: 'Base_J1' | 'Base_J2') {
    // Validar que quepa un 2x2
    if (x + 1 >= this.cols || y + 1 >= this.rows) return;

    // Eliminar base previa del mismo jugador si existe
    this.removeBase(tipo);

    // Pintar 2x2 en capa de objetos
    // Por ahora usamos un sprite genérico (miscelaneous-1, x:8, y:0 es una caja)
    // El usuario podrá cambiar el sprite después si quiere, pero el TIPO será lo importante
    const baseSprite = { sheet: 'miscelaneous-1', x: 8, y: 0 }; 

    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        this.capa_objetos[y + dy][x + dx] = { 
          ...baseSprite, 
          x: baseSprite.x + dx, 
          y: baseSprite.y + dy, 
          tipo 
        };
      }
    }
  }

  removeBase(tipo: string) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const obj = this.capa_objetos[y][x];
        if (obj && obj.tipo === tipo) {
          this.capa_objetos[y][x] = null;
        }
      }
    }
  }

  selectFromPalette(x: number, y: number, sheet: string) {
    this.selectedSprite = { x, y, sheet };

    // Smart default: If it's a wall or water, set to No_Transitable
    if (sheet.includes('paredes') || sheet.includes('afueras')) {
      this.selectedTipo = 'No_Transitable';
    } else if (sheet.includes('suelos') || sheet.includes('techos')) {
      this.selectedTipo = 'Transitable';
    }
  }

  onPaletteChange(newId: string) {
    this.activePaletteId = newId;
  }

  clearObject(x: number, y: number) {
    this.capa_objetos[y][x] = null;
  }

  esTransitable(x: number, y: number): boolean {
    const tile = this.capa_suelo[y][x];
    const obj = this.capa_objetos[y][x];

    if (obj && obj.tipo === 'No_Transitable') return false;
    if (tile.tipo === 'No_Transitable') return false;

    return true;
  }

  saveMap() {
    const mapData = {
      nombreMapa: this.nombreMapa,
      ancho: this.cols,
      alto: this.rows,
      data: {
        suelo: this.capa_suelo,
        objetos: this.capa_objetos
      }
    };
    this.websocketService.emit('mapa:guardar', mapData);
    localStorage.setItem('mapa_temp', JSON.stringify(mapData));
    console.log('Mapa enviado al servidor y guardado en local:', mapData);
  }

  getTileStyle(tile: TileInfo | null) {
    if (!tile) return {};
    const palette = this.palettes.find(p => p.id === tile.sheet);
    if (!palette) return {};
    return {
      'background-image': `url('${palette.path}')`,
      'background-position': `-${tile.x * 48}px -${tile.y * 48}px`,
      'opacity': tile.tipo === 'Transitable' && tile.x === 0 && tile.y === 0 && tile.sheet === 'suelos-1' ? '0' : '1'
    };
  }

  getObjectStyle(obj: ObjectInfo | null) {
    if (!obj) return { 'display': 'none' };
    const palette = this.palettes.find(p => p.id === obj.sheet);
    if (!palette) return {};
    return {
      'background-image': `url('${palette.path}')`,
      'background-position': `-${obj.x * 48}px -${obj.y * 48}px`,
      'width': '48px',
      'height': '48px',
      'background-size': 'auto'
    };
  }

  getNumbers(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}




