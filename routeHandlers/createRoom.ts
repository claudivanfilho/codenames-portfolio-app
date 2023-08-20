import BadRequestError from "@/errors/BadRequestError";
import { RoomPostType } from "@/models/server";
import { getUserFromServerComponent, updateUser } from "@/utils/supabaseServer";
import { createNewRoom } from "@/repositories/RoomRepository";

async function validate(req: Request): Promise<RoomPostType> {
  const { roomName } = (await req.json()) as RoomPostType;

  if (!roomName) throw new BadRequestError("Missing roomName");

  return { roomName };
}

export default async function createRoom(req: Request) {
  const user = await getUserFromServerComponent();
  const userName = user?.user_metadata.user_name || "";

  const { roomName } = await validate(req);
  const { data } = await createNewRoom(roomName, userName);
  const { error } = await updateUser({ room_id: data!.id });

  if (error) throw new Error(error.message);

  await updateUser({ room_id: data!.id });

  return data;
}
