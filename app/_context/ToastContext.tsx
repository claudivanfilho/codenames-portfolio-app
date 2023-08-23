"use client";

import { FC, ReactNode, createContext, useEffect, useRef, useState } from "react";
import ToastTurnContent from "../_components/toastContents/ToastTurnContent";
import ToastWinContent from "../_components/toastContents/ToastWinContent";
import ToastLossContent from "../_components/toastContents/ToastLossContent";

type ToastContextType = {
  show: (type: ToastType) => void;
  visible: boolean;
  Toast: ReactNode;
};

const TOAST_DURATION_SECONDS = 3;

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);
export type ToastType = "TURN" | "WIN" | "LOSS";

export const ToastProvider: FC<React.HtmlHTMLAttributes<Element>> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const type = useRef<ToastType>("TURN");
  const toasts = {
    TURN: ToastTurnContent,
    WIN: ToastWinContent,
    LOSS: ToastLossContent,
  };

  useEffect(() => {
    const timeout =
      visible &&
      setTimeout(() => {
        setVisible(false);
      }, TOAST_DURATION_SECONDS * 1000);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [visible]);

  const Component = toasts[type.current];

  const ToastElement = visible ? (
    <div className="absolute top-0 left-0 grid w-full h-full place-items-center">
      <Component duration={TOAST_DURATION_SECONDS} />
    </div>
  ) : null;

  const onShow = (newType: ToastType) => {
    type.current = newType;
    setVisible(true);
  };

  return (
    <ToastContext.Provider value={{ show: onShow, visible, Toast: ToastElement }}>
      {children}
    </ToastContext.Provider>
  );
};
