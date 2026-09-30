export default function ShotDifficulty({ difficulty }: { difficulty: number }) {
  const difficultyLabels = ["Easy", "AM", "Pro", "All-Star", "Insane"];
  const difficultyColors = ["green", "yellow", "orange", "red", "purple"];
  const difficultyLabel = difficultyLabels[difficulty - 1] || "";
  const difficultyColor = difficultyColors[difficulty - 1] || "";
  return (
    <div className="bg-black rounded-full w-auto px-2 py-1 text-sm inline-flex flex-row items-center space-x-2 justify-center font-bold mb-4">
      <span className={`text-[${difficultyColor}]`}>{difficultyLabel}</span>
      {new Array(difficulty).fill("⭐️").map((i, index) => (
        <BballSVG key={index} color={difficultyColor} />
      ))}
    </div>
  );
}

function BballSVG({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-ball-basketball"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M5.65 5.65l12.7 12.7" />
      <path d="M5.65 18.35l12.7 -12.7" />
      <path d="M12 3a9 9 0 0 0 9 9" />
      <path d="M3 12a9 9 0 0 1 9 9" />
    </svg>
  );
}
