import { Database } from "@/types/supabase";

export type Room = Database["public"]["Tables"]["rooms"]["Row"] & {
  game_state: "WAITING_GUESSER" | "WAITING_TIP" | "WAITING_GUESSES" | "FINISHED";
};
export type ExtendedRoom = Room & { correctWords?: string[] };
export type Match = Database["public"]["Tables"]["matches"]["Row"];
export type RoomInsertType = Database["public"]["Tables"]["rooms"]["Insert"];
export type MatchInsertType = Database["public"]["Tables"]["matches"]["Insert"];
