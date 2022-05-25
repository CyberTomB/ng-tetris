import { COLS, ROWS } from "../constants";

class GameService {
  getEmptyBoard(): number[][] {
    return Array.from({length: ROWS}, ()=> Array(COLS).fill(0));
  }
}

export const gameService = new GameService();