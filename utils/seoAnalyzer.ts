const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with',
  'about', 'after', 'all', 'also', 'any', 'back', 'because', 'been', 'can', 'come', 'could', 'day', 'did', 'do', 'does', 'even', 'first', 'from', 'get', 'give', 'go', 'had', 'have', 'he', 'her', 'him', 'his', 'how', 'its', 'just', 'know', 'like', 'look', 'make', 'me', 'more', 'most', 'my', 'new', 'now', 'only', 'other', 'our', 'out', 'over', 'say', 'see', 'she', 'so', 'some', 'take', 'than', 'them', 'up', 'use', 'very', 'way', 'we', 'well', 'what', 'when', 'which', 'who', 'your'
]);

export const getKeywordDensity = (text: string): { word: string, count: number, percentage: number }[] => {
  const words = text.toLowerCase().trim().split(/\s+/).filter(w => w.length > 2); // Filter small words
  if (words.length === 0) return [];
  
  const counts: Record<string, number> = {};
  let totalCleanWords = 0;

  words.forEach(word => {
    const cleanWord = word.replace(/[.,!?()[\]{}"':;]/g, '');
    if (cleanWord.length > 2 && !STOP_WORDS.has(cleanWord)) {
      counts[cleanWord] = (counts[cleanWord] || 0) + 1;
      totalCleanWords++;
    }
  });
  
  return Object.entries(counts)
    .map(([word, count]) => ({
      word,
      count,
      percentage: parseFloat(((count / (totalCleanWords || 1)) * 100).toFixed(2))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

export const calculateFleschReadingScore = (text: string): { score: number, label: string } => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (words.length === 0 || sentences.length === 0) return { score: 0, label: 'N/A' };
  
  // Robust syllable count
  const countSyllables = (word: string) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    
    // Silent 'e' at the end
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    // Initial 'y'
    word = word.replace(/^y/, '');
    
    // Match vowel groups
    const syllables = word.match(/[aeiouy]{1,2}/g);
    let count = syllables ? syllables.length : 1;
    
    // Handle specific common English patterns
    if (word.endsWith('le') && word.length > 2 && !/[aeiouy]/.test(word[word.length - 3])) {
      count++; // e.g., 'table', 'apple'
    }
    
    return count;
  };
  
  const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
  
  // Flesch Reading Ease Formula: 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
  const score = 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (totalSyllables / words.length);
  
  let label = 'Hard';
  if (score >= 90) label = 'Very Easy';
  else if (score >= 80) label = 'Easy';
  else if (score >= 70) label = 'Fairly Easy';
  else if (score >= 60) label = 'Standard';
  else if (score >= 50) label = 'Fairly Difficult';
  else if (score >= 30) label = 'Difficult';
  else label = 'Very Difficult';
  
  return { score: Math.max(0, Math.min(100, parseFloat(score.toFixed(2)))), label };
};
