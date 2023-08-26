import clsx from "clsx";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { twMerge } from "tailwind-merge";
import { leaveRoom } from "../_services/api";
import Loading from "./Loading";

type LeaveRoomBtnType = React.FC<
  React.HtmlHTMLAttributes<HTMLButtonElement> & {
    roomId: number;
  }
>;

const LeaveRoomBtn: LeaveRoomBtnType = ({ roomId, className, ...props }) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    await leaveRoom(roomId).catch((error) => {
      setLoading(false);
      alert(error.message);
    });
  };
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={twMerge(clsx("flex mr-2 btn btn-sm", className))}
      {...props}
    >
      {loading && <Loading />}
      <span className="hidden sm:flex">
        <FormattedMessage id="leave-btn" />
      </span>
      <span className="block sm:hidden">
        <FormattedMessage id="leave-short-btn" />
      </span>
    </button>
  );
};

export default LeaveRoomBtn;
