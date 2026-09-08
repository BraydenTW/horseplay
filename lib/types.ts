
export type GamePresets = {
  players: string[];
  difficulty: number | null;
  rules: { dunking: boolean };
  word: string;
};

export type PlayerStats = {
  playerId: number;
  numOfLetters: number;
};

export type Move = {
  id: string;
  name: string;
  player: string;
  description: string;
  rules: string[]
  difficulty: number;
  category: string[];
  video: {
    videoId: string;
    start: number;
    end: number;
  }
}

export type GameData = {
  missesByPlayer: number[];
  whoIsUp: string;
  currentMove: Move;
  howManyHaveMadeCurrentMove: number;
  movesThatAreLeft: Move[];
  gamePresets: GamePresets;
};