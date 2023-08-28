import clsx from "clsx";
import React from "react";
import { FormattedMessage } from "react-intl";
import { twMerge } from "tailwind-merge";
import { leaveRoom } from "../_services/api";
import LoadingButton from "./LoadingButton";
import { useRouter } from "next/navigation";

type LeaveRoomBtnType = React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    roomId: number;
  }
>;

const LeaveRoomBtn: LeaveRoomBtnType = ({ roomId, className, ...props }) => {
  const router = useRouter();
  return (
    <LoadingButton
      onClick={async () => {
        await leaveRoom(roomId);
        window.location.href = "/";
      }}
      className={twMerge(clsx("flex mr-2 btn btn-sm", className))}
      hideOnCatch
      {...props}
    >
      <span className="hidden sm:flex">
        <FormattedMessage id="leave-btn" />
      </span>
      <span className="block sm:hidden">
        <FormattedMessage id="leave-short-btn" />
      </span>
    </LoadingButton>
  );
};

export default LeaveRoomBtn;
