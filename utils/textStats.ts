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
  if (trimmed === '') return 0;
  // Enhanced regex to match sentence enders but ignore common abbreviations and honorifics
  // Handles common cases like Mr., Dr., Inc., Ltd., St., Ave., etc.
  const sentences = trimmed.split(/(?<!\b(?:Mr|Mrs|Ms|Dr|Jr|Sr|vs|etc|e\.g|i\.e|Prof|Rev|St|Ave|Blvd|Inc|Ltd|Co))\s*[.!?]+(?:\s+|$)/i);
  return sentences.filter(s => s.trim().length > 0).length;
};

export const countParagraphs = (text: string): number => {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
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
