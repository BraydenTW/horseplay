import { GameData, Player } from "@/lib/types";

export default function PlayerLetters({
  player,
  word
}: {
  player: Player;
  word: string;
}) {
  return (
    <div className="space-x-2">
      {word.split("").map((letter, index) => {
        return (
          <span key={index} className={`text-xl font-black ${player.misses > index ? "text-white" : "text-stone-700"} uppercase `}>{letter}</span>
        )
      })}
    </div>
  )
}