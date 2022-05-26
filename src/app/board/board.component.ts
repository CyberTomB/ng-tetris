import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BLOCK_SIZE, COLORS, COLS, KEY, Levels, LINES_PER_LEVEL, Points, ROWS } from 'src/app/constants';
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
  @ViewChild('next', {static: true})
  canvasNext: ElementRef<HTMLCanvasElement>;
  isPaused: boolean = false;
  board: number[][];
  piece: Piece;
  next: Piece;
  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({...p, xPos: p.xPos - 1}),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({...p, xPos: p.xPos + 1}),
    [KEY.DOWN]: (p: IPiece): IPiece => ({...p, yPos: p.yPos + 1}),
    [KEY.UP]: (p: IPiece): IPiece => { return this.service.rotate(p) },
    [KEY.SPACE]: (p: IPiece): IPiece => ({...p, yPos: p.yPos + 1})
  }

  ctx: CanvasRenderingContext2D;
  ctxNext: CanvasRenderingContext2D;
  points: number = 0;
  lines: number;
  level: number;
  time = {start: 0, elapsed: 0, level: 1000};
  requestId: number;
  
  constructor(private service: GameService){}

  ngOnInit(): void {
    this.initBoard();
    this.initNext();
    this.resetGame();
  }

  initBoard(){
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  initNext(){
    this.ctxNext = this.canvasNext.nativeElement.getContext('2d');

    this.ctxNext.canvas.width = 6 * BLOCK_SIZE;
    this.ctxNext.canvas.height = 6 * BLOCK_SIZE;

    this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  drop(): boolean{
    let p = this.moves[KEY.DOWN](this.piece);
    if(this.service.valid(p, this.board)){
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if(this.piece.yPos === 0){
        return false;
      }
      this.piece = this.next;
      this.next = new Piece(this.ctx);
      this.next.drawNext(this.ctxNext);
    }
    return true;
  }

  gameOver(){
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4);
  }

  getLineClearPoints(lines: number): number{
    switch (lines){
      case 1: {
        return Points.SINGLE;
      }
      case 2: {
        return Points.DOUBLE;
      }
      case 3: {
        return Points.TRIPLE;
      }
      case 4: {
        return Points.TETRIS;
      }
      default: {
        return 0;
      }
    }
  }

  clearLines(){
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if(lines > 0 ){
      this.points += this.getLineClearPoints(lines) * (this.level + 1);
      this.lines += lines;
    }
    this.checkLevelUp();
  }

  checkLevelUp(){
    if (this.lines >= LINES_PER_LEVEL){
      this.level++;
      this.lines -= LINES_PER_LEVEL;
      this.time.level = Levels[this.level];
    }
  }

  freeze(){
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value > 0) {
          this.board[y + this.piece.yPos][x + this.piece.xPos] = value;
        }
      });
    });
    this.clearLines();    
  }
  
  drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {     
        if (value > 0){
                this.ctx.fillStyle = COLORS[value - 1];
                this.ctx.fillRect(x, y, 1, 1);
            }
        })
    })
  }

  draw(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.drawBoard();
    this.piece.draw();
  }

  animate(now = 0){
    this.time.elapsed = now - this.time.start;
    if(this.time.elapsed > this.time.level) {
      this.time.start = now;
      if(!this.drop()){
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  play(){
    this.resetGame();
    this.next = new Piece(this.ctx);
    this.piece = new Piece(this.ctx);
    this.next.drawNext(this.ctxNext);
    this.time.start = performance.now();

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.animate();
  }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.service.getEmptyBoard();
    this.time = { start: 0, elapsed: 0, level: Levels[this.level]}
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {    
    event.preventDefault();

    if(event.code === KEY.ESC){
      this.pauseGame();
    }

    if(!this.isPaused){
      if(this.moves[event.code]){
        let p = this.moves[event.code](this.piece); 
        if(event.code === KEY.SPACE) {          
          while (this.service.valid(p, this.board)) {
            this.points += Points.HARD_DROP;
            this.piece.move(p);
            p = this.moves[KEY.DOWN](this.piece);
          }
        }
        if(this.service.valid(p, this.board)){
          this.piece.move(p);
          if(event.key === 'ArrowDown'){
            this.points += Points.SOFT_DROP;
          }
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      }
    }
  }

  pauseGame(){
    console.log("Paused");
    if(this.isPaused){
      this.isPaused = false;
      this.animate();
    } else {
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText('PAUSED', 1.8, 4);
    this.isPaused = true;
    }
  }

}
