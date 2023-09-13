import {
  DEFAULT_CORRECT_WORDS,
  DEFAULT_ROUNDS_OF_MATCH,
  DEFAULT_WORDS_NUMBER,
} from "@/app/_config/constants";
import { GameState, RoomUpdate } from "@/types";
import { getRandomWords } from "@/app/_utils/game";
import { User } from "@/types";
import { db } from "../_utils/database";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export async function getVisibleRooms(userId: string) {
  return db
    .selectFrom("rooms")
    .selectAll()
    .where("game_state", "!=", "FINISHED")
    .execute()
    .then((res) => res.map((room) => ({ ...room, id: +room.id })));
}

export async function getRoomById(roomId: number) {
  return db
    .selectFrom("rooms")
    .innerJoinLateral(
      (eb) =>
        eb
          .selectFrom("matches")
          .select(["correct_words"])
          .whereRef("matches.room_id", "=", "rooms.id")
          .as("matches"),
      (join) => join.onTrue()
    )
    .selectAll()
    .select((eb) => [
      jsonArrayFrom(
        eb.selectFrom("players").selectAll().whereRef("players.room_id", "=", "rooms.id")
      ).as("players"),
    ])
    .where("rooms.id", "=", roomId)
    .executeTakeFirstOrThrow()
    .then((res) => ({ ...res, id: +res.id }));
}

export async function updateRoomById(roomId: number, data: RoomUpdate) {
  return db
    .updateTable("rooms")
    .where("id", "=", roomId)
    .set(data)
    .returningAll()
    .executeTakeFirstOrThrow()
    .then((res) => ({ ...res, id: +res.id }));
}

export async function updateStateAndCreatePlayer(gameState: GameState, user: User, roomId: number) {
  return db.transaction().execute(async (trx) => {
    const roomUpdated = await trx
      .updateTable("rooms")
      .where("id", "=", roomId)
      .set({
        game_state: gameState,
      })
      .returningAll()
      .executeTakeFirstOrThrow()
      .then((res) => ({ ...res, id: +res.id }));
    await trx
      .insertInto("players")
      .values({
        role: "GUESSER",
        user_id: user.id,
        room_id: roomId,
        username: user.user_metadata.user_name,
      })
      .execute();
    return roomUpdated;
  });
}

/**
 * It's necessary to use Knex to ensure atomicity for the transaction,
 * as Supabase does not provide a built-in mechanism for achieving it.
 */
export async function createNewRoom(roomName: string, user: User, locale: string) {
  return db.transaction().execute(async (trx) => {
    const room = await trx
      .insertInto("rooms")
      .values({
        name: roomName,
        wrong_guesses: [],
        correct_guesses: [],
        words: getRandomWords({ numberOfWords: DEFAULT_WORDS_NUMBER, locale }),
        rounds_left: DEFAULT_ROUNDS_OF_MATCH,
        game_state: "WAITING_GUESSER",
        created_by: user.id,
        created_by_name: user.user_metadata.user_name,
      })
      .returningAll()
      .executeTakeFirstOrThrow()
      .then((res) => ({ ...res, id: +res.id }));
    await trx
      .insertInto("players")
      .values({
        role: "HELPER",
        user_id: user.id,
        room_id: room.id,
        username: user.user_metadata.user_name,
      })
      .execute();
    const correctWords = getRandomWords({
      numberOfWords: DEFAULT_CORRECT_WORDS,
      predefinedList: room.words,
    });
    await trx
      .insertInto("matches")
      .values({
        room_id: room!.id,
        correct_words: correctWords,
      })
      .execute();
    return { ...room, correct_words: correctWords };
  });
}
