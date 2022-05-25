import { Injectable } from "@angular/core";
import { IPiece } from "src/assets/IPiece";
import { COLS, ROWS } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  isEmpty(value: number): boolean {
    return value === 0;
  }

  insideWalls(x: number): boolean {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y: number): boolean {
    return y < ROWS;
  }

  notOccupied(board: number[][], x: number, y: number): boolean {
    return board[y] && board[y][x] === 0;
  }

  getEmptyBoard(): number[][] {
    return Array.from({length: ROWS}, ()=> Array(COLS).fill(0));
  }

  valid(p: IPiece, board: number[][]): boolean {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.xPos + dx;
        let y = p.yPos + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) &&
          this.aboveFloor(y) &&
          this.notOccupied(board, x, y))
        );
      });
    });
  }

  rotate(piece: IPiece): IPiece{    
    let clone: IPiece = JSON.parse(JSON.stringify(piece));

    for(let y = 0; y < clone.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [clone.shape[x][y], clone.shape[y][x]] = [clone.shape[y][x], clone.shape[x][y]];
      }
    }
    clone.shape.forEach(row => row.reverse());
    
    return clone;
  }
}