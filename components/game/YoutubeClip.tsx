import YouTube, {YouTubeEvent} from "react-youtube";

type VideoProps = {
  videoId: string;
  start: number;
  end: number;
  onEnd: (event: YouTubeEvent<number>) => void;
};

export default function YouTubeClip({ videoId, start, end, onEnd }: VideoProps) {
  return (
    // <iframe
    //   className="w-full h-82 border-stone-600 border-2 rounded-md overflow-hidden"
    //   src={`https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1`}
    //   title="Basketball move"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //   allowFullScreen
    // />
    <div className="mt-4">
      <span className="bg-stone-600 px-4 py-2 font-mono">PLAYBACK FEED</span>
    <YouTube
      videoId={videoId}
      iframeClassName="w-full h-82 border-stone-600 border-2 rounded-md"
      opts={{
        playerVars: {
          autoplay: 1,
          start,
          end,
        },
      }}
      onEnd={onEnd}
    /></div>
  );
}
