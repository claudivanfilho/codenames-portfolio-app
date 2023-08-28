import BadRequestError from "@/app/api/_errors/BadRequestError";
import { RoomPostType } from "@/types";
import { createNewRoom } from "@/app/_repositories/RoomRepository";
import { getSessionUser, setSessionRoom } from "@/app/_utils/session";
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
  const room = await createNewRoom(roomName, user, locale);
  setSessionRoom(+room.id);

  return room;
}
