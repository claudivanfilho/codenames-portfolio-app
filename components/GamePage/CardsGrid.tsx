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
            style={{ backgroundImage: `url('/images/card-bg.png')` }}
            key={word}
            onClick={() => onSelect(word)}
            className={twMerge(
              clsx(
                `bg-center border-double shadow-slate-600 shadow-md bg-cover h-24 relative grid m-3 border-2 border-base-300 rounded-md place-items-center`,
                {
                  "cursor-pointer hover:scale-110 opacity-80 hover:opacity-100": !isHelper,
                  "border-secondary border-8 animate-pulse":
                    isHelper &&
                    room.game_state === "WAITING_TIP" &&
                    room.correctWords?.includes(word),
                  "border-success border-8 pointer-events-none":
                    room.correct_guesses.includes(word),
                  "border-error border-8 pointer-events-none": room.wrong_guesses.includes(word),
                  "border-primary border-8": selectedWords.includes(word),
                }
              )
            )}
          >
            <div className="absolute grid w-full h-full bg-black bg-opacity-40 place-items-center">
              <div
                className={`${twMerge(
                  clsx(
                    "p-2 grid items-center justify-around w-full gap-3 place-items-center sm:flex bg-opacity-40 bg-black",
                    {
                      "bg-secondary": room.correctWords?.includes(word),
                      "bg-success": room.correct_guesses.includes(word),
                      "bg-error": room.wrong_guesses.includes(word),
                      "bg-primary": selectedWords.includes(word),
                    }
                  )
                )}`}
              >
                <span className="text-sm sm:text-base">{word}</span>
                {room.correct_guesses.includes(word) && <CheckMarkIcon size={30} />}
                {room.wrong_guesses.includes(word) && <CrossIcon size={30} />}
              </div>
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
