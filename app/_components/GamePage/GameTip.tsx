import { DEFAULT_CORRECT_WORDS } from "@/app/_config/contants";
import useRoom from "@/app/_hooks/useRoom";
import { makeTip } from "@/app/_services/api";
import { useState } from "react";
import GameTipField from "./GameTipField";

export default function GameStats() {
  const { room, isHelper } = useRoom();
  const [tip, setTip] = useState("");
  const [tipNumber, setTipNumber] = useState(1);

  const isInputVisible = room.game_state === "WAITING_TIP" && isHelper;

  const onMakeTip = async () => {
    try {
      await makeTip(room.id, { tip, tip_number: tipNumber });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 p-2 mb-2 sm:gap-6 sm:w-1/4">
      <GameTipField
        isInputVisible={isInputVisible}
        type="text"
        label="TIP"
        value={isInputVisible ? tip : room.current_tip}
        onChange={(evt) => setTip(evt.target.value)}
      />
      <GameTipField
        isInputVisible={isInputVisible}
        max={DEFAULT_CORRECT_WORDS - room.correct_guesses.length}
        min={1}
        type="number"
        label="Nº WORDS"
        value={isInputVisible ? tipNumber : room.current_tip_number}
        onChange={(evt) => setTipNumber(+evt.target.value)}
      />
      {isInputVisible && (
        <button className="btn btn-secondary" disabled={!tip || !tipNumber} onClick={onMakeTip}>
          Confirm
        </button>
      )}
    </div>
  );
}
