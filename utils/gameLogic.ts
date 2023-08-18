import { GAME_WORDS_PT } from "@/config/constants/words/pt";

export const getRandomWords = (numberOfWords: number, predefinedList?: string[]) => {
  if (predefinedList) {
    return shuffleArray(predefinedList).slice(0, numberOfWords);
  }

  return shuffleArray(GAME_WORDS_PT).slice(0, numberOfWords);
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
