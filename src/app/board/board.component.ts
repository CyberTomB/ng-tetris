import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BLOCK_SIZE, COLS, ROWS } from 'src/app/constants';
import { Piece } from 'src/assets/Piece';
import { boardService } from './boardservice';

@Component({
  selector: 'game-board',
  templateUrl: 'board.component.html'
})
export class BoardComponent implements OnInit {
  @ViewChild('board', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  board: number[][];
  piece: Piece;

  ctx: CanvasRenderingContext2D;
  points: number;
  lines: number;
  level: number;

  ngOnInit(): void {
    this.initBoard()
  }

  initBoard(){
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  }

  play(){
    this.board = boardService.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    console.table(this.board);
  }


}
