import { toast } from "@/components/ui/use-toast"

export enum PieceName {
  pawn = "Pawn",
  rook = "Rook",
  knight = "Knight",
  bishop = "Bishop",
  king = "King",
  queen = "Queen",
}

export enum PieceSide {
  black = "Black",
  white = "White",
}

export type PiecePosition = {
  x: number
  y: number
}

export function moveTranslator(position: PiecePosition) {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"].reverse()
  return `${rows[position.y]}${position.x + 1}`
}

export class ChessPiece {
  name: PieceName
  side: PieceSide
  position: PiecePosition
  hasMoved: boolean
  inCheck: boolean
  allowed: {
    up: PiecePosition[]
    down: PiecePosition[]
    right: PiecePosition[]
    left: PiecePosition[]
    upLeft: PiecePosition[]
    upRight: PiecePosition[]
    downLeft: PiecePosition[]
    downRight: PiecePosition[]
    special: PiecePosition[]
  }
  icon: string

  constructor(side: PieceSide, position: PiecePosition) {
    this.side = side
    this.position = position
    this.hasMoved = false
    this.inCheck = false
    this.allowed = {
      up: [],
      down: [],
      right: [],
      left: [],
      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: [],
      special: [],
    }
  }

  move(newPosition: PiecePosition, board: ChessPiece[]) {
    this.position = newPosition
    this.hasMoved = true
    const newPossibleMoves = this.getPossibleMoves(board)

    newPossibleMoves.forEach((move) => {
      if (
        board.find(
          (piece) =>
            piece.name === PieceName.king &&
            piece.position.x === move.x &&
            piece.position.y === move.y &&
            piece.side !== this.side
        )
      ) {
        this.inCheck = true
        toast({
          title: "Check!",
          variant: "destructive",
        })

        board.forEach((piece) => {
          if (
            piece.side !== this.side &&
            piece
              .getPossibleMoves(board)
              .find((pos) => pos.x === newPosition.x && pos.y === newPosition.y)
          ) {
            console.log("saveable")
          }
        })
      }
    })
  }

  getPosition(): PiecePosition {
    return this.position
  }

  getPossibleMoves(board: ChessPiece[]): PiecePosition[] {
    const moves: { x: number; y: number }[] = []

    for (const move of this.allowed.up) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.down) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.right) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.left) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.upLeft) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.upRight) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.downLeft) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.downRight) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (occupyingPiece) break
      }
    }

    for (const move of this.allowed.special) {
      const newX = this.getPosition().x + move.x
      const newY = this.getPosition().y + move.y

      // Check if the new position is on the board
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check if the new position is not occupied by a piece of the same side
        const occupyingPiece = board.find(
          (piece) => piece.position.x === newX && piece.position.y === newY
        )

        if (!occupyingPiece || occupyingPiece.side !== this.side) {
          moves.push({ x: newX, y: newY })
        }

        if (this.name === PieceName.pawn) {
          if (this.side === PieceSide.black) {
            if (
              board.find(
                (piece) =>
                  piece.position.x === this.position.x + 1 &&
                  piece.position.y === this.position.y + 1 &&
                  piece.side !== this.side
              )
            ) {
              moves.push({ x: this.position.x + 1, y: this.position.y + 1 })
            }
            if (
              board.find(
                (piece) =>
                  piece.position.x === this.position.x + 1 &&
                  piece.position.y === this.position.y - 1 &&
                  piece.side !== this.side
              )
            ) {
              moves.push({ x: this.position.x + 1, y: this.position.y - 1 })
            }
          } else {
            if (
              board.find(
                (piece) =>
                  piece.position.x === this.position.x - 1 &&
                  piece.position.y === this.position.y + 1 &&
                  piece.side !== this.side
              )
            ) {
              moves.push({ x: this.position.x - 1, y: this.position.y + 1 })
            }
            if (
              board.find(
                (piece) =>
                  piece.position.x === this.position.x - 1 &&
                  piece.position.y === this.position.y - 1 &&
                  piece.side !== this.side
              )
            ) {
              moves.push({ x: this.position.x - 1, y: this.position.y - 1 })
            }
          }
          if (occupyingPiece) break
          if (this.side === PieceSide.black && this.position.x > 1) return moves
          else if (this.side === PieceSide.white && this.position.x < 6)
            return moves
        }
      }
    }

    return moves
  }

  delete() {
    this.position = { x: 7, y: 8 }
    toast({
      title: `${this.side} ${this.name} Died`,
      variant: "destructive",
    })
  }

  toString(): string {
    return `${this.side} ${this.name} at (${moveTranslator(this.position)})`
  }
}

export class King extends ChessPiece {
  name = PieceName.king

