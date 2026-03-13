import { useMemo, useState, useEffect } from 'react';
import * as TextStats from '../utils/textStats';
import * as SeoAnalyzer from '../utils/seoAnalyzer';
import { calculateReadingTime } from '../utils/readingTime';

export const useTextStats = (text: string, readingWpm: number = 200) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 300); // 300ms debounce for heavy calculations

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  const instantStats = useMemo(() => {
    return {
      wordCount: TextStats.countWords(text),
      charCount: TextStats.countCharacters(text),
      charCountNoSpaces: TextStats.countCharacters(text, false),
    };
  }, [text]);

  const heavyStats = useMemo(() => {
    const wordCount = TextStats.countWords(debouncedText);
    const lineCount = TextStats.countLines(debouncedText);
    const sentenceCount = TextStats.countSentences(debouncedText);
    const paragraphCount = TextStats.countParagraphs(debouncedText);
    const readingTime = calculateReadingTime(wordCount, readingWpm);
    const speakingTime = calculateReadingTime(wordCount, 130); // 130 WPM for speaking
    const avgWordLength = TextStats.calculateAvgWordLength(debouncedText);
    const avgSentenceLength = TextStats.calculateAvgSentenceLength(debouncedText);
    const { longest, shortest } = TextStats.getLongestAndShortestWord(debouncedText);
    const keywordDensity = SeoAnalyzer.getKeywordDensity(debouncedText);
    const flesch = SeoAnalyzer.calculateFleschReadingScore(debouncedText);
    
    // Punctuation analysis
    const punctuation = {
      commas: (debouncedText.match(/,/g) || []).length,
      periods: (debouncedText.match(/\./g) || []).length,
      semicolons: (debouncedText.match(/;/g) || []).length,
      exclamations: (debouncedText.match(/!/g) || []).length,
      questions: (debouncedText.match(/\?/g) || []).length,
    };

    return {
      lineCount,
      sentenceCount,
      paragraphCount,
      readingTime,
      speakingTime,
      avgWordLength,
      avgSentenceLength,
      longest,
      shortest,
      keywordDensity,
      flesch,
      punctuation
    };
  }, [debouncedText]);

  return {
    ...instantStats,
    ...heavyStats
  };
};
