import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutotilingService {

  /**
   * Calculates the 4-bit bitmask for a tile at (x, y) in the grid.
   * Neighbors: North (1), East (2), South (4), West (8).
   */
  calculateBitmask(grid: string[][], x: number, y: number): number {
    const type = grid[y][x];
    let mask = 0;

    if (this.isSameType(grid, x, y - 1, type)) mask |= 1; // North
    if (this.isSameType(grid, x + 1, y, type)) mask |= 2; // East
    if (this.isSameType(grid, x, y + 1, type)) mask |= 4; // South
    if (this.isSameType(grid, x - 1, y, type)) mask |= 8; // West

    return mask;
  }

  /**
   * Returns the tile index (0-15) based on the 4-bit mask.
   * In 4-bit system, the mask usually maps directly to the tile position.
   */
  getTileIndex(mask: number): number {
    return mask;
  }

  private isSameType(grid: string[][], x: number, y: number, type: string): boolean {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
      return true; // Out of bounds counts as same type for edge blending
    }
    return grid[y][x] === type;
  }
}