  constructor(side: PieceSide, position: PiecePosition) {
    super(side, position)
    this.allowed = {
      up: [],
      down: [],
      right: [],
      left: [],
      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: [],
      special: [
        //1step all direction
        { x: 0 - 1, y: 0 - 1 },
        { x: 0, y: 0 - 1 },
        { x: 0 + 1, y: 0 - 1 },
        { x: 0 - 1, y: 0 },
        { x: 0 + 1, y: 0 },
        { x: 0 - 1, y: 0 + 1 },
        { x: 0, y: 0 + 1 },
        { x: 0 + 1, y: 0 + 1 },
      ],
    }
  }

  icon = `/pieces/Chess_k${this.side === PieceSide.black ? "d" : "l"}t45.svg`
}

export class Queen extends ChessPiece {
  name = PieceName.queen

  constructor(side: PieceSide, position: PiecePosition) {
    super(side, position)
    // Add allowed moves for the queen
    this.allowed = {
      //up-down
      right: [
        { x: 0, y: 0 + 1 },
        { x: 0, y: 0 + 2 },
        { x: 0, y: 0 + 3 },
        { x: 0, y: 0 + 4 },
        { x: 0, y: 0 + 5 },
        { x: 0, y: 0 + 6 },
        { x: 0, y: 0 + 7 },
      ],

      left: [
        { x: 0, y: 0 - 1 },
        { x: 0, y: 0 - 2 },
        { x: 0, y: 0 - 3 },
        { x: 0, y: 0 - 4 },
        { x: 0, y: 0 - 5 },
        { x: 0, y: 0 - 6 },
        { x: 0, y: 0 - 7 },
      ],

      up: [
        { x: 0 - 1, y: 0 },
        { x: 0 - 2, y: 0 },
        { x: 0 - 3, y: 0 },
        { x: 0 - 4, y: 0 },
        { x: 0 - 5, y: 0 },
        { x: 0 - 6, y: 0 },
        { x: 0 - 7, y: 0 },
      ],

      down: [
        //right-left
        { x: 0 + 1, y: 0 },
        { x: 0 + 2, y: 0 },
        { x: 0 + 3, y: 0 },
        { x: 0 + 4, y: 0 },
        { x: 0 + 5, y: 0 },
        { x: 0 + 6, y: 0 },
        { x: 0 + 7, y: 0 },
      ],

      upLeft: [
        { x: 0 - 1, y: 0 - 1 },
        { x: 0 - 2, y: 0 - 2 },
        { x: 0 - 3, y: 0 - 3 },
        { x: 0 - 4, y: 0 - 4 },
        { x: 0 - 5, y: 0 - 5 },
        { x: 0 - 6, y: 0 - 6 },
        { x: 0 - 7, y: 0 - 7 },
      ],

      upRight: [
        { x: 0 + 1, y: 0 - 1 },
        { x: 0 + 2, y: 0 - 2 },
        { x: 0 + 3, y: 0 - 3 },
        { x: 0 + 4, y: 0 - 4 },
        { x: 0 + 5, y: 0 - 5 },
        { x: 0 + 6, y: 0 - 6 },
        { x: 0 + 7, y: 0 - 7 },
      ],

      downLeft: [
        { x: 0 - 1, y: 0 + 1 },
        { x: 0 - 2, y: 0 + 2 },
        { x: 0 - 3, y: 0 + 3 },
        { x: 0 - 4, y: 0 + 4 },
        { x: 0 - 5, y: 0 + 5 },
        { x: 0 - 6, y: 0 + 6 },
        { x: 0 - 7, y: 0 + 7 },
      ],

      downRight: [
        { x: 0 + 1, y: 0 + 1 },
        { x: 0 + 2, y: 0 + 2 },
        { x: 0 + 3, y: 0 + 3 },
        { x: 0 + 4, y: 0 + 4 },
        { x: 0 + 5, y: 0 + 5 },
        { x: 0 + 6, y: 0 + 6 },
        { x: 0 + 7, y: 0 + 7 },
      ],

      special: [],
    }
  }

  icon = `/pieces/Chess_q${this.side === PieceSide.black ? "d" : "l"}t45.svg`
}

export class Rook extends ChessPiece {
  name = PieceName.rook

