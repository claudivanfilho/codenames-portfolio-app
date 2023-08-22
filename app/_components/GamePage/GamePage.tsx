import useRoom from "@/app/_hooks/useRoom";
import GameAlert from "./GameAlert";
import GameStats from "./GameTip";
import CardsGrid from "./CardsGrid";
import GamePageHeader from "./GamePageHeader";
import RealtimeCursor from "./RealtimeCursor";
import useRealtimeCursor from "@/app/_hooks/useRealtimeCursor";

export default function GamePage() {
  const { room } = useRoom();
  const { cursor } = useRealtimeCursor();

  return (
    <div className="items-start w-full h-full">
      <GamePageHeader />
      <div className="flex flex-col sm:flex-row">
        <GameStats />
        <div className="flex flex-col w-full sm:w-3/4">
          <GameAlert />
          <CardsGrid />
        </div>
      </div>
      {cursor && room.game_state === "WAITING_GUESSES" ? <RealtimeCursor cursor={cursor} /> : null}
    </div>
  );
}
