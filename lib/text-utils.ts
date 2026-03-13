export const countWords = (text: string): number => {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
};

export const countCharacters = (text: string, includeSpaces: boolean = true): number => {
  if (includeSpaces) return text.length;
  return text.replace(/\s/g, '').length;
};

export const countLines = (text: string): number => {
  return text === '' ? 0 : text.split('\n').length;
};

export const countSentences = (text: string): number => {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
};

export const countParagraphs = (text: string): number => {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
};

export const calculateReadingTime = (wordCount: number): { min: number, sec: number } => {
  const totalSeconds = (wordCount / 200) * 60;
  const min = Math.floor(totalSeconds / 60);
  const sec = Math.floor(totalSeconds % 60);
  return { min, sec };
};

export const calculateAvgWordLength = (text: string): number => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return 0;
  const totalLength = words.reduce((acc, word) => acc + word.length, 0);
  return parseFloat((totalLength / words.length).toFixed(2));
};

export const calculateAvgSentenceLength = (text: string): number => {
  const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  if (sentences.length === 0) return 0;
  return parseFloat((words.length / sentences.length).toFixed(2));
};

export const getLongestAndShortestWord = (text: string): { longest: string, shortest: string } => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).map(w => w.replace(/[.,!?]/g, ''));
  if (words.length === 0) return { longest: '-', shortest: '-' };
  
  let longest = words[0];
  let shortest = words[0];
  
  words.forEach(word => {
    if (word.length > longest.length) longest = word;
    if (word.length < shortest.length) shortest = word;
  });
  
  return { longest, shortest };
};

export const getKeywordDensity = (text: string): { word: string, count: number, percentage: number }[] => {
  const words = text.toLowerCase().trim().split(/\s+/).filter(w => w.length > 2); // Filter small words
  if (words.length === 0) return [];
  
  const counts: Record<string, number> = {};
  words.forEach(word => {
    const cleanWord = word.replace(/[.,!?]/g, '');
    if (cleanWord.length > 2) {
      counts[cleanWord] = (counts[cleanWord] || 0) + 1;
    }
  });
  
  return Object.entries(counts)
    .map(([word, count]) => ({
      word,
      count,
      percentage: parseFloat(((count / words.length) * 100).toFixed(2))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

export const calculateFleschReadingScore = (text: string): { score: number, label: string } => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (words.length === 0 || sentences.length === 0) return { score: 0, label: 'N/A' };
  
  // Simple syllable count (very rough approximation: vowels)
  const countSyllables = (word: string) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };
  
  const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
  
  // Flesch Reading Ease Formula: 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
  const score = 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (totalSyllables / words.length);
  
  let label = 'Hard';
  if (score > 60) label = 'Easy';
  else if (score > 30) label = 'Medium';
  
  return { score: Math.max(0, Math.min(100, parseFloat(score.toFixed(2)))), label };
};