  constructor(side: PieceSide, position: PiecePosition) {
    super(side, position)
    // Add allowed moves for the rook
    this.allowed = {
      right: [
        //up-down
        { x: 0, y: 0 + 1 },
        { x: 0, y: 0 + 2 },
        { x: 0, y: 0 + 3 },
        { x: 0, y: 0 + 4 },
        { x: 0, y: 0 + 5 },
        { x: 0, y: 0 + 6 },
        { x: 0, y: 0 + 7 },
      ],

      left: [
        { x: 0, y: 0 - 1 },
        { x: 0, y: 0 - 2 },
        { x: 0, y: 0 - 3 },
        { x: 0, y: 0 - 4 },
        { x: 0, y: 0 - 5 },
        { x: 0, y: 0 - 6 },
        { x: 0, y: 0 - 7 },
      ],

      up: [
        //right-left
        { x: 0 - 1, y: 0 },
        { x: 0 - 2, y: 0 },
        { x: 0 - 3, y: 0 },
        { x: 0 - 4, y: 0 },
        { x: 0 - 5, y: 0 },
        { x: 0 - 6, y: 0 },
        { x: 0 - 7, y: 0 },
      ],

      down: [
        { x: 0 + 1, y: 0 },
        { x: 0 + 2, y: 0 },
        { x: 0 + 3, y: 0 },
        { x: 0 + 4, y: 0 },
        { x: 0 + 5, y: 0 },
        { x: 0 + 6, y: 0 },
        { x: 0 + 7, y: 0 },
      ],

      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: [],
      special: [],
    }
  }

  icon = `/pieces/Chess_r${this.side === PieceSide.black ? "d" : "l"}t45.svg`
}

export class Bishop extends ChessPiece {
  name = PieceName.bishop

  constructor(side: PieceSide, position: PiecePosition) {
    super(side, position)
    // Add allowed moves for the bishop
    this.allowed = {
      upLeft: [
        { x: 0 - 1, y: 0 - 1 },
        { x: 0 - 2, y: 0 - 2 },
        { x: 0 - 3, y: 0 - 3 },
        { x: 0 - 4, y: 0 - 4 },
        { x: 0 - 5, y: 0 - 5 },
        { x: 0 - 6, y: 0 - 6 },
        { x: 0 - 7, y: 0 - 7 },
      ],

      upRight: [
        { x: 0 + 1, y: 0 - 1 },
        { x: 0 + 2, y: 0 - 2 },
        { x: 0 + 3, y: 0 - 3 },
        { x: 0 + 4, y: 0 - 4 },
        { x: 0 + 5, y: 0 - 5 },
        { x: 0 + 6, y: 0 - 6 },
        { x: 0 + 7, y: 0 - 7 },
      ],

      downLeft: [
        { x: 0 - 1, y: 0 + 1 },
        { x: 0 - 2, y: 0 + 2 },
        { x: 0 - 3, y: 0 + 3 },
        { x: 0 - 4, y: 0 + 4 },
        { x: 0 - 5, y: 0 + 5 },
        { x: 0 - 6, y: 0 + 6 },
        { x: 0 - 7, y: 0 + 7 },
      ],

      downRight: [
        { x: 0 + 1, y: 0 + 1 },
        { x: 0 + 2, y: 0 + 2 },
        { x: 0 + 3, y: 0 + 3 },
        { x: 0 + 4, y: 0 + 4 },
        { x: 0 + 5, y: 0 + 5 },
        { x: 0 + 6, y: 0 + 6 },
        { x: 0 + 7, y: 0 + 7 },
      ],
      right: [],
      left: [],
      up: [],
      down: [],
      special: [],
    }
  }

  icon = `/pieces/Chess_b${this.side === PieceSide.black ? "d" : "l"}t45.svg`
}

export class Knight extends ChessPiece {
  name = PieceName.knight

  constructor(side: PieceSide, position: PiecePosition) {
    super(side, position)
    // Add allowed moves for the knight
    this.allowed = {
      special: [
        //2.5 steps all direction
        { x: 0 + 1, y: 0 + 2 },
        { x: 0 + 1, y: 0 - 2 },
        { x: 0 - 1, y: 0 + 2 },
        { x: 0 - 1, y: 0 - 2 },
        { x: 0 + 2, y: 0 + 1 },
        { x: 0 + 2, y: 0 - 1 },
        { x: 0 - 2, y: 0 + 1 },
        { x: 0 - 2, y: 0 - 1 },
      ],

      right: [],
      left: [],
      up: [],
      down: [],
      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: [],
    }
  }

  icon = `/pieces/Chess_n${this.side === PieceSide.black ? "d" : "l"}t45.svg`
}

export class Pawn extends ChessPiece {
  name = PieceName.pawn

  constructor(side: PieceSide, position: PiecePosition) {
    super(side, position)
    // Add allowed moves for the pawn
    this.allowed = {
      right: [],
      left: [],
      up: [],
      down: [],
      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: [],
      special:
        this.side === PieceSide.black
          ? [
              { x: 0 + 1, y: 0 },
              { x: 0 + 2, y: 0 },
            ]
          : [
              { x: 0 - 1, y: 0 },
              { x: 0 - 2, y: 0 },
            ],
    }
  }

  icon = `/pieces/Chess_p${this.side === PieceSide.black ? "d" : "l"}t45.svg`
}

export type AllPieceType = Rook | Knight | Bishop | King | Queen
