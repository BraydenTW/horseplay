import { moves } from "@/data/moves";
import { GameData, GamePresets, PlayerStats } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import YouTubeClip from "./YoutubeClip";
import ChooseMove from "./ChooseMove";

export default function GameScreen({
  globalGameData,
  setGlobalGameData,
}: {
  globalGameData: GameData;
  setGlobalGameData: Dispatch<SetStateAction<GameData>>;
}) {
  const gamePresets = globalGameData.gamePresets;
  const { currentMove } = globalGameData;
  const [showChooseMove, setShowChooseMove] = useState<boolean>(false)
  const [showPlayerButtons, setShowPlayerButtons] = useState<boolean>(false);

  const indexOfCurrentPlayer = gamePresets.players.indexOf(
    globalGameData.whoIsUp,
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
          ? moves
          : globalGameData.movesThatAreLeft
              .slice()
              .filter((item) => item.id !== currentMove.id);

      const newMove =
        updatedMovesThatAreLeft[
          Math.floor(Math.random() * updatedMovesThatAreLeft.length)
        ];

      setGlobalGameData({
        ...globalGameData,
        movesThatAreLeft: updatedMovesThatAreLeft,
        currentMove: newMove,
        whoIsUp: updatedWhoIsUp,
        howManyHaveMadeCurrentMove: 0,
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
      if (globalGameData.missesByPlayer[0] < gamePresets.word.length) {
        // check if index 0 is still in
        return gamePresets.players[0]; // return the first player
      } else {
        // if first player is out, check the next by pretending you are player 0
        return whoIsUpNext(0);
      }
    }
    if (
      globalGameData.missesByPlayer[currentIndex] >= gamePresets.word.length
    ) // if next player is out, check the one after
    {
      return whoIsUpNext(currentIndex + 1);
    } else {
      // if the next player is still alive, he is up next.
      return gamePresets.players[currentIndex + 1];
    }
  };

  function playerMissedIt() {
    const updatedMovesThatAreLeft =
      globalGameData.movesThatAreLeft.length <= 1
        ? moves
        : globalGameData.movesThatAreLeft
            .slice()
            .filter((item) => item.id !== currentMove.id);
    const newMove =
      updatedMovesThatAreLeft[
        Math.floor(Math.random() * updatedMovesThatAreLeft.length)
      ];

    const updatedMissesByPlayer = globalGameData.missesByPlayer.slice();

    updatedMissesByPlayer[indexOfCurrentPlayer] =
      updatedMissesByPlayer[indexOfCurrentPlayer] + 1;

    const updatedWhoIsUp = whoIsUpNext(indexOfCurrentPlayer);

    setGlobalGameData({
      ...globalGameData,
      movesThatAreLeft: updatedMovesThatAreLeft,
      currentMove: newMove,
      missesByPlayer: updatedMissesByPlayer,
      whoIsUp: updatedWhoIsUp,
      howManyHaveMadeCurrentMove: 0
    });
  }

  const playersLeft = globalGameData.gamePresets.players.filter(
    (item, i) =>
      globalGameData.missesByPlayer[i] < globalGameData.gamePresets.word.length,
  ).length;

  return playersLeft >= 2 ? ( // still at least two players alive? show game
    <div className="">
      {showChooseMove &&
        <ChooseMove
          globalGameData={globalGameData}
          setGlobalGameData={setGlobalGameData}
        />
      }
      <span className="font-black uppercase italic">PLAY!</span>
      {currentMove && (
        <div>
          <h3>
            {currentMove.name} ({currentMove.difficulty})
          </h3>
          <p>By: {currentMove.player}</p>
          <div className="w-full">
            <YouTubeClip
              videoId={currentMove.video.videoId}
              start={currentMove.video.start}
              end={currentMove.video.end}
              onEnd={() => setShowPlayerButtons(true)}
            />
          </div>
          <p className="italic">{currentMove.description}</p>
          <ul className="list-disc ml-5">
            {currentMove.rules.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div>
            Who&apos;s up? <h2>{globalGameData.whoIsUp}</h2>
          </div>
          {showPlayerButtons && (
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-basic" onClick={playerMadeIt}>
                Made it!
              </button>
              <button className="btn-basic" onClick={playerMissedIt}>
                Missed
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    // one player remaining? winner winner chicken dinner!
    <p>
      {
        gamePresets.players[
          globalGameData.missesByPlayer.findIndex(
            (item) => item < globalGameData.gamePresets.word.length,
          )
        ]
      }{" "}
      is the winner!
    </p>
  );
}

// # PLAY, rotates between each player until someone loses
// #    -> Who's up?
// #    -> Card: title, description, difficulty, rules
// #    -> Did they make it? Y/N
// # WIN!  SAVE INTO GAME HISTORY.
// # RESTART?
