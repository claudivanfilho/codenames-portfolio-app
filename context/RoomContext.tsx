import { getRoom, setRoom as setRoomOnStorage } from "@/utils/storage";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type RoomContextType = {
  roomId: number | undefined;
  setRoomId: (id: number | undefined) => void;
};

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

export const RoomProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [roomId, setRoomId] = useState<number>();

  const _setRoomId = (id: number | undefined) => {
    setRoomOnStorage(id);
    setRoomId(id);
  };

  useEffect(() => {
    if (getRoom()) {
      setRoomId(getRoom()!);
    }
  }, []);

  return (
    <RoomContext.Provider value={{ roomId, setRoomId: _setRoomId }}>
      {children}
    </RoomContext.Provider>
  );
};
