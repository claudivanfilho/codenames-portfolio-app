import { enterRoom } from "@/app/_services/api";
import React from "react";
import { FormattedMessage } from "react-intl";
import LoadingButton from "../LoadingButton";

type EnterBtnType = React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    roomId: number;
  }
>;
const EnterBtn: EnterBtnType = ({ roomId, ...props }) => {
  const onEnter = async (roomId: number) => {
    await enterRoom(roomId);
    window.location.href = `/room/${roomId}`;
  };

  return (
    <LoadingButton
      hideContent
      onClick={() => onEnter(roomId)}
      hideOnCatch
      className="rounded-md btn btn-sm btn-outline min-w-[100px] text-center"
      {...props}
    >
      <FormattedMessage id="enter" />
    </LoadingButton>
  );
};

export default EnterBtn;
