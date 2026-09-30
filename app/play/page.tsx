"use client";

import GameScreen from "@/components/game/GameScreen";
import GameSetup from "@/components/game/GameSetup";
import { moves } from "@/data/moves";
import { GameData, GamePresets } from "@/lib/types";
import { useEffect, useState, useSyncExternalStore } from "react";

export default function Play() {
  const [gameStarted, setGameStarted] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const saved = localStorage.getItem("horseplay-game-data");
    return saved !== null;
  }); // game is started if there is already Game data in local storage. if not, it is false.
  const [gamePresets, setGamePresets] = useState<GamePresets>({
    players: [
      // { name: "brayden", misses: 3, id: 0 },
      // { name: "temoana", misses: 20, id: 1 },
      // { name: "teva", misses: 0, id: 2 },
    ],
    difficulty: null,
    rules: { dunking: false },
    word: "HORSE",
  });

  const startGame = () => {
    // INITIALIZES GAME
    setGameStarted(true);
    setGlobalGameData({
      ...globalGameData,
      gamePresets: gamePresets,
      whoIsUp: gamePresets.players[0].name,
    });
  };

  const hasHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [globalGameData, setGlobalGameData] = useState<GameData>(() => {
    const defaultGameData = {
      gamePresets: gamePresets,
      whoIsUp: gamePresets.players[0]?.name || "",
      currentMove: moves[Math.floor(Math.random() * moves.length)],
      howManyHaveMadeCurrentMove: 0,
      movesThatAreLeft: moves.map(move => move.id),
      // gameHistory: null
      round: 1,
    };

    if (typeof window === "undefined") {
      return defaultGameData;
    }
    const saved = localStorage.getItem("horseplay-game-data");
    if (!saved) return defaultGameData;

    try {
      return JSON.parse(saved) as GameData;
    } catch {
      return defaultGameData;
    }
  });

  useEffect(() => {
    if (!globalGameData) return;
    if (gameStarted === true) {
      localStorage.setItem(
        "horseplay-game-data",
        JSON.stringify(globalGameData),
      );
    }
  }, [globalGameData]);

  if (!hasHydrated || !globalGameData) {
    // waits for hydration and globalGameData localstorage to load.
    // hydration... be sure to drink enough water! :D
    return <p>loading....</p>;
  }

  return gameStarted ? ( // still at least two players alive? show game
    <GameScreen
      globalGameData={globalGameData}
      setGlobalGameData={setGlobalGameData}
    />
  ) : (
    // not setup the game yet?
    <GameSetup
      gamePresets={gamePresets}
      setGamePresets={setGamePresets}
      startGame={startGame}
    />
  );
}

// #-------------------------------
// # START SCREEN / HOME

//  PAGE: /play
// # GAME SETUP: NUMBER OF PLAYERS, DIFFICULTY, CAN'T DUNK, WHICH WORD FOR THE GAME
// # PLAY, rotates between each player until someone loses
// #    -> Who's up?
// #    -> Card: title, description, difficulty, rules
// #    -> Did they make it? Y/N
// # WIN!  SAVE INTO GAME HISTORY.
// # RESTART?
