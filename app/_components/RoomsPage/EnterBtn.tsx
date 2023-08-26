import { enterRoom } from "@/app/_services/api";
import React, { useState } from "react";
import Loading from "../Loading";
import { FormattedMessage } from "react-intl";

type EnterBtnType = React.FC<
  React.HtmlHTMLAttributes<HTMLButtonElement> & {
    roomId: number;
  }
>;
const EnterBtn: EnterBtnType = ({ roomId }) => {
  const [loading, setLoading] = useState(false);

  const onEnter = async (roomId: number) => {
    try {
      setLoading(true);
      await enterRoom(roomId);
      window.location.href = `/room/${roomId}`;
    } catch (error) {
      setLoading(false);
      alert((error as Error).message);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={() => onEnter(roomId)}
      className="rounded-md btn btn-sm btn-outline min-w-[100px] text-center"
    >
      {loading ? <Loading className="m-0" /> : <FormattedMessage id="enter" />}
    </button>
  );
};

export default EnterBtn;
