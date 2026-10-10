import { FlameIcon, XIcon } from "lucide-react";

export default function MissMakeButtons({
  playerMadeIt,
  playerMissedIt,
}: {
  playerMadeIt: () => void;
  playerMissedIt: () => void;
}) {
  return (
    <div className="flex items-center justify-center space-x-6 -mt-16">
      <button
        className="makeMissButton active:bg-green/20! backdrop-blur-md! border-green-500 shadow-2xl shadow-green-500"
        onClick={playerMadeIt}
      >
        <FlameIcon className="text-green-500 mb-3" size={30} />
        MADE IT!
      </button>
      <button
        className="makeMissButton active:bg-redPink/20! backdrop-blur-md! text-redPink border-redPink shadow-2xl shadow-redPink"
        onClick={playerMissedIt}
      >
        <span className="mb-3">
        <HorseSVG color="#FF004D" /></span>
        MISSED
      </button>
    </div>
  );
}

function HorseSVG({color}: {color: string}) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10_342)">
        <path
          d="M8.96871 26.9894L10.2083 14.5833L5.83329 17.5L2.91663 14.5833L7.29163 5.83334C11.6666 5.83334 16.0416 8.75001 16.0416 13.125H27.7083L28.9683 26.9879C28.9934 27.2644 28.9607 27.543 28.8721 27.8061C28.7836 28.0691 28.6412 28.3109 28.4541 28.5158C28.2669 28.7208 28.0391 28.8846 27.7851 28.9966C27.5312 29.1087 27.2567 29.1666 26.9791 29.1667H26.7662C26.1833 29.1667 25.6138 28.9921 25.1311 28.6654C24.6484 28.3386 24.2746 27.8747 24.0581 27.3336L22.6085 23.7081C22.392 23.167 22.0182 22.7031 21.5355 22.3763C21.0528 22.0496 20.4833 21.875 19.9004 21.875H18.0162C17.4333 21.875 16.8638 22.0496 16.3811 22.3763C15.8984 22.7031 15.5246 23.167 15.3081 23.7081L13.8585 27.3336C13.642 27.8747 13.2682 28.3386 12.7855 28.6654C12.3028 28.9921 11.7333 29.1667 11.1504 29.1667H10.9375C10.6609 29.1666 10.3874 29.1086 10.1346 28.9964C9.88179 28.8841 9.65534 28.7201 9.46984 28.515C9.28434 28.3098 9.1439 28.0681 9.05758 27.8053C8.97126 27.5425 8.94099 27.2646 8.96871 26.9894Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.0834 20.4167V17.5C32.0834 16.3397 31.6224 15.2269 30.802 14.4064C29.9815 13.5859 28.8687 13.125 27.7084 13.125"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
