import { useContext } from "react";
import { RoomsContext } from "../_context/RoomsContext";

export default function useRooms() {
  const context = useContext(RoomsContext);

  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
}
