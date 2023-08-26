import { GAME_WORDS_PT } from "@/app/_config/words/pt";
import { GAME_WORDS_EN } from "../_config/words/en";

export const getRandomWords = ({
  numberOfWords,
  locale,
  predefinedList,
}: {
  numberOfWords: number;
  locale?: string;
  predefinedList?: string[];
}) => {
  if (predefinedList) {
    return shuffleArray(predefinedList).slice(0, numberOfWords);
  }

  if (locale === "pt") {
    return shuffleArray(GAME_WORDS_PT).slice(0, numberOfWords);
  }

  return shuffleArray(GAME_WORDS_EN).slice(0, numberOfWords);
};

function shuffleArray(array: string[]) {
  const shuffledArray = array.slice();
  let currentIndex = shuffledArray.length;
  let randomIndex, tempValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = tempValue;
  }

  return shuffledArray;
}
