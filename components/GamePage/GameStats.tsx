import { DEFAULT_CORRECT_WORDS } from "@/config/contants";
import { Room } from "@/models";
import { makeTip } from "@/services/api";
import { useState } from "react";

export default function GameStats({ room, isHelper }: { room: Room; isHelper: boolean }) {
  const isInputVisible = room.game_state === "WAITING_TIP" && isHelper;
  const [tip, setTip] = useState("");
  const [tipNumber, setTipNumber] = useState(1);

  const onMakeTip = async () => {
    try {
      await makeTip({ room_id: room.id, tip, tip_number: tipNumber });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="grid w-full gap-4 p-4 sm:p-6 sm:w-1/4">
      <div className="flex items-center justify-between w-full gap-4 sm:justify-normal sm:grid">
        <span className="text-sm sm:pb-2 sm:border-b-2 sm:text-2xl stat-title">TIP</span>
        {isInputVisible ? (
          <input
            type="text"
            value={tip}
            onChange={(evt) => setTip(evt.target.value)}
            placeholder="Your Tip"
            className="w-full max-w-xs input input-bordered"
          />
        ) : (
          <span className="grid h-8 text-3xl rounded-lg sm:h-20 stat-title place-items-center">
            {room.current_tip}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 sm:grid sm:justify-normal">
        <span className="pb-2 text-sm sm:text-2xl sm:border-b-2 stat-title">Nº WORDS</span>
        {isInputVisible ? (
          <div className="grid gap-10">
            <input
              type="number"
              max={DEFAULT_CORRECT_WORDS}
              min={1}
              inputMode="numeric"
              value={tipNumber}
              onChange={(evt) => setTipNumber(+evt.target.value)}
              placeholder="Nº of words to the Tip"
              className="w-full max-w-xs input input-bordered"
            />

            <button className="btn" onClick={onMakeTip}>
              Confirm
            </button>
          </div>
        ) : (
          <span className="grid h-8 text-3xl rounded-lg sm:h-20 stat-title place-items-center">
            {room.current_tip_number}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 sm:grid sm:justify-normal">
        <span className="pb-2 text-sm sm:text-2xl sm:border-b-2 stat-title">Rounds Left</span>
        <span className="grid h-8 text-3xl rounded-lg sm:h-20 stat-title place-items-center">
          {room.rounds_left}
        </span>
      </div>
    </div>
  );
}
