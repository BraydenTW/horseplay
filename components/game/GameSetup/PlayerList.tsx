import { GamePresets } from "@/lib/types";
import { CircleAlert, XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function PlayerList({
  gamePresets,
  setGamePresets,
  alreadySubmittedOnce,
  playerListErrors,
}: {
  gamePresets: GamePresets;
  setGamePresets: Dispatch<SetStateAction<GamePresets>>;
  alreadySubmittedOnce: boolean;
  playerListErrors: {
    notEnoughPlayers: boolean;
    playerNameTooLong: boolean;
    duplicatePlayerNames: boolean;
    playerNameTooShort: boolean;
  };
}) {
  const { notEnoughPlayers, playerNameTooLong, duplicatePlayerNames, playerNameTooShort } =
    playerListErrors;
  const thereAreErrors =
    notEnoughPlayers || playerNameTooLong || duplicatePlayerNames || playerNameTooShort;

  return (
    <div>
      <div className="space-y-2">
        {gamePresets.players.map((item, index) => {
          return (
            <div key={index}>
              <div className="w-full relative flex flex-row items-center">
                <div className="w-6 h-6 text-center flex items-center justify-center mr-2">{index+1}.</div>
                <input
                  id={`player-${index}`}
                  className="w-full"
                  value={gamePresets.players[index].name}
                  maxLength={10}
                  onChange={(e) => {
                    const updatedPlayers = gamePresets.players.slice(0);
                    updatedPlayers[index].name = e.target.value.toUpperCase();
                    setGamePresets({
                      ...gamePresets,
                      players: updatedPlayers,
                    });
                  }}
                />
                <button
                  className="absolute top-0 bottom-0 right-3 h-full rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    const updatedPlayers = gamePresets.players;

                    setGamePresets({
                      ...gamePresets,
                      players: updatedPlayers.filter(
                        (updatedPlayerItem, updatedPlayerIndex) =>
                          index !== updatedPlayerIndex,
                      ),
                    });
                  }}
                >
                  <XIcon />
                </button>
              </div>
            </div>
          );
        })}

        {alreadySubmittedOnce && thereAreErrors && (
          <div className="pt-2 flex flex-row items-start flex-wrap gap-3">
            <CircleAlert size={20} className="text-redPink" />
            <div className="-mt-1 text-stone-400 text-lg">

              {playerNameTooLong && <p>Names must be less than 10 letters long.</p>}
              {playerNameTooShort && <p>Names can't be blank.</p>}
              {notEnoughPlayers && <p>At least 2 players are needed.</p>}
              {duplicatePlayerNames && <p>Player can't have the same name.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
