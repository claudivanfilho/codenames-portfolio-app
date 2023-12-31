import { DEFAULT_CORRECT_WORDS } from "@/app/_config/constants";
import useRoom from "@/app/_hooks/useRoom";
import { makeTip } from "@/app/_services/api";
import { useState } from "react";
import GameTipField from "./GameTipField";
import { useIntl } from "react-intl";
import LoadingButton from "../LoadingButton";

export default function GameStats() {
  const { room, isHelper } = useRoom();
  const [tip, setTip] = useState("");
  const [tipNumber, setTipNumber] = useState(1);
  const { formatMessage: t } = useIntl();

  const isInputVisible = room.game_state === "WAITING_TIP" && isHelper;

  const onMakeTip = async () => {
    await makeTip(room.id, { tip, tip_number: tipNumber });
    setTipNumber(1);
  };

  return (
    <div className="flex flex-col w-full gap-4 p-2 mb-2 sm:gap-6 sm:w-1/4">
      <GameTipField
        isInputVisible={isInputVisible}
        type="text"
        label={t({ id: "tip" })}
        value={isInputVisible ? tip : room.current_tip!}
        onChange={(evt) => setTip(evt.target.value)}
      />
      <GameTipField
        isInputVisible={isInputVisible}
        max={DEFAULT_CORRECT_WORDS - room.correct_guesses.length}
        min={1}
        type="number"
        label={t({ id: "tip-number" })}
        value={isInputVisible ? tipNumber : room.current_tip_number!}
        onChange={(evt) => setTipNumber(+evt.target.value)}
      />
      {isInputVisible && (
        <LoadingButton className="btn-secondary" disabled={!tip || !tipNumber} onClick={onMakeTip}>
          {t({ id: "confirm" })}
        </LoadingButton>
      )}
    </div>
  );
}
