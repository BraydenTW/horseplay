import { Move } from "@/lib/types";
import YouTubeClip from "./YoutubeClip";
import Image from "next/image";
import ShotDifficulty from "./ShotDifficulty";

export default function ShotDetails({ currentMove }: { currentMove: Move }) {
  return (
    <div className="text-center bg-stone-900 p-4 rounded-4xl mb-4">
      <ShotDifficulty difficulty={currentMove.difficulty} />
      <h3 className="">{currentMove.name} </h3>
      <p className="italic max-w-sm m-auto pt-4 text-base leading-6 text-stone-400">
        {currentMove.description}
      </p>
      <div className="w-full">
        <YouTubeClip
          videoId={currentMove.video.videoId}
          start={currentMove.video.start}
          end={currentMove.video.end}
          // onEnd={() => setShowPlayerButtons(true)}
        />
      </div>
    </div>
  );
}
