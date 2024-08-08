import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  player1: WebSocket;
  player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private turn: number;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.turn = 0;
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    if (this.turn % 2 == 0 && this.player1 != socket) return;

    if (this.turn % 2 != 0 && this.player2 != socket) return;

    try {
      this.board.move(move);
    } catch (error) {
      console.log(error);
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          winner: this.board.turn() == "w" ? "black" : "white",
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          winner: this.board.turn() == "w" ? "black" : "white",
        })
      );
      return;
    }

    this.player2.send(
      JSON.stringify({
        type: MOVE,
        payload: move,
        turn : this.board.turn() == 'b' ? "black" : "white"
      })
    );
    this.player1.send(
      JSON.stringify({
        type: MOVE,
        payload: move,
        turn : this.board.turn() == 'b' ? "black" : "white"
      })
    );
    this.turn++;
  }
}
