"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.turn = 0;
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
        if (this.turn % 2 == 0 && this.player1 != socket)
            return;
        if (this.turn % 2 != 0 && this.player2 != socket)
            return;
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                winner: this.board.turn() == "w" ? "black" : "white",
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                winner: this.board.turn() == "w" ? "black" : "white",
            }));
            return;
        }
        this.player2.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move,
            turn: this.board.turn() == 'b' ? "black" : "white"
        }));
        this.player1.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move,
            turn: this.board.turn() == 'b' ? "black" : "white"
        }));
        this.turn++;
    }
}
exports.Game = Game;
