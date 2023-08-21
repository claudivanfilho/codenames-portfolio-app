import { DEFAULT_CORRECT_WORDS } from "@/config/contants";
import useRoom from "@/hooks/useRoom";

export default function GamePageHeader() {
  const { room, isHelper } = useRoom();

  return (
    <div className="flex mb-4 stats bg-opacity-80">
      <div className="hidden sm:grid stat">
        <span className="stat-title">Room</span>
        <span className="text-lg stat-value">{room.name}</span>
      </div>
      <div className="hidden sm:grid stat">
        <span className="stat-title">{isHelper ? "Guesser" : "Helper"}</span>
        <span className="text-lg stat-value">{isHelper ? room.guesser : room.helper}</span>
      </div>
      <div className="stat">
        <span className="stat-title">Correct Words</span>
        <span className="text-lg stat-value">
          {room.correct_guesses.length}/{DEFAULT_CORRECT_WORDS}
        </span>
      </div>
      <div className="stat">
        <span className="stat-title">Rounds Left</span>
        <span className="text-lg stat-value">{room.rounds_left}</span>
      </div>
    </div>
  );
}
