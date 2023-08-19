import useUser from "@/hooks/useUser";
import CheckMarkIcon from "@/icons/CheckMarkIcon";
import CrossIcon from "@/icons/CrossIcon";
import { ExtendedRoom } from "@/models";
import { makeGuess } from "@/services/api";
import clsx from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CardsGrid({ room }: { room: ExtendedRoom }) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const {
    user: {
      user_metadata: { user_name: userName },
    },
  } = useUser();
  const isHelper = userName === room.helper;
  const hasGuessesLeft = selectedWords.length < room.current_tip_number!;
  const canSelectWord = !isHelper && room.game_state === "WAITING_GUESSES";
  const canShowConfirm = room.current_tip_number === selectedWords.length;
  const guessesLeft = room.current_tip_number! - selectedWords.length;

  const onSelect = (word: string) => {
    if (canSelectWord) {
      if (selectedWords.includes(word)) {
        setSelectedWords(selectedWords.filter((selected) => selected !== word));
      } else if (hasGuessesLeft) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const renderPin = () => (
    <span className="absolute flex w-3 h-3 -right-1 -top-1">
      <span className="absolute inline-flex w-full h-full bg-pink-500 rounded-full opacity-75 animate-ping"></span>
      <span className="relative inline-flex w-3 h-3 rounded-full bg-secondary"></span>
    </span>
  );

  const onMakeGuess = async () => {
    try {
      await makeGuess(room.id, { words: selectedWords });
      setSelectedWords([]);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div
      className={clsx("flex flex-col h-full", {
        "pointer-events-none opacity-20":
          (!isHelper && !canSelectWord) || room.game_state === "FINISHED",
      })}
    >
      <div className="grid grid-cols-3 sm:grid-cols-4">
        {room?.words.map((word) => (
          <div
            key={word}
            onClick={() => onSelect(word)}
            className={twMerge(
              clsx(`h-24 relative grid m-3 bg-opacity-50 border-2 rounded-md place-items-center`, {
                "cursor-pointer hover:scale-110 opacity-80 hover:opacity-100": !isHelper,
                "bg-primary": room.correctWords?.includes(word),
                "bg-black": !room.correctWords?.includes(word),
                "bg-green-400 text-green-200 pointer-events-none":
                  room.correct_guesses.includes(word),
                "bg-red-400 text-red-200 pointer-events-none": room.wrong_guesses.includes(word),
                "animate-pulse":
                  isHelper &&
                  room.game_state === "WAITING_TIP" &&
                  !room.correct_guesses.includes(word),
              })
            )}
          >
            {selectedWords.includes(word) ? renderPin() : null}
            <div className="grid items-center gap-3 place-items-center sm:flex">
              <span>{word}</span>
              {room.correct_guesses.includes(word) && <CheckMarkIcon size={40} />}
              {room.wrong_guesses.includes(word) && <CrossIcon size={40} />}
            </div>
          </div>
        ))}
      </div>
      {canSelectWord && (
        <div className="p-4 text-center">
          {canShowConfirm ? (
            <button
              onClick={onMakeGuess}
              className="absolute left-0 w-full rounded-none sm:relative bottom-14 sm:bottom-0 btn btn-primary sm:rounded-sm"
            >
              Confirm
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
