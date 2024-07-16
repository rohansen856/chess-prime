"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { createChessBoard } from "../components/board"
import {
  Bishop,
  King,
  Knight,
  moveTranslator,
  Pawn,
  PieceName,
  PieceSide,
  Queen,
  Rook,
  type ChessPiece,
  type PiecePosition,
} from "../components/pieces"

// Example usage
export const blackPieces = [
  new Rook(PieceSide.black, { x: 0, y: 7 }),
  new Knight(PieceSide.black, { x: 0, y: 6 }),
  new Bishop(PieceSide.black, { x: 0, y: 5 }),
  new King(PieceSide.black, { x: 0, y: 4 }),
  new Queen(PieceSide.black, { x: 0, y: 3 }),
  new Bishop(PieceSide.black, { x: 0, y: 2 }),
  new Knight(PieceSide.black, { x: 0, y: 1 }),
  new Rook(PieceSide.black, { x: 0, y: 0 }),

  new Pawn(PieceSide.black, { x: 1, y: 0 }),
  new Pawn(PieceSide.black, { x: 1, y: 1 }),
  new Pawn(PieceSide.black, { x: 1, y: 2 }),
  new Pawn(PieceSide.black, { x: 1, y: 3 }),
  new Pawn(PieceSide.black, { x: 1, y: 4 }),
  new Pawn(PieceSide.black, { x: 1, y: 5 }),
  new Pawn(PieceSide.black, { x: 1, y: 6 }),
  new Pawn(PieceSide.black, { x: 1, y: 7 }),
]

// Example usage
export const whitePieces = [
  new Rook(PieceSide.white, { x: 7, y: 7 }),
  new Knight(PieceSide.white, { x: 7, y: 6 }),
  new Bishop(PieceSide.white, { x: 7, y: 5 }),
  new King(PieceSide.white, { x: 7, y: 4 }),
  new Queen(PieceSide.white, { x: 7, y: 3 }),
  new Bishop(PieceSide.white, { x: 7, y: 2 }),
  new Knight(PieceSide.white, { x: 7, y: 1 }),
  new Rook(PieceSide.white, { x: 7, y: 0 }),

  new Pawn(PieceSide.white, { x: 6, y: 0 }),
  new Pawn(PieceSide.white, { x: 6, y: 1 }),
  new Pawn(PieceSide.white, { x: 6, y: 2 }),
  new Pawn(PieceSide.white, { x: 6, y: 3 }),
  new Pawn(PieceSide.white, { x: 6, y: 4 }),
  new Pawn(PieceSide.white, { x: 6, y: 5 }),
  new Pawn(PieceSide.white, { x: 6, y: 6 }),
  new Pawn(PieceSide.white, { x: 6, y: 7 }),
]

export function ChessBoard() {
  const chessBoard = createChessBoard()
  const [movesLog, setMovesLog] = useState<{ name: PieceName; to: string }[]>(
    []
  )
  const [turn, setTurn] = useState<PieceSide>(PieceSide.white)
  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null)
  const [isHighlighted, setHighlighted] = useState<PiecePosition[]>([])

  blackPieces.concat(whitePieces).forEach((piece) => {
    chessBoard[piece.position.x][piece.position.y].piece = piece
  })

  function highlightPossibleMoves(moves?: PiecePosition[]) {
    if (!moves) return setHighlighted([])
    setHighlighted([...moves?.map((move) => move)])
  }

  function handleBoxClick(piece: ChessPiece | null, position: PiecePosition) {
    if (piece && piece.side === turn) {
      setSelectedPiece(piece)
      highlightPossibleMoves(
        piece?.getPossibleMoves([...blackPieces, ...whitePieces])
      )
    } else {
      if (
        selectedPiece &&
        isHighlighted.filter((el) => el.x === position.x && el.y === position.y)
          .length > 0
      ) {
        chessBoard[position.x][position.y].piece?.delete()
        selectedPiece.move(position, [...blackPieces, ...whitePieces])
        setTurn(
          selectedPiece.side === PieceSide.white
            ? PieceSide.black
            : PieceSide.white
        )
        setMovesLog((log) => [
          ...log,
          { name: selectedPiece.name, to: moveTranslator(position) },
        ])
      }
      setHighlighted([])
      if (selectedPiece?.name === PieceName.pawn) upgradePawn(selectedPiece)
      setSelectedPiece(null)
    }
  }

  function upgradePawn(pawn: ChessPiece) {
    if (pawn.position.x === 7 || pawn.position.x === 0) {
      chessBoard[pawn.position.x][pawn.position.y].piece = new Queen(
        pawn.side,
        pawn.position
      )
      pawn?.delete()
    }
  }

  useEffect(() => {
    const allBoxes = document.querySelectorAll("#chessboard div")
    allBoxes.forEach((box) => {
      if (box instanceof HTMLElement) {
        box.style.backgroundColor =
          box.getAttribute("data-color") === "bg-teal-700"
            ? "rgb(15 118 110)"
            : "rgb(4 120 87)"
      }
    })
    isHighlighted.forEach((move) => {
      const box = document.getElementById(`(${move.x},${move.y})`)
      if (box) box.style.backgroundColor = "yellow"
    })
  }, [isHighlighted])

  return (
    <section id="chessboard" className="m-auto grid grid-cols-8 border">
      {chessBoard.map((i, x) => {
        return i.map((k, y) => {
          const cellColor =
            k.color === "black" ? "bg-teal-700" : "bg-emerald-700"
          if (y > 7) return
          return (
            <div
              key={y}
              id={`(${x},${y})`}
              data-color={cellColor}
              className={cn(
                "relative flex size-12 shrink-0 border md:size-16 lg:size-20",
                cellColor,
                k.piece && "cursor-pointer",
                selectedPiece &&
                  k.piece?.getPosition() === selectedPiece?.getPosition() &&
                  "border-white"
              )}
              onClick={() => {
                handleBoxClick(k.piece, { x, y })
              }}
            >
              {k.piece && (
                <Image
                  src={k.piece.icon}
                  alt={k.piece.name}
                  height={50}
                  width={50}
                  className="m-auto"
                />
              )}
              <span className="absolute bottom-0 left-1 text-sm opacity-50">
                {JSON.stringify({ x, y })}
              </span>
            </div>
          )
        })
      })}
    </section>
  )
}
