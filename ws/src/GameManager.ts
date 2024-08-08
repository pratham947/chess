import { WebSocket } from "ws";
import { INIT_GAME, MOVE, START_GAME } from "./messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private users : WebSocket[];
  private pendingUser: WebSocket | null;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.initHandlers(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user != socket);
  }

  private initHandlers(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type == INIT_GAME) {
        
        if (this.pendingUser) {
          console.log("something happend1");
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          console.log("something heappen2")
          this.pendingUser = socket;
        }
      }

      if (message.type == MOVE) {
        const game = this.games.find(
          (game) => game.player1 == socket || game.player2 == socket
        );
        if(game) game?.makeMove(socket, message.move);
      }
    });
  }
}
