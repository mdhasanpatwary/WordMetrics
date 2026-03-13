import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Copy, Trash2, Moon, Sun, Check, ArrowDownAZ, ArrowUpAZ, RefreshCw, Space, WrapText, Scissors, Repeat, Info, Search } from 'lucide-react';
import * as TextUtils from '../lib/text-utils';
import * as TextTransforms from '../lib/text-transforms';

export default function Home() {
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showStatsCopySuccess, setShowStatsCopySuccess] = useState(false);

  const [showHighlight, setShowHighlight] = useState(false);

  // Auto-save logic
  useEffect(() => {
    const savedText = localStorage.getItem('wordmetrics_text');
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('wordmetrics_text', text);
  }, [text]);

  // Dark mode initialization
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Stats calculation (Memoized for performance)
  const stats = useMemo(() => {
    const wordCount = TextUtils.countWords(text);
    const charCount = TextUtils.countCharacters(text);
    const charCountNoSpaces = TextUtils.countCharacters(text, false);
    const lineCount = TextUtils.countLines(text);
    const sentenceCount = TextUtils.countSentences(text);
    const paragraphCount = TextUtils.countParagraphs(text);
    const readingTime = TextUtils.calculateReadingTime(wordCount);
    const avgWordLength = TextUtils.calculateAvgWordLength(text);
    const avgSentenceLength = TextUtils.calculateAvgSentenceLength(text);
    const { longest, shortest } = TextUtils.getLongestAndShortestWord(text);
    const keywordDensity = TextUtils.getKeywordDensity(text);
    const flesch = TextUtils.calculateFleschReadingScore(text);

    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      lineCount,
      sentenceCount,
      paragraphCount,
      readingTime,
      avgWordLength,
      avgSentenceLength,
      longest,
      shortest,
      keywordDensity,
      flesch
    };
  }, [text]);

  // Highlight frequent words (Memoized)
  const highlightedContent = useMemo(() => {
    if (!showHighlight || !text) return text;
    
    const frequentWords = stats.keywordDensity.map(kw => kw.word);
    if (frequentWords.length === 0) return text;

    // Use a regex to match the words (case insensitive, whole word)
    const escapedWords = frequentWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const combinedRegex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');

    const parts = text.split(combinedRegex);
    return parts.map((part, i) => {
      if (frequentWords.includes(part.toLowerCase())) {
        return <mark key={i} className="bg-yellow-200 dark:bg-yellow-800/50 text-inherit px-0.5">{part}</mark>;
      }
      return part;
    });
  }, [text, showHighlight, stats.keywordDensity]);

  const copyToClipboard = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyStatsToClipboard = async () => {
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
Avg Word Length: ${stats.avgWordLength}
Avg Sentence Length: ${stats.avgSentenceLength}
Longest Word: ${stats.longest}
Shortest Word: ${stats.shortest}
Flesch Score: ${stats.flesch.score} (${stats.flesch.label})
    `.trim();
    
    try {
      await navigator.clipboard.writeText(statsText);
      setShowStatsCopySuccess(true);
      setTimeout(() => setShowStatsCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy stats: ', err);
    }
  };

  const clearText = () => setText('');

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-[#111111]" aria-hidden="true" />;
  }

  const metaLength = stats.charCount;
  const metaStatus = metaLength === 0 ? 'Empty' : metaLength < 150 ? 'Too Short' : metaLength <= 160 ? 'Good' : 'Too Long';
  const metaColor = metaStatus === 'Good' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="h-screen flex flex-col font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-[#111111] bg-white dark:bg-[#111111] overflow-hidden">
      <Head>
        <title>WordMetrics – Full-Featured Text Utility</title>
        <meta name="description" content="Advanced text utility tool with real-time statistics, SEO writers tools, and text transformations. Minimalist, fast, and professional." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="h-14 border-b border-[#111111]/10 dark:border-white/10 flex items-center justify-between px-6 shrink-0 z-10 bg-white dark:bg-[#111111]">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="WordMetrics Logo" width={28} height={28} priority />
          <h1 className="text-xl font-black tracking-tighter uppercase italic">
            <span className="opacity-50">Word</span>Metrics
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 border border-[#111111] dark:border-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-colors rounded-none"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Text Input */}
        <section className="w-full md:w-[65%] flex flex-col p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#111111]/10 dark:border-white/10 overflow-hidden shrink-0">
          <div className="flex-1 relative overflow-hidden border-2 border-[#111111] dark:border-white group">
            {showHighlight && (
              <div 
                className="absolute inset-0 p-6 text-lg md:text-xl leading-relaxed font-medium pointer-events-none whitespace-pre-wrap break-words text-transparent"
                aria-hidden="true"
              >
                {highlightedContent}
              </div>
            )}
            <textarea
              className={`w-full h-full p-6 text-lg md:text-xl bg-transparent focus:outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 leading-relaxed font-medium rounded-none resize-none relative z-[1] ${showHighlight ? 'text-[#111111]/40 dark:text-white/40' : 'text-[#111111] dark:text-white'}`}
              placeholder="START TYPING OR PASTE YOUR TEXT HERE..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Text editor"
            />
            <button
              onClick={() => setShowHighlight(!showHighlight)}
              className={`absolute top-4 right-4 z-[2] p-2 text-[8px] font-black uppercase tracking-widest border border-[#111111] dark:border-white transition-all ${showHighlight ? 'bg-yellow-400 text-[#111111] dark:bg-yellow-500' : 'bg-white text-[#111111] dark:bg-[#111111] dark:text-white'}`}
            >
              {showHighlight ? 'Highlights On' : 'Highlight Words'}
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-none disabled:opacity-20 ${
                showCopySuccess ? 'bg-green-600 text-white' : 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]'
              }`}
            >
              {showCopySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {showCopySuccess ? 'Copied!' : 'Copy Content'}
            </button>
            <button
              onClick={clearText}
              disabled={!text}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-[#111111] dark:border-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20"
            >
              <Trash2 className="w-4 h-4" />
              Clear Editor
            </button>
          </div>
        </section>

        {/* Right Column: Tools Sidebar */}
        <section className="w-full md:w-[35%] flex flex-col overflow-y-auto bg-[#f9f9f9]/50 dark:bg-black/20 pb-10">
          <div className="p-6 space-y-10">
            {/* 1. Quick Statistics */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">1. Quick Statistics</h2>
                <button 
                  onClick={copyStatsToClipboard}
                  className="text-[9px] font-bold uppercase tracking-wider underline hover:opacity-50 transition-opacity"
                >
                  {showStatsCopySuccess ? 'Stats Copied!' : 'Copy Stats'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Words', value: stats.wordCount },
                  { label: 'Characters', value: stats.charCount },
                  { label: 'Chars (No Space)', value: stats.charCountNoSpaces },
                  { label: 'Lines', value: stats.lineCount },
                  { label: 'Sentences', value: stats.sentenceCount },
                  { label: 'Paragraphs', value: stats.paragraphCount },
                  { label: 'Reading Time', value: `${stats.readingTime.min}m ${stats.readingTime.sec}s` },
                ].map((s) => (
                  <div key={s.label} className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
                    <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-1">{s.label}</span>
                    <span className="text-xl font-black">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Text Tools */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">2. Text Tools</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Remove Extra Spaces', icon: Space, action: () => setText(TextTransforms.removeExtraSpaces(text)) },
                  { label: 'Remove Line Breaks', icon: WrapText, action: () => setText(TextTransforms.removeLineBreaks(text)) },
                  { label: 'Remove Duplicates', icon: RefreshCw, action: () => setText(TextTransforms.removeDuplicateLines(text)) },
                  { label: 'Sort A → Z', icon: ArrowDownAZ, action: () => setText(TextTransforms.sortLines(text, 'asc')) },
                  { label: 'Sort Z → A', icon: ArrowUpAZ, action: () => setText(TextTransforms.sortLines(text, 'desc')) },
                  { label: 'Reverse Text', icon: Repeat, action: () => setText(TextTransforms.reverseText(text)) },
                ].map((tool) => (
                  <button
                    key={tool.label}
                    onClick={tool.action}
                    disabled={!text}
                    className="flex flex-col items-center justify-center p-3 border border-[#111111] dark:border-white text-[8px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20"
                  >
                    <tool.icon className="w-3 h-3 mb-2" />
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Case Converter */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">3. Case Converter</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'UPPERCASE', action: () => setText(text.toUpperCase()) },
                  { label: 'lowercase', action: () => setText(text.toLowerCase()) },
                  { label: 'Title Case', action: () => setText(TextTransforms.toTitleCase(text)) },
                  { label: 'Sentence case', action: () => setText(TextTransforms.toSentenceCase(text)) },
                  { label: 'Capitalize Words', action: () => setText(TextTransforms.capitalizeWords(text)) },
                  { label: 'Toggle Case', action: () => setText(TextTransforms.toToggleCase(text)) },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    disabled={!text}
                    className="py-3 border border-[#111111] dark:border-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Advanced Statistics */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">4. Advanced Statistics</h2>
              <div className="space-y-2">
                {[
                  { label: 'Average Word Length', value: stats.avgWordLength },
                  { label: 'Average Sentence Length', value: stats.avgSentenceLength },
                  { label: 'Longest Word', value: stats.longest },
                  { label: 'Shortest Word', value: stats.shortest },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">{s.label}</span>
                    <span className="text-sm font-black">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. SEO Writer Tools */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">5. SEO Writer Tools</h2>
              <div className="space-y-4">
                {/* Meta Description Length */}
                <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Meta Description Length</span>
                    <span className={`text-[8px] font-black uppercase ${metaColor}`}>{metaStatus}</span>
                  </div>
                  <div className="text-xl font-black mb-1">{stats.charCount} / 160</div>
                  <div className="w-full bg-[#111111]/10 dark:bg-white/10 h-1">
                    <div 
                      className={`h-full transition-all ${metaStatus === 'Good' ? 'bg-green-500' : 'bg-[#111111] dark:bg-white'}`} 
                      style={{ width: `${Math.min(100, (stats.charCount / 160) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Keyword Density */}
                <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
                  <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-3">Top Keyword Density</span>
                  <div className="space-y-2">
                    {stats.keywordDensity.length > 0 ? stats.keywordDensity.map((kw) => (
                      <div key={kw.word} className="flex justify-between items-center text-[10px]">
                        <span className="font-bold uppercase tracking-tight">{kw.word}</span>
                        <span className="font-black opacity-60">{kw.count} ({kw.percentage}%)</span>
                      </div>
                    )) : <span className="text-[10px] opacity-30 italic">Not enough data...</span>}
                  </div>
                </div>

                {/* Reading Level */}
                <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-1">Reading Ease</span>
                      <span className="text-xl font-black">{stats.flesch.score}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-1">Difficulty</span>
                      <span className="text-xl font-black">{stats.flesch.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Footer */}
            <article className="pt-6 border-t border-[#111111]/10 dark:border-white/10">
              <h3 className="text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <Info className="w-3 h-3" /> Tool Insights
              </h3>
              <p className="text-[10px] leading-relaxed opacity-40 italic">
                WordMetrics uses optimized parsing algorithms to ensure real-time performance. Reading time is based on a standard 200 WPM speed. Flesch Reading Ease is calculated using syllable-to-word and word-to-sentence ratios.
              </p>
            </article>

            <footer className="pt-4 pb-8 text-center text-[8px] font-bold uppercase tracking-[0.2em] opacity-20">
              <p>© {new Date().getFullYear()} WordMetrics</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

