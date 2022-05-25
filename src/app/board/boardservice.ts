import { COLS, ROWS } from "../constants";

class BoardService {
  getEmptyBoard(): number[][] {
    return Array.from({length: ROWS}, ()=> Array(COLS).fill(0));
  }
}

export const boardService = new BoardService();