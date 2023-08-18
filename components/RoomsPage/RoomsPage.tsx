"use client";

import { Room } from "@/models";
import RoomListing from "./RoomListing";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import useRoom from "@/hooks/useRoom";
import { createRoom } from "@/services/api";
import useRealTimeRooms from "@/hooks/useRealTimeRooms";

export default function RoomsPage({ rooms: remoteRooms }: { rooms: Room[] }) {
  const [roomName, setRoomName] = useState("");
  const { setRoomId } = useRoom();
  const { userName } = useUser();
  const { rooms } = useRealTimeRooms(remoteRooms.filter((room) => room.helper !== userName));

  const onCreate = async () => {
    try {
      const data = await createRoom({
        helper: userName,
        roomName: roomName,
      });
      setRoomId(data.id);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 mb-6 sm:items-center sm:flex-row">
          <label htmlFor="room" className="mr-6 text-lg font-bold leading-6 whitespace-nowrap">
            Room Name
          </label>
          <input
            id="room"
            value={roomName}
            onChange={(evt) => setRoomName(evt.target.value)}
            type="text"
            placeholder="Room name"
            className="w-full max-w-xs input input-bordered"
          />
        </div>
        <button onClick={onCreate} type="submit" className="mt-auto mb-6 btn">
          Create
        </button>
      </div>
      <div className="mb-6 border-t border-gray-700"></div>
      {rooms.length ? (
        <RoomListing rooms={rooms} />
      ) : (
        <div className="text-center">No rooms available yet</div>
      )}
    </div>
  );
}
