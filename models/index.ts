export type Room = {
  id: number;
  name: string;
  helper: string;
  guesser?: string | null;
  rounds_left: number;
  correct_guesses: string[];
  wrong_guesses: string[];
  words: string[];
  created_at: string;
  game_state: "WAITING_GUESSER" | "WAITING_TIP" | "WAITING_GUESSES" | "FINISHED";
  current_tip?: string;
  current_tip_number?: number;
};

export type ExtendedRoom = Room & { correctWords?: string[] };

export type Match = {
  id: number;
  correct_words?: string[] | null;
  room_id: number;
  created_at: string;
};

export type RoomInsertType = Omit<Room, "id" | "created_at">;
export type MatchInsertType = Omit<Match, "id" | "created_at">;
