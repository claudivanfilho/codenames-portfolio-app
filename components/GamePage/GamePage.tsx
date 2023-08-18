import useRoom from "@/hooks/useRoom";
import useUser from "@/hooks/useUser";
import GameAlert from "./GameAlert";
import GameStats from "./GameStats";
import useRealtimeCursor from "@/hooks/useRealtimeCursor";
import RealtimeCursor from "./RealtimeCursor";
import useRealTimeRoom from "@/hooks/useRealTimeRoom";
import CardsGrid from "./CardsGrid";
import { DEFAULT_CORRECT_WORDS } from "@/config/contants";

export default function GamePage() {
  const { roomId, setRoomId } = useRoom();
  const { userName } = useUser();
  const { room } = useRealTimeRoom(roomId!, userName);
  const isHelper = room?.helper === userName;
  const { cursor } = useRealtimeCursor(room?.id, userName, isHelper);

  const onLeave = () => {
    setRoomId(undefined);
  };

  if (!room) return null;

  return (
    <div className="items-start w-full h-full">
      <button onClick={onLeave} className="absolute top-2 sm:top-4 right-6 btn btn-sm btn-outline">
        Leave Room
      </button>
      <div className="flex mb-4 stats">
        <div className="hidden sm:grid stat">
          <span className="stat-title">Room</span>
          <span className="text-xl stat-value">{room.name}</span>
        </div>
        <div className="stat">
          <span className="stat-title">{isHelper ? "Guesser" : "Helper"}</span>
          <span className="text-xl stat-value">{isHelper ? room.guesser : room.helper}</span>
        </div>
        <div className="stat">
          <span className="stat-title">Correct Words</span>
          <span className="text-xl stat-value">
            {room.correct_guesses.length}/{DEFAULT_CORRECT_WORDS}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <GameStats room={room} isHelper={isHelper} />

        <div className="flex flex-col w-full sm:w-3/4">
          <GameAlert room={room} isHelper={isHelper} />
          <CardsGrid room={room} />
        </div>
      </div>

      {cursor && room.game_state === "WAITING_GUESSES" ? <RealtimeCursor cursor={cursor} /> : null}
    </div>
  );
}
