import { GamePresets } from "@/lib/types";
import { PlayIcon, PodiumIcon, Settings, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function Footer({
  showLeaderboard,
  setShowLeaderboard,
}: {
  showLeaderboard: boolean;
  setShowLeaderboard: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <footer className="z-12 fixed w-full bottom-0 left-0 right-0 flex flex-row items-center justify-between p-6 border-t-2 border-stone-800">
      <div>
        <Image
          src="/horseplaylogo.png"
          width={150}
          height={80}
          alt="Horseplay Logo"
        />
      </div>
      <div className="space-x-4 flex flex-row items-center">
        {showLeaderboard ? (
          <button onClick={() => setShowLeaderboard(false)}>
            <PlayIcon />
          </button>
        ) : (
          <button onClick={() => setShowLeaderboard(true)}>
            <PodiumIcon />
          </button>
        )}
        <SettingsIcon />
      </div>
    </footer>
  );
}
