import clsx from "clsx";
import React from "react";
import { FormattedMessage } from "react-intl";
import { twMerge } from "tailwind-merge";

type LeaveRoomBtnType = React.FC<
  React.HtmlHTMLAttributes<HTMLButtonElement> & {
    roomId: number;
  }
>;

const LeaveRoomBtn: LeaveRoomBtnType = ({ roomId, className, ...props }) => {
  return (
    <form action={`/api/room/${roomId}/leave`} method="POST">
      <button className={twMerge(clsx("flex mr-2 btn btn-sm", className))}>
        <span className="hidden sm:flex">
          <FormattedMessage id="leave-btn" />
        </span>
        <span className="block sm:hidden">
          <FormattedMessage id="leave-short-btn" />
        </span>
      </button>
    </form>
  );
};

export default LeaveRoomBtn;
