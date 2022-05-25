import { BLOCK_SIZE, COLORS, SHAPES } from "src/app/constants";
import { IPiece } from "./IPiece";

export class Piece implements IPiece {
    xPos: number;
    yPos: number;
    color: string;
    shape: number[][];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.spawn();
    }

    spawn(){
        const typeId = this.randomizeTetrominoType(COLORS.length);
        this.color = COLORS[typeId];
        this.shape = SHAPES[typeId];
        this.xPos = 3;
        this.yPos = 0;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {     
                if (value > 0){
                    this.ctx.fillRect(this.xPos + x, this.yPos + y, 1, 1);
                }
            })
        })
    }

    drawNext(ctxNext: CanvasRenderingContext2D){
        ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
        ctxNext.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {     
                if (value > 0){
                    ctxNext.fillRect(x + 1, y + 2, 1, 1);
                }
            })
        })
    }

    move(p: IPiece) {
        this.xPos = p.xPos;
        this.yPos = p.yPos;
        this.shape = p.shape;
    }

    
  randomizeTetrominoType(noOfTypes: number): number {
    return Math.floor(Math.random() * noOfTypes);
  }
}