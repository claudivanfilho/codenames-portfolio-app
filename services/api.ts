import { Room } from "@/models";
import { LoginPostType, MakeGuessPostType, MakeTipPostType, RoomPostType } from "@/models/server";

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

export const getRoom = (roomId: number): Promise<Room & { correctWords?: string[] }> => {
  return fetch(`/api/room/${roomId}`).then(handleFetchRequest);
};

export const enterRoom = (roomId: number) => {
  return fetch(`/api/room/${roomId}/enter`, { method: "POST" }).then(handleFetchRequest);
};

export const makeTip = (roomId: number, data: MakeTipPostType) => {
  return fetch(`/api/room/${roomId}/tip`, { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
};

export const makeGuess = (roomId: number, data: MakeGuessPostType) => {
  return fetch(`/api/room/${roomId}/guess`, { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
};

export const login = (data: LoginPostType) => {
  return fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ userName: data.userName }),
  }).then(handleFetchRequest);
};
