"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { createChessBoard } from "../board"
import {
  blackPieces,
  moveTranslator,
  PieceSide,
  whitePieces,
  type ChessPiece,
  type PieceName,
  type PiecePosition,
} from "../pieces"

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
        selectedPiece.move(position)
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
      setSelectedPiece(null)
      console.log(movesLog)
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
                "relative flex size-20 shrink-0 border",
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
                  alt=""
                  height={50}
                  width={50}
                  className="m-auto"
                />
              )}
              <span className="absolute bottom-0 left-1 text-sm opacity-50">
                {moveTranslator({ x, y })}
              </span>
            </div>
          )
        })
      })}
    </section>
  )
}
