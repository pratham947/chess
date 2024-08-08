import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { indexToChessSquare } from "../utils";
import { MOVE } from "../Game";
import b from "../assets/b.webp";
import k from "../assets/k.png";
import p from "../assets/p.webp";
import q from "../assets/q.webp";
import r from "../assets/r.png";
import n from "../assets/n.png";

const Chessboard = ({
  board,
  socket,
  identity
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];

  socket: WebSocket;
  identity : string;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  const handleClick = (i, j) => {
    const position = indexToChessSquare(i * 8 + j) as Square;

    if (!from) {
      setFrom(position);
      return;
    }

    socket.send(
      JSON.stringify({
        type: MOVE,
        move: {
          from,
          to: position,
        },
      })
    );
    setFrom(null);
    setTo(null);
  };


  return (
    <div className="flex flex-col items-center mt-10">
      {board.map((row, i) => {
        return (
          <div className="flex" key={i}>
            {row.map((square, j) => {
              const checkColor = (i + j) % 2 == 0 ? "black" : "white";
              return (
                <div
                  key={j}
                  className={`w-20 h-20 ${
                    checkColor == "black" ? "bg-[#291302]" : "bg-[#C2A276]"
                  } p-5 border-2 flex justify-center items-center cursor-pointer`}
                  onClick={() => handleClick(i, j)}
                >
                  {square && (
                    <div>
                      <img
                        src={
                          square.type == "b"
                            ? b
                            : square.type == "k"
                            ? k
                            : square.type == "n"
                            ? n
                            : square.type == "p"
                            ? p
                            : square.type == "q"
                            ? q
                            : square.type == "r"
                            ? r
                            : ""
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Chessboard;
