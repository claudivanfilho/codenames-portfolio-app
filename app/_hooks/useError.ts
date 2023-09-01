import { useContext } from "react";
import { ErrorContext } from "../_context/ErrorContext";

export default function useError() {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error("useError must be used within a ErrorProvider");
  }
  return context;
}
