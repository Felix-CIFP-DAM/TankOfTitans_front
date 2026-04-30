import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutotilingService } from '../../services/autotiling.service';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';


export interface TileInfo {
  x: number;
  y: number;
  sheet: 'grass' | 'water';
  tipo: 'G' | 'W'; // G = Hierba (Transitable), W = Agua (Bloqueado)
}

export interface ObjectInfo {
  x: number;
  y: number;
  sheet: 'world';
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
  selectedSprite: { x: number, y: number, sheet: 'grass' | 'water' | 'world' } = { x: 6, y: 3, sheet: 'water' };
  selectedTipo: 'G' | 'W' = 'G'; // User chooses if the current stamp acts as Grass or Water
  isMouseDown = false;

  // Palette dimensions
  waterSheet = { cols: 8, rows: 6 };
  grassSheet = { cols: 20, rows: 39 }; // 637px / 32px ~ 20, 1254px / 32px ~ 39

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
    // Default: All grass
    this.capa_suelo = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(null).map(() => ({ x: 6, y: 3, sheet: 'water', tipo: 'G' }))
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
    if (this.selectedSprite.sheet === 'world') {
      this.capa_objetos[y][x] = { ...this.selectedSprite } as ObjectInfo;
    } else {
      this.capa_suelo[y][x] = {
        x: this.selectedSprite.x,
        y: this.selectedSprite.y,
        sheet: 'water', // Fixed to water sheet as requested
        tipo: this.selectedTipo
      };
    }
  }

  selectFromPalette(x: number, y: number, sheet: 'grass' | 'water' | 'world') {
    this.selectedSprite = { x, y, sheet };
    // Auto-select tipo based on sheet for convenience, but user can override
    if (sheet === 'water') {
      // If it's near the top, it's likely water, if bottom, likely grass
      this.selectedTipo = y < 3 ? 'W' : 'G';
    }
  }

  clearObject(x: number, y: number) {
    this.capa_objetos[y][x] = null;
  }

  esTransitable(x: number, y: number): boolean {
    const tile = this.capa_suelo[y][x];
    const obj = this.capa_objetos[y][x];

    if (obj) return false; // Any object (Cliff/Base/Tree) blocks by default unless we refine this
    if (tile.tipo === 'W') return false; // Water blocks

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
    console.log('Mapa enviado al servidor:', mapData);
  }

  getTileStyle(tile: TileInfo | null) {
    if (!tile) return {};
    return {
      'background-image': `url('/assets/tilesets/water.jpg')`,
      'background-position': `-${tile.x * 32}px -${tile.y * 32}px`,
      'opacity': tile.tipo === 'G' && tile.x === 6 && tile.y === 3 ? '0' : '1' // Optimization to see base grass
    };
  }

  getObjectStyle(obj: ObjectInfo | null) {
    if (!obj) return { 'display': 'none' };
    return {
      //'background-image': `url('/assets/sprites/objetos.png')`,
      'background-image': `url('/assets/tilesets/prueba.jpg')`,
      'background-position': `-${obj.x * 32}px -${obj.y * 32}px`
    };
  }

  getNumbers(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}




