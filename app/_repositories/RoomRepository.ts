import {
  DEFAULT_CORRECT_WORDS,
  DEFAULT_ROUNDS_OF_MATCH,
  DEFAULT_WORDS_NUMBER,
} from "@/app/_config/constants";
import { ExtendedRoom, Match, Room, RoomInsertType } from "@/types";
import { getRandomWords } from "@/app/_utils/game";
import { getSupabaseServer } from "@/app/_utils/supabase";
import { User } from "@/types/server";
import pgPromise from "pg-promise";

export async function getExtendedRoom(roomId: number): Promise<ExtendedRoom> {
  pgPromise({});
  const { data } = await getSupabaseServer()
    .from("matches")
    .select<string, Match & { rooms: Room }>(`*, rooms(*)`)
    .eq("room_id", roomId)
    .single()
    .throwOnError();

  const { rooms: room, ...rest } = data!;

  return { ...room, correctWords: rest.correct_words! };
}

export async function getVisibleRooms(userId: string) {
  return getSupabaseServer()
    .from("rooms")
    .select<string, Room>("*")
    .neq("game_state", "FINISHED")
    .or(`helper_id.eq.${userId},guesser_id.eq.${userId},guesser_id.is.NULL`)
    .throwOnError();
}

export async function getRoomById(roomId: number) {
  return getSupabaseServer()
    .from("rooms")
    .select<string, Room>()
    .eq("id", roomId)
    .single()
    .throwOnError();
}

export async function updateRoomById(roomId: number, data: Partial<RoomInsertType>) {
  return getSupabaseServer()
    .from("rooms")
    .update<Partial<RoomInsertType>>(data)
    .eq("id", roomId)
    .select<string, Room>()
    .single()
    .throwOnError();
}

/** It's necessary to use pg-promise to grant atomicity to the transaction since supabase doesn't provide a way. */
export async function createNewRoom(roomName: string, user: User, locale: string) {
  const db = pgPromise()({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  });
  return db.tx<Room>(async (tx) => {
    const roomCreated = await tx.one(
      `INSERT INTO rooms(name, helper_id, helper_name, wrong_guesses, correct_guesses, words, rounds_left, game_state)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        roomName,
        user.id,
        user.user_metadata.user_name,
        [],
        [],
        getRandomWords({ numberOfWords: DEFAULT_WORDS_NUMBER, locale }),
        DEFAULT_ROUNDS_OF_MATCH,
        "WAITING_GUESSER",
      ]
    );

    await tx.none(
      `INSERT INTO matches(room_id, correct_words)
       VALUES($1, $2)`,
      [
        roomCreated.id,
        getRandomWords({
          numberOfWords: DEFAULT_CORRECT_WORDS,
          predefinedList: roomCreated.words,
        }),
      ]
    );
    return roomCreated;
  });
}
