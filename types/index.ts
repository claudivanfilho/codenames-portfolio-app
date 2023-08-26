import { Database } from "@/types/supabase";
import { ColumnType, Generated, Selectable, Updateable } from "kysely";

export type User = {
  id: string;
  email: string;
  user_metadata: {
    room_id?: number | null;
    user_name: string;
  };
};

export type GameState = "WAITING_GUESSER" | "WAITING_TIP" | "WAITING_GUESSES" | "FINISHED";
export type PlayerRole = "HELPER" | "GUESSER";

type BaseAttrs = {
  id: Generated<number>;
  created_at: ColumnType<Date, string | undefined, never>;
};

/** ===== Kysely Tables Schemas ===== */
type RoomTable = Database["public"]["Tables"]["rooms"]["Row"] &
  BaseAttrs & {
    game_state: ColumnType<GameState, string, string>;
    players?: ColumnType<Player[], never, never>;
    created_by: ColumnType<string, string, never>;
    created_by_name: ColumnType<string, string, never>;
  };
type MatchTable = Database["public"]["Tables"]["matches"]["Row"] & BaseAttrs;

type PlayerTable = Database["public"]["Tables"]["players"]["Row"] &
  BaseAttrs & {
    role: ColumnType<PlayerRole, PlayerRole, string>;
  };

/** ===== Kysely Database Type Definition ===== */
export type KyselyDB = {
  rooms: RoomTable;
  matches: MatchTable;
  players: PlayerTable;
};

/** ===== Database CRUD Types ===== */
export type RoomUpdate = Updateable<RoomTable>;

/** ===== General Types To Be Used In The Front-End Also ===== */
export type Room = Selectable<RoomTable & Pick<Partial<Match>, "correct_words">>;
export type Match = Selectable<MatchTable>;
export type Player = Selectable<PlayerTable>;

/** ===== API Payload Data and Params Types ===== */
export type MakeGuessPostType = {
  words: string[];
};
export type MakeTipPostType = {
  tip: string;
  tip_number: number;
};
export type RoomPostType = {
  roomName: string;
};
export type LoginPostType = {
  userName: string;
};
export type RoomParamsType = { params: { id: string } };
