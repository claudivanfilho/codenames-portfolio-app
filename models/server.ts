export type MakeGuessPostType = {
  words: string[];
};

export type MakeTipPostType = {
  tip: string;
  tip_number: number;
};

export type RoomPostType = {
  roomName: string;
};

export type LoginPostType = {
  userName: string;
};

export type RoomParamsType = { params: { id: string } };

export type User = {
  id: string;
  email: string;
  user_metadata: {
    room_id?: number | null;
    user_name: string;
  };
};
