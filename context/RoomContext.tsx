import { Room } from "@/models";
import { FC, createContext, useState } from "react";

type RoomContextType = {
  room: Room;
};

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

export const RoomProvider: FC<React.HtmlHTMLAttributes<Element> & { remoteRoom: Room }> = ({
  children,
  remoteRoom,
}) => {
  const [room] = useState(remoteRoom);

  return <RoomContext.Provider value={{ room }}>{children}</RoomContext.Provider>;
};
