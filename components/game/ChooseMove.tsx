// import { GameData } from "@/lib/types";
// import { Dispatch, SetStateAction } from "react";

// export default function ChooseMove({
//   globalGameData,
//   setGlobalGameData,
// }: {
//   globalGameData: GameData;
//   setGlobalGameData: Dispatch<SetStateAction<GameData>>;
// }) {
//   return (
//     <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black p-4 border-stone-400 w-full h-full">
//       <h2>Choose a Move!</h2>
//       <ul>
//       {globalGameData.movesThatAreLeft.map((move, index) => {
//         return <li key={index}>
//           {move.name} - {move.player} ({move.difficulty})
//           </li>;
//       })}</ul>
//     </div>
//   );
// }
