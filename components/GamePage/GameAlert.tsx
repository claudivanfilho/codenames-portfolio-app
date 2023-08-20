import { Room } from "@/models";
import Loading from "../Loading";

export default function GameAlert({ room, isHelper }: { room: Room; isHelper: boolean }) {
  const renderContent = () => {
    switch (room.game_state) {
      case "WAITING_GUESSER":
        return (
          <div className="flex items-center">
            <Loading />
            <span>Waiting for the guesser to enter the room</span>
          </div>
        );
      case "WAITING_GUESSES":
        if (isHelper) {
          return (
            <div className="flex items-center">
              <Loading />
              <span>{room.guesser} is thinking about the guesses...</span>
            </div>
          );
        } else {
          return (
            <div className="flex items-center">
              <Loading />
              <span className="text-xs text-center sm:text-base">
                <span className="mx-2 font-mono text-xl countdown">
                  <span style={{ "--value": 44 } as any}></span>
                </span>
                seconds left to select {room.current_tip_number} word(s)
              </span>
            </div>
          );
        }
      case "WAITING_TIP":
        if (isHelper) {
          return <span>Choose a tip for the selected words</span>;
        } else {
          return (
            <div className="flex items-center">
              <Loading />
              <span>{room.helper} is thinking in a Tip</span>
            </div>
          );
        }
      case "FINISHED":
        if (room.wrong_guesses.length) {
          return (
            <>
              <span>{isHelper ? room.guesser : "You"} made a mistake :(</span>
              <form action={`/api/room/${room.id}/leave`} method="POST">
                <button className="btn btn-sm btn-secondary">Leave Room</button>
              </form>
            </>
          );
        } else {
          return (
            <>
              <span>CONGRATULATION!! You WON! :D</span>
              <form action={`/api/room/${room.id}/leave`} method="POST">
                <button className="btn btn-sm btn-secondary">Leave Room</button>
              </form>
            </>
          );
        }
    }
  };

  return (
    <div className="flex w-full h-13">
      <div className="flex justify-center p-2 mx-3 text-sm font-bold border-2 rounded-sm alert border-secondary">
        {renderContent()}
      </div>
    </div>
  );
}
