"use client";

import { GamePresets } from "@/lib/types";
import { CircleAlert, FileExclamationPoint, XIcon } from "lucide-react";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import PlayerList from "./PlayerList";

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
    word: "PLATYPUS",
    img: (
      <Image
        src="/perry.png"
        width={20}
        height={20}
        objectFit="cover"
        className="h-12 w-12 rounded-full"
        alt={"Perry the Platypus"}
      />
    ),
  },
];

// const rules = [
//   {
//     label: "Include dunking?",
//     id: "dunking",
//   },
// ];

// RULES: no blank names, no duplicate names, max 15 characters.
//

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

  const playerNames: string[] = gamePresets.players.map((item) => item.name);
  const notEnoughPlayers = playerNames.length < 2;
  const playerNameTooLong =
    playerNames.filter((item) => item.length > 10).length > 0;
  const playerNameTooShort =
    playerNames.filter((item) => item.length < 1).length > 0;

  const duplicatePlayerNames = new Set(playerNames).size !== playerNames.length; // looks for duplicates
  const playerListErrors = {
    notEnoughPlayers,
    playerNameTooLong,
    duplicatePlayerNames,
    playerNameTooShort,
  };
  const thereAreErrors =
    notEnoughPlayers ||
    playerNameTooLong ||
    duplicatePlayerNames ||
    playerNameTooShort;

  const validateGameSetup = () => {
    setAlreadySubmittedOnce(true);
    if (!thereAreErrors) {
      startGame();
    }
  };

  return (
    <div className="p-6">
      <h2>Setup Game</h2>
      <div className="space-y-6 mt-6">
        <div className="formItem">
          <label htmlFor="newPlayer">Who's playing?</label>
          <div className="flex items-center w-full space-x-2">
            <input
              type="text"
              name="newPlayer"
              value={newPlayer}
              maxLength={10}
              onChange={(e) => setNewPlayer(e.target.value.toUpperCase())}
              id="newPlayer"
              placeholder="Lebron"
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
        </div>
        <PlayerList
          gamePresets={gamePresets}
          setGamePresets={setGamePresets}
          alreadySubmittedOnce={alreadySubmittedOnce}
          playerListErrors={playerListErrors}
        />
              {<hr className="text-stone-500 mb-6" />}
        {/* <div className="formItem">
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
        </div> */}
        {/* <div className="formItem">
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
        </div> */}
        <div className="formItem">
          <label>Game Word</label>
          <div className="grid grid-cols-3">
            {gameWords.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center space-x-2"
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
                    className="flex flex-col items-center justify-center text-sm"
                  >
                    <div
                      className={`outline-2 ${gamePresets.word === item.word ? "outline-white" : "outline-white/10"} text-3xl rounded-full w-16 h-16 flex items-center justify-center mb-4`}
                    >
                      {item.img}
                    </div>
                    {item.word}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="formItem">
          <button
            type="submit"
            className="btn-basic "
            onClick={(e) => {
              validateGameSetup();
            }}
          >
            Play!
          </button>
        </div>
      </div>
    </div>
  );
}
