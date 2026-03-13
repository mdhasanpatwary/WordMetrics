export const READING_SPEEDS = {
  SLOW: 150,
  AVERAGE: 200,
  FAST: 250
};

export const calculateReadingTime = (wordCount: number, wpm: number = READING_SPEEDS.AVERAGE): { min: number, sec: number } => {
  const totalSeconds = (wordCount / (wpm || READING_SPEEDS.AVERAGE)) * 60;
  const min = Math.floor(totalSeconds / 60);
  const sec = Math.floor(totalSeconds % 60);
  return { min, sec };
};
