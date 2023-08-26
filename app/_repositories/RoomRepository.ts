import {
  DEFAULT_CORRECT_WORDS,
  DEFAULT_ROUNDS_OF_MATCH,
  DEFAULT_WORDS_NUMBER,
} from "@/app/_config/constants";
import { RoomUpdate } from "@/types";
import { getRandomWords } from "@/app/_utils/game";
import { User } from "@/types";
import { db } from "../_utils/database";
export async function getVisibleRooms(userId: string) {
  return db
    .selectFrom("rooms")
    .selectAll()
    .where("game_state", "!=", "FINISHED")
    .where((eb) =>
      eb.or([
        eb("helper_id", "=", userId),
        eb("guesser_id", "=", userId),
        eb("guesser_id", "is", null),
      ])
    )
    .execute()
    .then((res) => res.map((room) => ({ ...room, id: +room.id })));
}

export async function getRoomById(roomId: number) {
  const res = await db
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
    .where("id", "=", roomId)
    .executeTakeFirstOrThrow()
    .then((res) => ({ ...res, id: +res.id }));
  return res;
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
        helper_id: user.id,
        helper_name: user.user_metadata.user_name,
        wrong_guesses: [],
        correct_guesses: [],
        words: getRandomWords({ numberOfWords: DEFAULT_WORDS_NUMBER, locale }),
        rounds_left: DEFAULT_ROUNDS_OF_MATCH,
        game_state: "WAITING_GUESSER",
      })
      .returningAll()
      .executeTakeFirstOrThrow()
      .then((res) => ({ ...res, id: +res.id }));
    await trx
      .insertInto("matches")
      .values({
        room_id: room!.id,
        correct_words: getRandomWords({
          numberOfWords: DEFAULT_CORRECT_WORDS,
          predefinedList: room.words,
        }),
      })
      .execute();
    return room;
  });
}
