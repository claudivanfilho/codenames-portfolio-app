import CheckMarkIcon from "@/app/_components/icons/CheckMarkIcon";
import CrossIcon from "@/app/_components/icons/CrossIcon";
import { ExtendedRoom } from "@/types";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type CardType = React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    room: ExtendedRoom;
    isHelperMode: boolean;
    isSelected: boolean;
    word: string;
  }
>;

const Card: CardType = ({ word, isSelected, room, isHelperMode, className, ...props }) => {
  const isCorrectGuess = room.correct_guesses.includes(word);
  const isIncorrectGuess = room.wrong_guesses.includes(word);
  const isCorrectWord = room.correctWords?.includes(word);
  const isPulsing = isCorrectWord && room.game_state === "WAITING_TIP";

  return (
    <div
      {...props}
      style={{ backgroundImage: `url('/images/code-bg.png')` }}
      className={twMerge(
        clsx(
          `bg-center sm:border-double shadow-slate-600 shadow-md bg-cover h-14 sm:h-28 relative grid m-2 sm:m-3 border-2 border-base-300 rounded-md place-items-center hover:scale-105`,
          {
            "cursor-pointer hover:scale-110 opacity-80 hover:opacity-100": !isHelperMode,
            "animate-pulse": isPulsing,
            "border-secondary border-8": isCorrectWord,
            "border-success border-8 pointer-events-none": isCorrectGuess,
            "border-error border-8 pointer-events-none": isIncorrectGuess,
            "border-primary border-8": isSelected,
          },
          className
        )
      )}
    >
      <div className="absolute grid w-full h-full bg-black bg-opacity-60 sm:bg-opacity-20 place-items-center">
        <div
          className={`${twMerge(
            clsx(
              "px-2 sm:p-2 items-center justify-around w-full gap-3 place-items-center flex bg-opacity-40 bg-black",
              {
                "bg-secondary": isCorrectWord,
                "bg-success": isCorrectGuess,
                "bg-error": isIncorrectGuess,
                "bg-primary": isSelected,
              }
            )
          )}`}
        >
          <span className="text-sm break-all sm:text-base">{word}</span>
          {isCorrectGuess && <CheckMarkIcon size={26} className="text-green-200" />}
          {isIncorrectGuess && <CrossIcon size={26} className="text-red-200" />}
        </div>
      </div>
    </div>
  );
};

export default Card;
