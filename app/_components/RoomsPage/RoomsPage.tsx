"use client";

import { Room } from "@/types";
import RoomListing from "./RoomListing";
import { useState } from "react";
import { createRoom } from "@/app/_services/api";
import useRealTimeRooms from "@/app/_hooks/useRealTimeRooms";

export default function RoomsPage({ rooms: remoteRooms }: { rooms: Room[] }) {
  const [roomName, setRoomName] = useState("");
  const { rooms } = useRealTimeRooms(remoteRooms);

  const onCreate = async () => {
    try {
      const room = await createRoom({
        roomName: roomName,
      });
      window.location.href = `/room/${room.id}`;
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
            className="w-full max-w-xs input input-bordered input-secondary"
          />
        </div>
        <button
          disabled={!roomName}
          onClick={onCreate}
          type="submit"
          className="mt-auto mb-6 btn btn-secondary bt"
        >
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
