import clsx from "clsx";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Loading from "./Loading";

type LoadingButtonPropsType = React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** the default action hide the loading spinner on finally */
    hideOnCatch?: boolean;
    hideContent?: boolean;
  }
>;

const LoadingButton: LoadingButtonPropsType = ({
  children,
  className,
  onClick,
  hideOnCatch,
  hideContent,
  disabled,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const onClickWithLoading = async (_: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    const onClickCB = onClick as () => Promise<void>;
    if (hideOnCatch) {
      await onClickCB().catch((error) => {
        setLoading(false);
        alert(error.message);
      });
    } else {
      await onClickCB().finally(() => setLoading(false));
    }
  };

  return (
    <button
      disabled={loading || disabled}
      className={twMerge(clsx("btn", className))}
      onClick={onClickWithLoading}
      {...props}
    >
      {loading && <Loading className={hideContent ? "m-0" : ""} />}
      {hideContent && loading ? null : children}
    </button>
  );
};

export default LoadingButton;
