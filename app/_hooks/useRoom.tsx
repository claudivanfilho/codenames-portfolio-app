import { useContext } from "react";
import { RoomContext } from "../_context/RoomContext";

export default function useRoom() {
  const context = useContext(RoomContext);

  if (context === undefined) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
