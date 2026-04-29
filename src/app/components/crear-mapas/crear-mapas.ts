import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutotilingService } from '../../services/autotiling.service';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-mapas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crear-mapas.html',
  styleUrl: './crear-mapas.css',
})
export class CrearMapas implements OnInit, OnDestroy {
  // 15 columns x 10 rows
  grid: string[][] = [];
  masks: number[][] = [];
  
  cols = 15;
  rows = 10;
  
  colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  rowLabels = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  selectedBrush: string = 'G'; // G (Gras), W (Water), M (Mountain), B (Bridge)
  isMouseDown = false;

  private socketSub?: Subscription;

  constructor(
    private autotilingService: AutotilingService,
    private websocketService: WebsocketService
  ) {
    this.initGrid();
  }

  ngOnInit() {
    this.websocketService.connect();
    this.socketSub = this.websocketService.listen('mapa:cargar').subscribe((mapData: any) => {
      if (mapData && mapData.grid) {
        this.grid = mapData.grid;
        this.recalculateAllMasks();
      }
    });
  }

  ngOnDestroy() {
    this.socketSub?.unsubscribe();
  }

  initGrid() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill('G'));
    this.masks = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.recalculateAllMasks();
  }

  recalculateAllMasks() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.updateMask(x, y);
      }
    }
  }

  updateMask(x: number, y: number) {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      const bitmask = this.autotilingService.calculateBitmask(this.grid, x, y);
      this.masks[y][x] = this.autotilingService.getTileIndex(bitmask);
    }
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
    if (this.grid[y][x] !== this.selectedBrush) {
      this.grid[y][x] = this.selectedBrush;
      
      // Update this tile and its 8 neighbors
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          this.updateMask(x + dx, y + dy);
        }
      }
    }
  }

  selectBrush(brush: string) {
    this.selectedBrush = brush;
  }

  saveMap() {
    const mapData = {
      grid: this.grid,
      timestamp: new Date().toISOString()
    };
    this.websocketService.emit('mapa:guardar', mapData);
    console.log('Mapa enviado al servidor:', mapData);
  }

  getTileStyle(x: number, y: number) {
    const type = this.grid[y][x];
    const index = this.masks[y][x];
    
    // Each tile is 32x32 in a 47-tile horizontal sheet
    // We can use classes for different types
    return {
      'background-position': `-${index * 32}px 0px`
    };
  }
}
