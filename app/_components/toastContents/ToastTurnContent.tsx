import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

export default function ToastTurnContent({ duration = 3 }: { duration?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        y: [-150, 50],
        opacity: [0, 0, 1, 1, 0],
        transition: { duration },
      }}
      className="flex w-full text-6xl text-center"
    >
      <span className="w-full p-3 bg-black bg-opacity-60">
        <FormattedMessage id="your-turn" />
      </span>
    </motion.div>
  );
}
