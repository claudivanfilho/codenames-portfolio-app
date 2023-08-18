import { ReactElement } from "react";

interface CheckMarkIconProps {
  className?: string;
  size?: number;
}

export default function CheckMarkIcon({ className, size = 20 }: CheckMarkIconProps): ReactElement {
  return (
    <svg
      className={className}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 24 24`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
