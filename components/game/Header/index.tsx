import { GameData } from "@/lib/types";
import WhosUp from "./WhosUp";
import PlayerLetters from "./PlayerLetters";
import { Dispatch, SetStateAction } from "react";
import { PlayIcon, PodiumIcon, SettingsIcon } from "lucide-react";

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
      <WhosUp word={globalGameData.gamePresets.word} currentPlayer={currentPlayer}  />
      {/* <div className="hover:opacity-70" onClick={() => setShowLeaderboard(true)}></div> */}
    
      <div className="space-x-4 flex flex-row items-center">
        {/* {showLeaderboard ? (
          <button onClick={() => setShowLeaderboard(false)}>
            <PlayIcon />
          </button>
        ) : ( */}
          <button onClick={() => setShowLeaderboard(true)}>
            <PodiumIcon />
          </button>
        {/* )} */}
        <SettingsIcon />
      </div>
    </div>
  );
}
