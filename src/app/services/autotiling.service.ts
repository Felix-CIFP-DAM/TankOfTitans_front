import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutotilingService {

  // Map of 256 possible bitmasks to 47 unique tile indices
  // This is a standard mapping for 3x3 minimal autotiling
  private readonly maskToTileIndex: { [key: number]: number } = {
    0: 0, 1: 1, 4: 2, 5: 3, 7: 4, 16: 5, 17: 6, 20: 7, 21: 8, 23: 9, 28: 10, 29: 11, 31: 12, 
    64: 13, 65: 14, 68: 15, 69: 16, 71: 17, 80: 18, 81: 19, 84: 20, 85: 21, 87: 22, 92: 23, 
    93: 24, 95: 25, 112: 26, 113: 27, 116: 28, 117: 29, 119: 30, 124: 31, 125: 32, 127: 33, 
    193: 34, 197: 35, 199: 36, 209: 37, 213: 38, 215: 39, 221: 40, 223: 41, 241: 42, 245: 43, 
    247: 44, 253: 45, 255: 46
  };

  /**
   * Calculates the 8-bit bitmask for a tile at (x, y) in the grid.
   * Corner constraints are applied: a diagonal neighbor only counts if both adjacent cardinals match.
   */
  calculateBitmask(grid: string[][], x: number, y: number): number {
    const type = grid[y][x];
    const rows = grid.length;
    const cols = grid[0].length;

    let mask = 0;

    // Cardinal neighbors
    const n = this.isSameType(grid, x, y - 1, type);
    const s = this.isSameType(grid, x, y + 1, type);
    const e = this.isSameType(grid, x + 1, y, type);
    const w = this.isSameType(grid, x - 1, y, type);

    // Diagonal neighbors (with constraints)
    const ne = n && e && this.isSameType(grid, x + 1, y - 1, type);
    const se = s && e && this.isSameType(grid, x + 1, y + 1, type);
    const sw = s && w && this.isSameType(grid, x - 1, y + 1, type);
    const nw = n && w && this.isSameType(grid, x - 1, y - 1, type);

    if (n) mask |= 1;
    if (ne) mask |= 2;
    if (e) mask |= 4;
    if (se) mask |= 8;
    if (s) mask |= 16;
    if (sw) mask |= 32;
    if (w) mask |= 64;
    if (nw) mask |= 128;

    return mask;
  }

  /**
   * Returns the tile index (0-46) based on the 8-bit mask.
   */
  getTileIndex(mask: number): number {
    return this.maskToTileIndex[mask] ?? 0;
  }

  private isSameType(grid: string[][], x: number, y: number, type: string): boolean {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
      // Out of bounds counts as "same type" for better edge blending (optional, but common)
      // Or we can return false for "empty/border"
      return true; 
    }
    return grid[y][x] === type;
  }
}
