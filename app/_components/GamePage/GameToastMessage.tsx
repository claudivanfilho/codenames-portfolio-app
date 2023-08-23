import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function GameToastMessage({
  duration = 3,
  children,
}: {
  duration?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        y: [-250, 100],
        opacity: [0, 0, 1, 1, 0, 0],
        transition: { duration },
      }}
      className="flex w-full text-6xl text-center"
    >
      {children}
    </motion.div>
  );
}
