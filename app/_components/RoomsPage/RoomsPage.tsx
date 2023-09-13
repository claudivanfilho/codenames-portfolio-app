"use client";

import RoomListing from "./RoomListing";
import { useState } from "react";
import { createRoom } from "@/app/_services/api";
import { FormattedMessage } from "react-intl";
import useRooms from "@/app/_hooks/useRooms";
import LoadingButton from "../LoadingButton";

export default function RoomsPage() {
  const [roomName, setRoomName] = useState("");
  const { rooms } = useRooms();

  const onCreate = async () => {
    const room = await createRoom({
      roomName: roomName,
    });
    window.location.href = `/room/${room.id}`;
  };

  return (
    <div className="grid text-center">
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 sm:items-center sm:flex-row">
          <label htmlFor="room" className="mr-6 text-lg font-bold leading-6 whitespace-nowrap">
            <FormattedMessage id="room-name" />
          </label>
          <input
            id="room"
            value={roomName}
            onChange={(evt) => setRoomName(evt.target.value)}
            type="text"
            className="w-full max-w-xs input input-bordered input-primary"
          />
        </div>
        <LoadingButton
          disabled={!roomName}
          onClick={onCreate}
          hideOnCatch
          className="mt-auto btn-primary min-w-[120px]"
        >
          <FormattedMessage id="create" />
        </LoadingButton>
      </div>
      <div className="my-6 border-t border-gray-700"></div>
      {rooms.length ? <RoomListing /> : <FormattedMessage id="no-rooms-info" />}
    </div>
  );
}
