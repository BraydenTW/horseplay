import { moves } from "@/data/moves";
import { GameData, GamePresets } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import ShotDetails from "./ShotDetails";
import Footer from "./Footer";
import MissMakeButtons from "./MissMakeButtons";
import RoundDetails from "./RoundDetails";
import Leaderboard from "./Leaderboard";

export default function GameScreen({
  globalGameData,
  setGlobalGameData,
}: {
  globalGameData: GameData;
  setGlobalGameData: Dispatch<SetStateAction<GameData>>;
}) {
  const gamePresets = globalGameData.gamePresets;
  const { currentMove } = globalGameData;

  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  const indexOfCurrentPlayer = gamePresets.players.findIndex(
    (player) => player.name === globalGameData.whoIsUp,
  ); // based off the ALL number of players (dead d alive)

  function playerMadeIt() {
    // if
    const updatedWhoIsUp = whoIsUpNext(indexOfCurrentPlayer);

    const updatedHowManyHaveMadeCurrentMove =
      globalGameData.howManyHaveMadeCurrentMove === playersLeft
        ? 0
        : globalGameData.howManyHaveMadeCurrentMove + 1;
    if (globalGameData.howManyHaveMadeCurrentMove + 1 === playersLeft) {
      // if everyone left made the current move

      const updatedMovesThatAreLeft =
        globalGameData.movesThatAreLeft.length <= 1
          ? moves.map((move) => move.id)
          : globalGameData.movesThatAreLeft
              .slice()
              .filter((moveId) => moveId !== currentMove.id);

      const newMove =
        updatedMovesThatAreLeft[
          Math.floor(Math.random() * updatedMovesThatAreLeft.length)
        ];

      // const gameHistory = globalGameData.gameHistory
      setGlobalGameData({
        // New round!
        ...globalGameData,
        movesThatAreLeft: updatedMovesThatAreLeft,
        currentMove: moves.find((item) => item.id === newMove)!,
        whoIsUp: updatedWhoIsUp,
        howManyHaveMadeCurrentMove: 0,
        round: globalGameData.round + 1,
        // gameHistory: gameHistory[gameHistory.length]
      });
    } else {
      setGlobalGameData({
        ...globalGameData,
        whoIsUp: updatedWhoIsUp,
        howManyHaveMadeCurrentMove: updatedHowManyHaveMadeCurrentMove,
      });
    }
  }

  const whoIsUpNext = (currentIndex: number): string => {
    if (currentIndex + 1 === globalGameData.gamePresets.players.length) {
      // if you exceed max list index,
      if (
        globalGameData.gamePresets.players[0].misses < gamePresets.word.length
      ) {
        // check if index 0 is still in
        return gamePresets.players[0].name; // return the first player
      } else {
        // if first player is out, check the next by pretending you are player 0
        return whoIsUpNext(0);
      }
    }
    if (
      globalGameData.gamePresets.players[currentIndex].misses >=
      gamePresets.word.length
    ) // if next player is out, check the one after
    {
      return whoIsUpNext(currentIndex + 1);
    } else {
      // if the next player is still alive, he is up next.
      return gamePresets.players[currentIndex + 1].name;
    }
  };

  function playerMissedIt() {
    const updatedMovesThatAreLeft =
      globalGameData.movesThatAreLeft.length <= 1
        ? moves.map((move) => move.id)
        : globalGameData.movesThatAreLeft
            .slice()
            .filter((item) => item !== currentMove.id);
    const newMove =
      updatedMovesThatAreLeft[
        Math.floor(Math.random() * updatedMovesThatAreLeft.length)
      ];

    const updatedPlayers = globalGameData.gamePresets.players.slice();
    updatedPlayers[indexOfCurrentPlayer].misses =
      updatedPlayers[indexOfCurrentPlayer].misses + 1;

    const updatedWhoIsUp = whoIsUpNext(indexOfCurrentPlayer);

    setGlobalGameData({
      gamePresets: {
        ...globalGameData.gamePresets,
        players: updatedPlayers,
      },
      movesThatAreLeft: updatedMovesThatAreLeft,
      currentMove: moves.find((item) => item.id === newMove)!,
      whoIsUp: updatedWhoIsUp,
      round: globalGameData.round + 1,
      howManyHaveMadeCurrentMove: 0,
    });
  }

  const playersLeft = globalGameData.gamePresets.players.filter(
    (item, i) =>
      globalGameData.gamePresets.players[i].misses <
      globalGameData.gamePresets.word.length,
  ).length;

  return playersLeft >= 2 ? ( // still at least two players alive? show game
    <div className="min-h-screen flex-col">
        <Leaderboard
        showLeaderboard={showLeaderboard}
          setShowLeaderboard={setShowLeaderboard}
          players={globalGameData.gamePresets.players}
          word={gamePresets.word}
        />
        {currentMove && (
          <div className="flex flex-col justify-between h-full">
            <div>
              <Header globalGameData={globalGameData} setShowLeaderboard={setShowLeaderboard} />
                {/* <RoundDetails
                  round={globalGameData.round}
                  howManyHaveMadeCurrentMove={
                  globalGameData.howManyHaveMadeCurrentMove
                  }
                  playersLeft={playersLeft}
                /> */}
                <ShotDetails currentMove={currentMove} />
                <MissMakeButtons
                  playerMadeIt={playerMadeIt}
                  playerMissedIt={playerMissedIt}
                />
            </div>
          </div>
        )}
      {/* <Footer
        showLeaderboard={showLeaderboard}
        setShowLeaderboard={setShowLeaderboard}
      /> */}
    </div>
  ) : (
    // one player remaining? winner winner chicken dinner!
    <p>
      {globalGameData.gamePresets.players.find((player) => player.misses > 0)
        ?.name || ""}{" "}
      is the winner!
      {globalGameData.gamePresets.players[0].misses}
      <button
        className="px-2 py-1 mt-2 rounded-md text-xs bg-stone-800"
        onClick={() => {
          localStorage.clear();
        }}
      >
        erase data
      </button>
    </p>
  );
}

// # PLAY, rotates between each player until someone loses
// #    -> Who's up?
// #    -> Card: title, description, difficulty, rules
// #    -> Did they make it? Y/N
// # WIN!  SAVE INTO GAME HISTORY.
// # RESTART?

{
  /* {showPlayerButtons && (
            <div classNsame="grid grid-cols-2 gap-4">
              <button className="btn-basic" onClick={playerMadeIt}>
                Made it!
              </button>
              <button className="btn-basic" onClick={playerMissedIt}>
                Missed
              </button>
            </div>
          )} */
}
{
  /* <ul className="list-disc ml-5">
            {currentMove.rules.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul> */
}

{
  /* CHOOSE MOVE FEATURE IF TIME? */
}
{
  /* {showChooseMove &&
        <ChooseMove
          globalGameData={globalGameData}
          setGlobalGameData={setGlobalGameData}
        />
      } */
}
