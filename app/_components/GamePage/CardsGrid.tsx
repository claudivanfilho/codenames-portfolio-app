import clsx from "clsx";
import Card from "./Card";
import ConfirmGuessBtn from "./ConfirmGuessBtn";
import useRoom from "@/app/_hooks/useRoom";
import { motion } from "framer-motion";

export default function CardsGrid() {
  const { isHelper, room, selectedWords, setSelectedWords } = useRoom();
  const hasGuessesLeft = selectedWords.length < room.current_tip_number!;
  const canSelectWord = !isHelper && room.game_state === "WAITING_GUESSES";
  const canShowConfirm = room.current_tip_number === selectedWords.length;
  const isCursorBlocked = (!isHelper && !canSelectWord) || room.game_state === "FINISHED";

  const onSelect = (word: string) => {
    if (canSelectWord) {
      if (selectedWords.includes(word)) {
        setSelectedWords(selectedWords.filter((selected) => selected !== word));
      } else if (hasGuessesLeft) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  return (
    <div
      className={clsx("flex flex-col h-full", {
        "pointer-events-none opacity-70": isCursorBlocked,
      })}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {room.words.map((word, index) => (
          <motion.div
            key={word}
            initial={{
              opacity: 0,
              scale: 0,
              y: -100,
              x: -200,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
            }}
            transition={{ delay: 0.1 * index, stiffness: 10 }}
          >
            <Card
              isHelperMode={isHelper}
              isSelected={selectedWords.includes(word)}
              room={room}
              word={word}
              onClick={() => onSelect(word)}
            />
          </motion.div>
        ))}
      </div>
      {canSelectWord && canShowConfirm && (
        <section className="p-3">
          <ConfirmGuessBtn
            className="mt-2"
            room={room}
            setSelectedWords={setSelectedWords}
            words={selectedWords}
          />
        </section>
      )}
    </div>
  );
}