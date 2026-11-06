import { Move } from "@/lib/types";
import YouTubeClip from "./YoutubeClip";
import Image from "next/image";
import ShotDifficulty from "./ShotDifficulty";

export default function ShotDetails({ currentMove }: { currentMove: Move }) {
  return (
    <div className="text-center bg-stone-900/80 m-4 p-4 mt-0 rounded-2xl mb-4">
      <ShotDifficulty difficulty={currentMove.difficulty} />
      <h4 className="">{currentMove.name}</h4>
      <p className="italic max-w-sm m-auto pt-4 text-sm leading-4 text-stone-500">
        {currentMove.description}
      </p>
      <div className="w-full">
        <YouTubeClip
          videoId={currentMove.video.videoId}
          start={currentMove.video.start || 0}
          end={currentMove.video.end || 10000000}
          // onEnd={() => setShowPlayerButtons(true)}
        />
      </div>
    </div>
  );
}
