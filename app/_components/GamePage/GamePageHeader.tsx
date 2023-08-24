import { DEFAULT_CORRECT_WORDS } from "@/app/_config/constants";
import useRoom from "@/app/_hooks/useRoom";
import { FormattedMessage } from "react-intl";

export default function GamePageHeader() {
  const { room, isHelper } = useRoom();

  return (
    <div className="flex mb-4 stats bg-opacity-80">
      <div className="hidden sm:grid stat">
        <span className="stat-title">
          <FormattedMessage id="room" />
        </span>
        <span className="text-lg stat-value">{room.name}</span>
      </div>
      <div className="hidden sm:grid stat">
        <span className="stat-title">
          <FormattedMessage id={isHelper ? "guesser" : "helper"} />
        </span>
        <span className="text-lg stat-value">
          {isHelper ? room.guesser_name : room.helper_name}
        </span>
      </div>
      <div className="stat">
        <span className="stat-title">
          <FormattedMessage id="correct-words" />
        </span>
        <span className="text-lg stat-value">
          {room.correct_guesses.length}/{DEFAULT_CORRECT_WORDS}
        </span>
      </div>
      <div className="stat">
        <span className="stat-title">
          <FormattedMessage id="rounds-left" />
        </span>
        <span className="text-lg stat-value">{room.rounds_left}</span>
      </div>
    </div>
  );
}
