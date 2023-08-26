"use client";

import RoomListing from "./RoomListing";
import { useState } from "react";
import { createRoom } from "@/app/_services/api";
import { FormattedMessage } from "react-intl";
import useRooms from "@/app/_hooks/useRooms";
import Loading from "../Loading";

export default function RoomsPage() {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const { rooms } = useRooms();

  const onCreate = async () => {
    try {
      setLoading(true);
      const room = await createRoom({
        roomName: roomName,
      });
      window.location.href = `/room/${room.id}`;
    } catch (error) {
      setLoading(false);
      alert((error as Error).message);
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 mb-6 sm:items-center sm:flex-row">
          <label htmlFor="room" className="mr-6 text-lg font-bold leading-6 whitespace-nowrap">
            <FormattedMessage id="room-name" />
          </label>
          <input
            id="room"
            value={roomName}
            onChange={(evt) => setRoomName(evt.target.value)}
            type="text"
            className="w-full max-w-xs input input-bordered input-secondary"
          />
        </div>
        <button
          disabled={!roomName || loading}
          onClick={onCreate}
          type="submit"
          className="mt-auto mb-6 btn btn-secondary bt min-w-[120px]"
        >
          {loading && <Loading />}
          <FormattedMessage id="create" />
        </button>
      </div>
      <div className="mb-6 border-t border-gray-700"></div>
      {rooms.length ? (
        <RoomListing />
      ) : (
        <div className="text-center">{<FormattedMessage id="no-rooms-info" />}</div>
      )}
    </div>
  );
}
