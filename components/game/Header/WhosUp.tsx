import { Player } from "@/lib/types";
import PlayerLetters from "./PlayerLetters";

export default function WhosUp({
  word,
  currentPlayer,
}: {
  word: string;
  currentPlayer: Player;
}) {
  return (
    <div>
      <div>
        <h4 className="uppercase">{currentPlayer.name}</h4>
        <PlayerLetters
          word={word}
          player={currentPlayer}
        />
      </div>
    </div>
  );
}
