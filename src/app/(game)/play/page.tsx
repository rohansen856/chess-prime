import { ChessBoard } from "./components/chess-board"

export default async function Game() {
  return (
    <div className="flex h-screen w-full">
      <ChessBoard />
    </div>
  )
}
