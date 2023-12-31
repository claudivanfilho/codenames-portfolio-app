import LogoIcon from "@/app/_components/icons/LogoIcon";
import React from "react";
import { twMerge } from "tailwind-merge";

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement> & { size: number }> = ({
  size,
  ...props
}) => {
  return (
    <div {...props} className={twMerge("flex gap-2 items-center", props.className)}>
      <LogoIcon height={size} width={size} />
      <span className="font-semibold">codenames</span>
    </div>
  );
};

export default Logo;
