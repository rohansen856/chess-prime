import { ChessBoard } from "./chess-board"

export default async function Game() {
  return (
    <div className="flex h-screen w-full flex-col">
      <p className="my-4 text-center text-red-700">
        en passant & casting not implemented!
      </p>
      <ChessBoard />
    </div>
  )
}
