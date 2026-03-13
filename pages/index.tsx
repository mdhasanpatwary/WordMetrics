import React, { useState, useEffect, useMemo } from 'react';
import { Info } from 'lucide-react';
import { useTextStats } from '../hooks/useTextStats';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useClipboard } from '../hooks/useClipboard';
import Header from '../components/Header';
import SeoHead from '../components/SeoHead';
import TextEditor from '../components/TextEditor';
import QuickStats from '../components/QuickStats';
import TextTools from '../components/TextTools';
import CaseConverter from '../components/CaseConverter';
import AdvancedStats from '../components/AdvancedStats';
import SeoTools from '../components/SeoTools';
import SeoContent from '../components/SeoContent';
import { sanitizeText } from '../utils/textTools';

const HIGHLIGHT_THRESHOLD = 8000;

export default function Home() {
  const [text, setText, persistenceStatus] = useLocalStorage('wordmetrics_text', '');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [readingWpm, setReadingWpm] = useState(200);

  const stats = useTextStats(text, readingWpm);
  const { copy: copyText, hasCopied: showCopySuccess } = useClipboard();
  const { copy: copyStats, hasCopied: showStatsCopySuccess } = useClipboard();

  // Dark mode & Storage Sync
  useEffect(() => {
    setMounted(true);
    
    // Check initial theme immediately on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'wordmetrics_text') {
        const sanitized = sanitizeText(e.newValue || '');
        setText(sanitized);
      }
      if (e.key === 'theme') {
        const dark = e.newValue === 'dark';
        setIsDarkMode(dark);
        if (dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [setText]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isHighlightDisabled = text.length > HIGHLIGHT_THRESHOLD;

  const highlightingRegex = useMemo(() => {
    if (!showHighlight || !text || isHighlightDisabled) return null;
    const frequentWords = stats.keywordDensity.map(kw => kw.word);
    if (frequentWords.length === 0) return null;

    const escapedWords = frequentWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return {
      regex: new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi'),
      words: frequentWords
    };
  }, [text, showHighlight, stats.keywordDensity, isHighlightDisabled]);

  const highlightedContent = useMemo(() => {
    if (!highlightingRegex || !text || isHighlightDisabled) return text;
    
    const parts = text.split(highlightingRegex.regex);
    return parts.map((part, i) => {
      if (highlightingRegex.words.includes(part.toLowerCase())) {
        return <mark key={i} className="bg-yellow-200 dark:bg-yellow-800/50 text-inherit">{part}</mark>;
      }
      return part;
    });
  }, [text, highlightingRegex, isHighlightDisabled]);

  const copyStatsToClipboard = () => {
    const statsText = `
WordMetrics Statistics:
----------------------
Words: ${stats.wordCount}
Characters: ${stats.charCount}
Characters (No Spaces): ${stats.charCountNoSpaces}
Lines: ${stats.lineCount}
Sentences: ${stats.sentenceCount}
Paragraphs: ${stats.paragraphCount}
Reading Time: ${stats.readingTime.min}m ${stats.readingTime.sec}s
Speaking Time: ${stats.speakingTime.min}m ${stats.speakingTime.sec}s
Avg Word Length: ${stats.avgWordLength}
Avg Sentence Length: ${stats.avgSentenceLength}
Flesch Score: ${stats.flesch.score} (${stats.flesch.label})
    `.trim();
    copyStats(statsText);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-[#111111]" aria-hidden="true" />;
  }

  return (
    <div className="h-screen flex flex-col font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-[#111111] bg-white dark:bg-[#111111] overflow-hidden">
      <SeoHead />

      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      />

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <TextEditor 
          text={text}
          setText={setText}
          showHighlight={showHighlight}
          setShowHighlight={setShowHighlight}
          highlightedContent={highlightedContent}
          onCopy={() => copyText(text)}
          onClear={() => setText('')}
          showCopySuccess={showCopySuccess}
          isHighlightDisabled={isHighlightDisabled}
          persistenceStatus={persistenceStatus}
        />

        <section className="w-full md:w-[35%] flex flex-col overflow-y-auto bg-[#f9f9f9]/50 dark:bg-black/20 pb-10 flex-1 md:flex-none">
          <div className="p-6 space-y-10">
            <QuickStats 
              stats={stats} 
              onCopyStats={copyStatsToClipboard} 
              showCopySuccess={showStatsCopySuccess}
              readingWpm={readingWpm}
              setReadingWpm={setReadingWpm}
            />
            
            <TextTools text={text} setText={setText} />
            
            <CaseConverter text={text} setText={setText} />
            
            <AdvancedStats stats={stats} />
            
            <SeoTools stats={stats} />

            <article className="pt-6 border-t border-[#111111]/10 dark:border-white/10">
              <h3 className="text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <Info className="w-3 h-3" /> Tool Insights
              </h3>
              <p className="text-[10px] leading-relaxed opacity-40 italic">
                WordMetrics uses optimized parsing algorithms to ensure real-time performance. Reading time is based on a standard 200 WPM speed. Flesch Reading Ease is calculated using syllable-to-word and word-to-sentence ratios.
              </p>
            </article>

            <SeoContent />

            <footer className="pt-4 pb-8 text-center text-[8px] font-bold uppercase tracking-[0.2em] opacity-20">
              <p>© {new Date().getFullYear()} WordMetrics</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
