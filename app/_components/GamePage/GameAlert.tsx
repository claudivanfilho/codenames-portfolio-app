import Loading from "../Loading";
import useRoom from "@/app/_hooks/useRoom";

export default function GameAlert() {
  const { room, isHelper } = useRoom();

  const hasLost = room.wrong_guesses.length;

  const finishMessage = hasLost
    ? `${isHelper ? room.guesser : "You"} made a mistake 😔`
    : "CONGRATULATION!! You WON! 🎉";

  const helperContent = {
    WAITING_GUESSER: [<Loading />, <span>Waiting for the guesser to enter the room</span>],
    WAITING_GUESSES: [<Loading />, <span>{room.guesser} is thinking about the guesses 🤔</span>],
    WAITING_TIP: [<span>Choose a tip for the selected words</span>],
    FINISHED: [
      <span>{finishMessage}</span>,
      <form action={`/api/room/${room.id}/leave`} method="POST">
        <button className="btn btn-sm btn-secondary">Leave Room</button>
      </form>,
    ],
  };

  const guesserContent = {
    ...helperContent,
    WAITING_GUESSES: [
      <Loading />,
      <span className="text-xs text-center sm:text-base">
        Select {room.current_tip_number} words that matches to the Tip
      </span>,
    ],
    WAITING_TIP: [<Loading />, <span>{room.helper} is thinking in a Tip 🤔</span>],
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
