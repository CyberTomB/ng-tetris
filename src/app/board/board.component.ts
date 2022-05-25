import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BLOCK_SIZE, COLS, ROWS } from 'src/app/constants';
import { boardService } from './boardservice';

@Component({
  selector: 'game-board',
  templateUrl: 'board.component.html'
})
export class BoardComponent implements OnInit {
  @ViewChild('board', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  board: number[][];

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
    console.table(this.board);
  }


}
