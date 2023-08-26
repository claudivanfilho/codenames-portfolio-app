import { Room } from "@/types";
import { makeGuess } from "@/app/_services/api";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FormattedMessage } from "react-intl";
import LoadingButton from "../LoadingButton";

type ConfirmGuessBtnType = React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
    await makeGuess(room.id, { words });
    setSelectedWords([]);
  };

  return (
    <LoadingButton
      {...props}
      onClick={onMakeGuess}
      className={twMerge(
        clsx(
          "absolute bottom-0 left-0 w-full rounded-none sm:relative btn btn-primary sm:rounded-sm",
          className
        )
      )}
    >
      <FormattedMessage id="confirm" />
    </LoadingButton>
  );
};

export default ConfirmGuessBtn;
