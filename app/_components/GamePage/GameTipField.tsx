import clsx from "clsx";
import React from "react";

type GameTipFieldType = React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    isInputVisible: boolean;
    label: string;
  }
>;

const GameTipField: GameTipFieldType = ({ isInputVisible, label, value, className, ...props }) => {
  const renderInput = () => {
    if (props.type === "number") {
      return (
        <div className="flex flex-wrap justify-center w-full gap-3">
          {new Array(props.max).fill(0).map((_, index) => {
            const isSelected = value === index + 1;
            return (
              <kbd
                key={`input-number-${index}`}
                className={clsx(`kbd cursor-pointer hover:scale-150 border hover:border-primary`, {
                  "border-primary": isSelected,
                })}
                onClick={() => (props as any).onChange({ target: { value: index + 1 } })}
              >
                {index + 1}
              </kbd>
            );
          })}
        </div>
      );
    }
    return <input {...props} value={value} className="w-full input input-bordered" />;
  };

  return (
    <div className="flex items-center justify-between w-full gap-4 sm:justify-normal sm:grid">
      <span className="w-2/5 text-md sm:text-xl stat-title">{label}</span>
      {isInputVisible ? (
        renderInput()
      ) : (
        <kbd className="w-full p-2 text-xl text-center rounded-lg kbd sm:text-2xl ">
          {value || "-"}
        </kbd>
      )}
    </div>
  );
};

export default GameTipField;
