import { Room } from "@/models";
import { EnterPostType, MakeGuessPostType, MakeTipPostType, RoomPostType } from "@/models/server";

const handleFetchRequest = (response: Response) => {
  if (!response.ok) {
    return response.json().then((errorData) => {
      throw new Error(errorData.message);
    });
  }
  return response.json();
};

export const createRoom = (data: RoomPostType): Promise<Room> => {
  return fetch("/api/room", { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
};

export const getRoom = (
  roomId: number,
  userName: string
): Promise<Room & { correctWords?: string[] }> => {
  const search = new URLSearchParams();
  search.append("userName", userName);
  return fetch(`/api/room/${roomId}?${search}`).then(handleFetchRequest);
};

export const enterRoom = (data: EnterPostType) => {
  return fetch("/api/room/enter", { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
};

export const makeTip = (data: MakeTipPostType) => {
  return fetch("/api/room/make_tip", { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
};

export const makeGuess = (data: MakeGuessPostType) => {
  return fetch("/api/room/make_guess", { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
};
