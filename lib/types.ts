export type Player = {
  name: string;
  misses: number;
};
export type GamePresets = {
  players: Player[];
  difficulty: number | null;
  rules: { dunking: boolean };
  word: string;
};

export type Move = {
  id: string;
  name: string;
  player: string;
  description: string;
  rules: string[];
  difficulty: number;
  category: string[];
  video: {
    videoId: string;
    start: number | null;
    end: number | null;
  };
};

export type GameData = {
  whoIsUp: string;
  currentMove: Move;
  howManyHaveMadeCurrentMove: number;
  movesThatAreLeft: string[];
  gamePresets: GamePresets;
  round: number;
  // gameHistory: {playerName: string, moveId: string, madeIt: boolean}[][] | null;
};
// history: round[]
