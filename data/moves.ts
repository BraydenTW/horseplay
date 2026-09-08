import { Move } from "@/lib/types";

export const moves: Move[] = [
  {
    id: "wade-euro-step",

    name: "Euro Step Layup",
    player: "Dwyane Wade",

    description:
      "Drive toward the basket, change direction with a two-step Euro step, and finish at the rim.",

    rules: [
      "Start outside the paint",
      "Drive toward the basket",
      "Use a clear two-step Euro step",
      "Finish with a layup",
    ],

    difficulty: 2,

    category: ["layup", "footwork"],

    video: {
      videoId: "4i1j_G5FaM4",
      start: 56,
      end: 60,
    },
  },

  {
    id: "curry-driving-floater",

    name: "Driving Floater",
    player: "Stephen Curry",

    description:
      "Drive into the lane and release a soft one-handed floater before reaching the rim.",

    rules: [
      "Start outside the paint",
      "Dribble into the lane",
      "Release the ball with one hand",
      "Use a floater instead of a normal layup",
    ],

    difficulty: 2,

    category: ["floater", "layup"],

    video: {
      videoId: "c3oFo_W30Ew",
      start: 0,
      end: 8,
    },
  },
];
