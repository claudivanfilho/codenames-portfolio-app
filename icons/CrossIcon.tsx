import { ReactElement } from "react";

interface CrossIconProps {
  className?: string;
  size?: number;
}

export default function CrossIcon({ className, size = 20 }: CrossIconProps): ReactElement {
  return (
    <svg
      className={className}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
