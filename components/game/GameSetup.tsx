"use client";

import { GamePresets } from "@/lib/types";
import { CircleAlert, FileExclamationPoint, XIcon } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const numOfDifficulties = 5;

const gameWords = [
  {
    word: "HORSE",
    img: "🐴",
  },
  {
    word: "PIG",
    img: "🐷",
  },
  {
    word: "HIPPOPATOMUS",
    img: "🦛",
  },
];

// const rules = [
//   {
//     label: "Include dunking?",
//     id: "dunking",
//   },
// ];

export default function GameSetup({
  gamePresets,
  setGamePresets,
  startGame,
}: {
  gamePresets: GamePresets;
  setGamePresets: Dispatch<SetStateAction<GamePresets>>;
  startGame: () => void;
}) {
  const [alreadySubmittedOnce, setAlreadySubmittedOnce] =
    useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<string>("");

  const playerLengthError =
    gamePresets.players.length < 2 ? "At least 2 players need to play" : "";
  const difficultyError =
    gamePresets.difficulty === null ? "Choose a difficulty" : "";
  const validateGameSetup = () => {
    setAlreadySubmittedOnce(true);
    if (playerLengthError === "" && difficultyError === "") {
      startGame();
    }
  };

  return (
    <div className="p-6">
      <h2>Setup Game</h2>
      <div className="space-y-10 mt-6">
        <div className="formItem">
          <label htmlFor="newPlayer">
            Players ({gamePresets.players.length})
          </label>
          <div className="flex items-center w-full space-x-2">
            <input
              type="text"
              name="newPlayer"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value.toUpperCase())}
              id="newPlayer"
            />
            <button
              className="btn-basic btn-secondary"
              onClick={() => {
                if (newPlayer.trim() !== "") {
                  const updatedPlayers = gamePresets.players;
                  updatedPlayers.push({ name: newPlayer, misses: 0 });
                  setGamePresets({
                    ...gamePresets,
                    players: updatedPlayers,
                  });
                  setNewPlayer("");
                }
              }}
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {gamePresets.players.map((item, index) => {
              return (
                <div key={index} className="flex items-center space-x-2 w-full">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-800"
                    onClick={(e) => {
                      const updatedPlayers = gamePresets.players;
                      console.log(updatedPlayers);
                      // alert(index)

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
                  <input
                    className="inputSmall"
                    id={`player-${index}`}
                    value={gamePresets.players[index].name}
                    onChange={(e) => {
                      const updatedPlayers = gamePresets.players.slice(0);
                      updatedPlayers[index].name = e.target.value.toUpperCase();
                      setGamePresets({
                        ...gamePresets,
                        players: updatedPlayers,
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="formItem">
          <label>Difficulty (1 = Noob, 5 = Goat)</label>

          <div className="flex flex-row items-start space-x-5">
            {new Array(numOfDifficulties).fill(null).map((item, index) => {
              return (
                <div key={index} className="">
                  <input
                    name={`difficulty`}
                    id={`difficulty-${index + 1}`}
                    checked={gamePresets.difficulty === index + 1}
                    onChange={(e) =>
                      setGamePresets({ ...gamePresets, difficulty: index + 1 })
                    }
                    type="radio"
                    className="h-6 w-6 hidden"
                  />
                  <label
                    htmlFor={`difficulty-${index + 1}`}
                    className="flex flex-row items-center space-x-6"
                  >
                    <div
                      className={`outline-2 ${gamePresets.difficulty === index + 1 ? "outline-white" : "outline-white/10"} rounded-full w-12 h-12 flex items-center justify-center text-center font-black`}
                    >
                      {index + 1}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="formItem">
          <label>Game Rules: </label>
          <div className="flex items-center space-x-4">
            <label>Include dunking?</label>
            <button
              className={`w-18 h-8 p-1 rounded-md ${gamePresets.rules.dunking ? "bg-green-500" : "bg-stone-800"} border-2 border-stone-600 transition-colors duration-300`}
              onClick={(e) =>
                setGamePresets({
                  ...gamePresets,
                  rules: {
                    ...gamePresets.rules,
                    dunking: !gamePresets.rules.dunking,
                  },
                })
              }
            >
              <div
                className={`h-full w-10 rounded-sm bg-white ${gamePresets.rules.dunking ? "ml-5" : "ml-0"} transition-all duration-300`}
              ></div>
            </button>
          </div>
        </div>
        <div className="formItem">
          <label>Game Word</label>
          <div className="flex flex-col items-start space-y-6">
            {gameWords.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-2"
                >
                  <input
                    name={`word`}
                    id={item.word}
                    checked={gamePresets.word === item.word}
                    onChange={(e) =>
                      setGamePresets({ ...gamePresets, word: item.word })
                    }
                    type="radio"
                    className="h-6 w-6 hidden"
                  />
                  <label
                    htmlFor={item.word}
                    className="flex flex-row items-center space-x-6"
                  >
                    <div
                      className={`outline-2 ${gamePresets.word === item.word ? "outline-white" : "outline-white/10"} rounded-full w-12 h-12 flex items-center justify-center mr-4`}
                    >
                      {item.img}
                    </div>
                    {item.word} ({item.word.length})
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="formItem">
          <button
            type="submit"
            className="btn-basic"
            onClick={(e) => {
              validateGameSetup();
            }}
          >
            Play!
          </button>
          {alreadySubmittedOnce && (
            <div className="pt-2 flex flex-row items-start flex-wrap gap-3">
              <CircleAlert />
              <div className="-mt-1 ml-4">
                {playerLengthError !== "" ? <li>{playerLengthError}</li> : null}
                {difficultyError !== "" ? <li>{difficultyError}</li> : null}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* which word? HORSE, PIG, HIPPOPATOMUS RADIO */}
    </div>
  );
}
