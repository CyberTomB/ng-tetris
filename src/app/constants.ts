export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export class KEY {
    static readonly LEFT = "ArrowLeft";
    static readonly RIGHT = "ArrowRight";
    static readonly DOWN = "ArrowDown";
    static readonly UP = "ArrowUp";
    static readonly SPACE = "Space";
}

export class Points {
    static readonly SINGLE = 100;
    static readonly DOUBLE = 300;
    static readonly TRIPLE = 500;
    static readonly TETRIS = 800;
    static readonly SOFT_DROP = 1;
    static readonly HARD_DROP = 2;
}

export class Levels {
    static readonly 0 = 800;
    static readonly 1 = 720;
    static readonly 2 = 630;
    static readonly 3 = 550;
    static readonly 4 = 500;
    static readonly 5 = 450;
}

export const LINES_PER_LEVEL = 20;

export const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

export const SHAPES = [
    //I
    [[0, 0, 0, 0],[1, 1, 1, 1],[0, 0, 0, 0],[0, 0, 0, 0]],
    //J
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    //L
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    //O
    [[0, 4, 4], [0, 4, 4], [0, 0, 0]],
    //S
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    //T
    [[6, 6, 6], [0, 6, 0], [0, 0, 0]],
    //Z
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
]

