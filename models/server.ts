export type EnterPostType = {
  guesser: string;
  room_id: number;
};

export type MakeGuessPostType = {
  words: string[];
  roomId: number;
};

export type MakeTipPostType = {
  tip: string;
  tip_number: number;
  room_id: number;
};

export type RoomPostType = {
  roomName: string;
  helper: string;
};
