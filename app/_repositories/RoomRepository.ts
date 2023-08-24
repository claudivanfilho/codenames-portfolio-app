import {
  DEFAULT_CORRECT_WORDS,
  DEFAULT_ROUNDS_OF_MATCH,
  DEFAULT_WORDS_NUMBER,
} from "@/app/_config/constants";
import { ExtendedRoom, Match, MatchInsertType, Room, RoomInsertType } from "@/types";
import { getRandomWords } from "@/app/_utils/game";
import { getSupabaseServer } from "@/app/_utils/supabase";
import { User } from "@/types/server";

export async function getExtendedRoom(roomId: number): Promise<ExtendedRoom> {
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
    .or(`game_state.eq.WAITING_GUESSER,helper_id.eq.${userId},guesser_id.eq.${userId}`)
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

// TODO Create a supabase procedure to grants atomicity to this transaction
export async function createNewRoom(roomName: string, user: User, locale: string) {
  const result = await getSupabaseServer()
    .from("rooms")
    .insert<RoomInsertType>({
      name: roomName,
      helper_id: user.id,
      helper_name: user.user_metadata.user_name,
      wrong_guesses: [],
      correct_guesses: [],
      words: getRandomWords({ numberOfWords: DEFAULT_WORDS_NUMBER, locale }),
      rounds_left: DEFAULT_ROUNDS_OF_MATCH,
      game_state: "WAITING_GUESSER",
    })
    .select<string, Room>()
    .single()
    .throwOnError();

  await await getSupabaseServer()
    .from("matches")
    .insert<MatchInsertType>({
      room_id: result.data!.id,
      correct_words: getRandomWords({
        numberOfWords: DEFAULT_CORRECT_WORDS,
        predefinedList: result.data!.words,
      }),
    });
  return result;
}
