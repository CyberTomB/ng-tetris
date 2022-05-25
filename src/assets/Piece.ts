import { BLOCK_SIZE } from "src/app/constants";
import { IPiece } from "./IPiece";

export class Piece implements IPiece {
    xPos: number;
    yPos: number;
    color: string;
    shape: number[][];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.spawn();
        this.draw();
    }

    spawn(){
        this.color = 'blue';
        this.shape = [[2, 0, 0], [2, 2, 2], [0, 0, 0]];
        this.xPos = 3;
        this.yPos = 0;
    }

    draw(){
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0){
                    this.ctx.fillRect(this.xPos + x, this.yPos + y, 1, 1);
                }
            })
        })
    }
}