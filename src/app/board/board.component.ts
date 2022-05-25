import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BLOCK_SIZE, COLORS, COLS, KEY, ROWS } from 'src/app/constants';
import { IPiece } from 'src/assets/IPiece';
import { Piece } from 'src/assets/Piece';
import { GameService } from './game.service';

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
    [KEY.UP]: (p: IPiece): IPiece => { return this.service.rotate(p) },
    [KEY.SPACE]: (p: IPiece): IPiece => ({...p, yPos: p.yPos + 1})
  }

  ctx: CanvasRenderingContext2D;
  points: number;
  lines: number;
  level: number;
  time = {start: 0, elapsed: 0, level: 1000};
  
  constructor(private service: GameService){}

  ngOnInit(): void {
    this.initBoard()
  }

  initBoard(){
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  drop(){
    const p = {...this.piece, yPos: this.piece.yPos + 1}
    if(this.service.valid(p, this.board)){
      this.piece.move(p);
    }
  }

  draw(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.piece.draw();
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {     
        if (value > 0){
                this.ctx.fillStyle = COLORS[value];
                this.ctx.fillRect(x++, y++, 1, 1);
            }
        })
    })
  }

  animate(now = 0){
    this.time.elapsed = now - this.time.start;
    if(this.time.elapsed > this.time.level) {
      this.time.start = now;
      this.drop();
    }
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  play(){
    this.board = this.service.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.animate();
    console.table(this.board);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.moves[event.code]){
      event.preventDefault();
      let p = this.moves[event.code](this.piece); 
      if(event.code === KEY.SPACE) {
        while (this.service.valid(p, this.board)) {
          this.piece.move(p);
          p = this.moves[KEY.DOWN](this.piece);
        }
      }
      if(this.service.valid(p, this.board)){
        
        this.piece.move(p);
      }
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }

}
