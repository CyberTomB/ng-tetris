import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BLOCK_SIZE, COLS, KEY, ROWS } from 'src/app/constants';
import { IPiece } from 'src/assets/IPiece';
import { Piece } from 'src/assets/Piece';
import { gameService } from './game.service';

@Component({
  selector: 'game-board',
  templateUrl: 'board.component.html'
})
export class BoardComponent implements OnInit {
  @ViewChild('board', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  board: number[][];
  piece: Piece;
  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({...p, xPos: p.xPos - 1}),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({...p, xPos: p.xPos + 1}),
    [KEY.DOWN]: (p: IPiece): IPiece => ({...p, yPos: p.yPos + 1}),
  }

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

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play(){
    this.board = gameService.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.draw();
    console.table(this.board);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.moves[event.code]){
      event.preventDefault();
      const p = this.moves[event.key](this.piece); 
      this.piece.move(p);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.piece.draw();
    }
  }

}
