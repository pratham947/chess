import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8000 });

const gameManager = new GameManager();

wss.on("connection", (socket) => {
  gameManager.addUser(socket);
  socket.on("close", () => gameManager.removeUser(socket));
});
