"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.initHandlers(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => user != socket);
    }
    initHandlers(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    console.log("something happend1");
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    console.log("something heappen2");
                    this.pendingUser = socket;
                }
            }
            if (message.type == messages_1.MOVE) {
                const game = this.games.find((game) => game.player1 == socket || game.player2 == socket);
                if (game)
                    game === null || game === void 0 ? void 0 : game.makeMove(socket, message.move);
            }
        });
    }
}
exports.GameManager = GameManager;
