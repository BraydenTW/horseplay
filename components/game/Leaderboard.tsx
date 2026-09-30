import { Player } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import PlayerLetters from "./Header/PlayerLetters";
import { XIcon } from "lucide-react";

export default function Leaderboard({
  showLeaderboard,
  setShowLeaderboard,
  players,
  word,
}: {
  showLeaderboard: boolean
  setShowLeaderboard: Dispatch<SetStateAction<boolean>>;
  players: Player[];
  word: string;
}) {
  return (
    <div className={`absolute overflow-hidden top-0 bottom-0 right-0 left-0 p-6 offset transition-opacity duration-500 bg-black ${showLeaderboard ? "z-10 opacity-100" : "-z-1 opacity-0"}`}>
      <div className="flex items-center justify-between"><h3>Leaderboard</h3>
      <button onClick={() => setShowLeaderboard(false)}><XIcon /></button></div>
      <ol className="mt-6 space-y-6 list-decimal">
        {players
          .sort((a, b) => a.misses - b.misses)
          .map((player, index) => {
            return (
              <li key={index} className={`flex items-center justify-between space-x-2"}`}>
                <span className='space-x-2'>
                  {index + 1}.{`  `}
                  {player.name}
                  
                </span>
                <PlayerLetters word={word} player={player} />
              </li>
            );
          })}
      </ol>
    </div>
  );
}
