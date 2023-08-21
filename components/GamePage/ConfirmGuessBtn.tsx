import { Room } from "@/models";
import { makeGuess } from "@/services/api";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type ConfirmGuessBtnType = React.FC<
  React.HtmlHTMLAttributes<HTMLButtonElement> & {
    room: Room;
    words: string[];
    setSelectedWords: (word: string[]) => void;
  }
>;

const ConfirmGuessBtn: ConfirmGuessBtnType = ({
  room,
  words,
  className,
  setSelectedWords,
  ...props
}) => {
  const onMakeGuess = async () => {
    try {
      await makeGuess(room.id, { words });
      setSelectedWords([]);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <button
      {...props}
      onClick={onMakeGuess}
      className={twMerge(
        clsx(
          "absolute bottom-0 left-0 w-full rounded-none sm:relative btn btn-primary sm:rounded-sm",
          className
        )
      )}
    >
      Confirm
    </button>
  );
};

export default ConfirmGuessBtn;
