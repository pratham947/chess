import React, { useEffect, useState } from "react";
import Chessboard from "./components/Chessboard";
import Button from "./components/Button";
import { useSocket } from "./hooks/useSocket";
import { Chess } from "chess.js";
import useSound from "use-sound";
import moveSound from "./assets/move.mp3";

// code repition here
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const START_GAME = "start_game";
export const ON_TURN = "turn";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [identity, setIdentity] = useState<null | string>(null);
  const [isMyTurn, setIsMyTurn] = useState<null | boolean>(null);
  const [play] = useSound(moveSound);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          setIsGameStarted(true);
          setIdentity(message?.payload?.color);
          if (message.payload.color == "white") {
            setIsMyTurn(true);
          } else setIsMyTurn(false);
          break;
        case MOVE:
          const move = message?.payload;
          const turn = message.turn;
          chess.move(move);
          setBoard(chess.board());
          play();
          if (identity == turn) {
            setIsMyTurn(true);
          } else setIsMyTurn(false);
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
        case ON_TURN:
      }
    };
  }, [socket, chess, identity]);

  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <Chessboard board={board} socket={socket} identity={identity} />
      </div>
      <div className="w-1/2 p-10">
        {!isGameStarted && (
          <Button
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: "init_game",
                })
              );
            }}
          >
            Play
          </Button>
        )}
        <p>{isMyTurn != null && (isMyTurn ? "Your turn" : "opponent turn")}</p>
      </div>
    </div>
  );
};

export default Game;
