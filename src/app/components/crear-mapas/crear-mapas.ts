import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutotilingService } from '../../services/autotiling.service';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';


export interface TileInfo {
  x: number;
  y: number;
  sheet: string;
  tipo: 'Transitable' | 'No_Transitable';
}

export interface ObjectInfo {
  x: number;
  y: number;
  sheet: string;
  tipo: 'Transitable' | 'No_Transitable';
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

  cols = 15;
  rows = 10;

  colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  rowLabels = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  nombreMapa: string = 'Batalla en el Ebro';

  // Selection Logic
  selectedSprite: { x: number, y: number, sheet: string } = { x: 0, y: 0, sheet: 'suelos-1' };
  selectedTipo: 'Transitable' | 'No_Transitable' = 'Transitable';
  isMouseDown = false;

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
    private websocketService: WebsocketService
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

  onMouseDown(x: number, y: number) {
    this.isMouseDown = true;
    this.paint(x, y);
  }

  onMouseEnter(x: number, y: number) {
    if (this.isMouseDown) {
      this.paint(x, y);
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  paint(x: number, y: number) {
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

  selectFromPalette(x: number, y: number, sheet: string) {
    this.selectedSprite = { x, y, sheet };
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




