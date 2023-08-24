import BadRequestError from "@/app/api/_errors/BadRequestError";
import { RoomPostType } from "@/types/server";
import { createNewRoom } from "@/app/_repositories/RoomRepository";
import { getSessionUser, updateSessionUser } from "@/app/_repositories/UserRepository";
import { getLocale } from "@/app/_utils/server";

async function validate(req: Request): Promise<RoomPostType> {
  const { roomName } = (await req.json()) as RoomPostType;

  if (!roomName) throw new BadRequestError("Missing roomName");

  return { roomName };
}

export default async function createRoom(req: Request) {
  const locale = getLocale();
  const user = await getSessionUser();
  const { roomName } = await validate(req);
  const { data } = await createNewRoom(roomName, user, locale);
  const { error } = await updateSessionUser({ room_id: data!.id });

  if (error) throw new Error(error.message);

  return data;
}
