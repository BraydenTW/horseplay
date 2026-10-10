import YouTube, { YouTubeEvent } from "react-youtube";

type VideoProps = {
  videoId: string;
  start: number;
  end: number;
  onEnd?: (event: YouTubeEvent<number>) => void;
};

export default function YouTubeClip({
  videoId,
  start,
  end,
  onEnd,
}: VideoProps) {
  return (
    <div className="mt-4  overflow-hidden">
      <YouTube
        videoId={videoId}
        iframeClassName="w-full h-64 overflow-hidden rounded-md"
        opts={{
          playerVars: {
            autoplay: 1,
            start,
            end,
          },
        }}
        
        onEnd={onEnd}
      />
    </div>
  );
}
