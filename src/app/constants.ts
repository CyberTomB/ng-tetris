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

