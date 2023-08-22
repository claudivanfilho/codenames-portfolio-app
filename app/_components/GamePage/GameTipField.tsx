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
      <span className="w-2/5 text-md sm:text-xl stat-title">{label}</span>
      {isInputVisible ? (
        <input
          {...props}
          value={value}
          placeholder="Your Tip"
          className="w-full input input-bordered"
        />
      ) : (
        <span className="w-full p-2 text-xl text-center rounded-lg sm:text-2xl bg-secondary bg-opacity-30 stat-title text-foreground">
          {value}
        </span>
      )}
    </div>
  );
};

export default GameTipField;
