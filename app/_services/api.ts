import { Room } from "@/types";
import { MakeGuessPostType, MakeTipPostType, RoomPostType } from "@/types";

const handleFetchRequest = (response: Response) => {
  if (!response.ok) {
    return response.json().then((errorData) => {
      throw new Error(errorData.message);
    });
  } else if (response.redirected) {
    return (window.location.href = response.url);
  }
  return response.json();
};

export const createRoom = (data: RoomPostType): Promise<Room> => {
  return fetch("/api/room", { method: "POST", body: JSON.stringify(data) }).then(
    handleFetchRequest
  );
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

export const leaveRoom = (roomId: number) => {
  return fetch(`/api/room/${roomId}/leave`, { method: "POST" }).then(handleFetchRequest);
};

export const logout = () => {
  return fetch(`/auth/logout`, { method: "POST" }).then(handleFetchRequest);
};

export const login = (userName: string) => {
  return fetch(`/auth/login`, { method: "POST", body: JSON.stringify({ userName }) }).then(
    handleFetchRequest
  );
};
