export const indexToChessSquare = (index: number) => {
    const column = String.fromCharCode('a'.charCodeAt(0) + (index % 8));
    const row = 8 - Math.floor(index / 8);
    return `${column}${row}`;
  };