import { GameData } from "@/lib/types";
import WhosUp from "./WhosUp";
import PlayerLetters from "./PlayerLetters";
import { Dispatch, SetStateAction } from "react";

export default function Header({
  globalGameData,
  setShowLeaderboard
}: {
  globalGameData: GameData;
  setShowLeaderboard: Dispatch<SetStateAction<boolean>>;
}) {
  const currentPlayer = globalGameData.gamePresets.players.find(player => player.name === globalGameData.whoIsUp)!
  return (
    <div className="flex flex-row items-center justify-between  p-6">
      <WhosUp currentPlayer={globalGameData.whoIsUp} />
      <div className="hover:opacity-70" onClick={() => setShowLeaderboard(true)}><PlayerLetters word={globalGameData.gamePresets.word} player={currentPlayer} /></div>
    </div>
  );
}
