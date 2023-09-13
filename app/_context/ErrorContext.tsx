"use client";

import { FC, createContext, useState } from "react";

type ErrorContextType = {
  error: string;
  setError: (text: string) => void;
};

export const ErrorContext = createContext<ErrorContextType>({} as ErrorContextType);

export const ErrorProvider: FC<React.HtmlHTMLAttributes<Element>> = ({ children }) => {
  const [error, setError] = useState("");

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};
