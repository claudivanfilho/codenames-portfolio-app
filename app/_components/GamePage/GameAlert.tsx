import { GameState } from "@/types";
import Loading from "../Loading";
import useRoom from "@/app/_hooks/useRoom";
import { ReactNode } from "react";
import { useIntl } from "react-intl";
import LeaveRoomBtn from "../LeaveRoomBtn";

export default function GameAlert() {
  const { room, isHelper } = useRoom();
  const { formatMessage: t } = useIntl();

  const hasLost = room.wrong_guesses.length;
  const userType = isHelper ? "helper" : "guesser";
  const gameState = room.game_state.toLowerCase();
  const endSuffix = hasLost ? "_loss" : "";
  const messageId = `alert-${userType}-${gameState}${endSuffix}`;
  const msg = t(
    { id: messageId },
    {
      helper: room.helper_name,
      guesser: room.guesser_name,
      number: room.current_tip_number,
    }
  );

  const helperContent: Record<GameState, [ReactNode, ReactNode?]> = {
    WAITING_GUESSER: [<Loading />, msg],
    WAITING_GUESSES: [<Loading />, msg],
    WAITING_TIP: [msg],
    FINISHED: [msg, <LeaveRoomBtn roomId={room.id} className="btn-secondary" />],
  };

  const guesserContent: Record<GameState, [ReactNode, ReactNode?]> = {
    ...helperContent,
    WAITING_GUESSES: [<Loading />, msg],
    WAITING_TIP: [<Loading />, msg],
  };

  const content = isHelper ? helperContent[room.game_state] : guesserContent[room.game_state];

  return (
    <div className="flex w-full h-13">
      <div className="flex justify-center p-2 mx-3 text-sm font-bold border-2 rounded-sm alert border-secondary">
        <div className="flex items-center gap-4">
          {content.at(0)}
          {content.at(1)}
        </div>
      </div>
    </div>
  );
}
