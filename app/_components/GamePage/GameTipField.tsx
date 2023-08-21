import React from "react";

type GameTipFieldType = React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    isInputVisible: boolean;
    label: string;
  }
>;

const GameTipField: GameTipFieldType = ({ isInputVisible, label, value, className, ...props }) => {
  return (
    <div className="flex items-center justify-between w-full gap-4 sm:justify-normal sm:grid">
      <span className="text-sm sm:pb-2 sm:border-b-2 sm:text-2xl stat-title">{label}</span>
      {isInputVisible ? (
        <input
          {...props}
          value={value}
          placeholder="Your Tip"
          className="w-2/3 max-w-xs sm:w-full input input-bordered"
        />
      ) : (
        <span className="grid h-8 text-3xl rounded-lg sm:h-20 stat-title place-items-center">
          {value}
        </span>
      )}
    </div>
  );
};

export default GameTipField;
