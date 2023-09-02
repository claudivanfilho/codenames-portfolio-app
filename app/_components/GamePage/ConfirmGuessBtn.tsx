import { makeGuess } from "@/app/_services/api";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FormattedMessage } from "react-intl";
import LoadingButton from "../LoadingButton";
import useRoom from "@/app/_hooks/useRoom";

type ConfirmGuessBtnType = React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;

const ConfirmGuessBtn: ConfirmGuessBtnType = ({ className, ...props }) => {
  const { setSelectedWords, selectedWords, isHelper, room, setRoom } = useRoom();
  const canSelectWord = !isHelper && room.game_state === "WAITING_GUESSES";
  const canShowConfirm = room.current_tip_number === selectedWords.length && canSelectWord;

  const onMakeGuess = async () => {
    const newRoom = await makeGuess(room.id, { words: selectedWords });
    setRoom(newRoom);
    setSelectedWords([]);
  };

  if (!canShowConfirm) return null;

  return (
    <section className="p-3">
      <LoadingButton
        {...props}
        onClick={onMakeGuess}
        hideOnCatch
        className={twMerge(
          clsx(
            "absolute bottom-0 left-0 w-full rounded-none sm:relative btn btn-primary sm:rounded-sm",
            className
          )
        )}
      >
        <FormattedMessage id="confirm" />
      </LoadingButton>
    </section>
  );
};

export default ConfirmGuessBtn;
