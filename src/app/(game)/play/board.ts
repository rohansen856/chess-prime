import {
  Bishop,
  ChessPiece,
  King,
  Knight,
  PieceName,
  PieceSide,
  Queen,
  Rook,
} from "./pieces"

enum SquareColor {
  White = "white",
  Black = "black",
  Dead = "Dead",
}

class BoardSquare {
  color: SquareColor
  piece: King | Queen | Knight | Bishop | Rook | null

  constructor(
    color: SquareColor,
    piece: King | Queen | Knight | Bishop | Rook | null = null
  ) {
    this.color = color
    this.piece = piece
  }
}

export const createChessBoard = (): BoardSquare[][] => {
  const board: BoardSquare[][] = []
  for (let x = 0; x < 8; x++) {
    const row: BoardSquare[] = []
    for (let y = 0; y < 8; y++) {
      const color = (x + y) % 2 === 0 ? SquareColor.White : SquareColor.Black
      row.push(new BoardSquare(color))
    }
    board.push(row)
  }
  board[7].push(new BoardSquare(SquareColor.Dead))
  return board
}
