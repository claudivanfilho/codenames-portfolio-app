import { motion } from "framer-motion";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

export default function ToastWinContent({ duration = 3 }: { duration?: number }) {
  return (
    <motion.div
      className="grid w-full h-full bg-black bg-opacity-50 place-items-center"
      animate={{ opacity: [0, 1, 1, 1, 1, 1, 0] }}
      transition={{ duration }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          scale: [0, 1, 0.9, 1, 0.9, 1],
          opacity: [0, 1, 1, 1],
          transition: { duration, damping: 100 },
        }}
        className="flex justify-center text-6xl"
      >
        <div className="grid gap-3 place-items-center">
          <Image width={200} height={200} alt="Confetti" src="/images/confetti.gif" />
          <FormattedMessage id="you-won" />
        </div>
      </motion.div>
    </motion.div>
  );
}
