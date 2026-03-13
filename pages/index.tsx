import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Copy, Trash2, Moon, Sun, Check } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Stats calculation
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === '' ? 0 : text.split('\n').length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphCount = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  // Reading time calculation (200 wpm)
  const totalSeconds = (wordCount / 200) * 60;
  const readingTimeMin = Math.floor(totalSeconds / 60);
  const readingTimeSec = Math.floor(totalSeconds % 60);

  // Dark mode initialization - syncing with document class
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

  const clearText = () => {
    setText('');
  };

  const convertToUpperCase = () => {
    setText(text.toUpperCase());
  };

  const convertToLowerCase = () => {
    setText(text.toLowerCase());
  };

  const convertToTitleCase = () => {
    const titleCased = text.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    setText(titleCased);
  };

  const convertToSentenceCase = () => {
    const sentenceCased = text.toLowerCase().replace(/(^\w|\.\s*\w)/g, m => m.toUpperCase());
    setText(sentenceCased);
  };

  const convertToCapitalized = () => {
    const capitalized = text.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
    setText(capitalized);
  };

  const removeExtraSpaces = () => {
    const cleaned = text.trim().replace(/\s+/g, ' ');
    setText(cleaned);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111]" aria-hidden="true" />
    );
  }

  return (

    <div className="h-screen flex flex-col font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-[#111111] bg-white dark:bg-[#111111] overflow-hidden">
      <Head>
        {/* SEO: Basic Meta Tags */}
        <title>WordMetrics – Minimal Word Counter</title>
        <meta name="description" content="A premium, minimalist word counter for writers and editors. Get real-time word, character, and line counts with a sharp, distraction-free interface." />
        <meta name="keywords" content="word counter, character counter, online word count, minimalist editor, text metrics, SEO tool, AEO optimized" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        {/* SEO: Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordmetrics.app/" />
        <meta property="og:title" content="WordMetrics – Minimal Word Counter" />
        <meta property="og:description" content="Analyze your text with precision. A modern, high-contrast word counter designed for speed and clarity." />
        <meta property="og:image" content="/og-image.png" />

        {/* SEO: Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://wordmetrics.app/" />
        <meta property="twitter:title" content="WordMetrics – Minimal Word Counter" />
        <meta property="twitter:description" content="Distraction-free word counting with real-time stats and dark mode support." />
        <meta property="twitter:image" content="/twitter-image.png" />

        {/* AEO/GEO: JSON-LD Structured Data (FAQ) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to count words online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To count words online, simply paste your text into the WordMetrics editor. It provides real-time counts for words, characters, and lines without any page reloads."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is a word counter used for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A word counter is essential for writers, students, and SEO professionals to meet specific length requirements for essays, articles, and meta descriptions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why use WordMetrics?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WordMetrics offers a minimalist, high-contrast design with dark mode, ensuring a focused and modern writing experience while providing accurate text statistics."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Header: Compact, fixed height (~56px) */}
      <header className="h-14 border-b border-[#111111]/10 dark:border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="WordMetrics Precision Logo"
            width={28}
            height={28}
            priority
          />
          <h1 className="text-xl font-black tracking-tighter uppercase italic">
            <span className="opacity-50">Word</span>Metrics
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 border border-[#111111] dark:border-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-colors rounded-none"
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Layout: 2 Columns on Desktop */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* Left Column: Text Input (70%) */}
        <section className="w-full md:w-[70%] flex flex-col p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#111111]/10 dark:border-white/10 overflow-hidden shrink-0">
          <div className="flex-1 flex flex-col">
            <textarea
              className="flex-1 w-full p-6 text-lg md:text-xl bg-transparent border-2 border-[#111111] dark:border-white focus:outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 leading-relaxed font-medium rounded-none resize-none"
              placeholder="START TYPING..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Text to count"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className={`flex-1 text-[10px] sm:text-[12px] flex items-center justify-center gap-2 py-3 font-bold uppercase tracking-widest transition-all rounded-none disabled:opacity-20 disabled:cursor-not-allowed ${showCopySuccess
                ? 'bg-green-600 text-white dark:bg-green-500'
                : 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] hover:opacity-90'
                }`}
              aria-label={showCopySuccess ? "Text copied" : "Copy text to clipboard"}
            >
              {showCopySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {showCopySuccess ? 'Copied!' : 'Copy Content'}
            </button>
            <button
              onClick={clearText}
              disabled={!text}
              className="flex-1 text-[10px] sm:text-[12px] flex items-center justify-center gap-2 py-3 border-2 border-[#111111] dark:border-white font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Clear text editor"
            >
              <Trash2 className="w-4 h-4" />
              Clear Editor
            </button>
          </div>
        </section>

        {/* Right Column: Tools Panel (30%) - Scrollable */}
        <section className="w-full md:w-[30%] flex flex-col overflow-y-auto bg-[#f9f9f9]/50 dark:bg-black/20">
          <div className="p-6 space-y-8">

            {/* 1. Quick Statistics */}
            <div aria-labelledby="section-quick-stats">
              <h2 id="section-quick-stats" className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">1. Quick Statistics</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Words', value: wordCount },
                  { label: 'Characters', value: charCount },
                  { label: 'Char (No Space)', value: charCountNoSpaces },
                  { label: 'Lines', value: lineCount },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col gap-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">{stat.label}</span>
                    <span className="text-xl font-black">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Case Converter */}
            <div aria-labelledby="section-case-converter">
              <h2 id="section-case-converter" className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">2. Case Converter</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'UPPERCASE', action: convertToUpperCase },
                  { label: 'lowercase', action: convertToLowerCase },
                  { label: 'Title Case', action: convertToTitleCase },
                  { label: 'Sentence case', action: convertToSentenceCase },
                  { label: 'Capitalized', action: convertToCapitalized },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    disabled={!text}
                    className="py-2 border border-[#111111] dark:border-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20 disabled:cursor-not-allowed text-center"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Text Tools */}
            <div aria-labelledby="section-tools">
              <h2 id="section-tools" className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">3. Text Tools</h2>
              <button
                onClick={removeExtraSpaces}
                disabled={!text}
                className="w-full py-2 border border-[#111111] dark:border-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Remove Extra Spaces
              </button>
            </div>

            {/* 4. Advanced Statistics */}
            <div aria-labelledby="section-advanced-stats">
              <h2 id="section-advanced-stats" className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">4. Advanced Statistics</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col gap-1">
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Sentences</span>
                  <span className="text-xl font-black">{sentenceCount}</span>
                </div>
                <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col gap-1">
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Paragraphs</span>
                  <span className="text-xl font-black">{paragraphCount}</span>
                </div>
                <div className="col-span-2 p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col gap-1">
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Reading Time</span>
                  <span className="text-xl font-black">{readingTimeMin}m {readingTimeSec}s</span>
                </div>
              </div>
            </div>

            {/* GEO/AEO Content Section: Hidden on mobile tools panel, or just at bottom of scroll */}
            <article className="prose dark:prose-invert max-w-none border-t border-[#111111]/10 dark:border-white/10 pt-8 opacity-60">
              <section className="mb-8">
                <h2 className="text-sm font-black uppercase mb-4">Information</h2>
                <div className="text-[11px] leading-relaxed space-y-4">
                  <p>
                    <strong>WordMetrics</strong> is a dedicated tool for authors and creators.
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Copy editing and character counting</li>
                    <li>Social media verification</li>
                    <li>SEO optimization</li>
                  </ul>
                </div>
              </section>

              <section aria-labelledby="faq-heading-compact">
                <h2 id="faq-heading-compact" className="text-sm font-black uppercase mb-4">FAQ</h2>
                <div className="space-y-4 text-[11px]">
                  <div>
                    <h3 className="font-bold mb-1">How to count words?</h3>
                    <p>Paste text into the WordMetrics editor. Stats update instantly.</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Is it free?</h3>
                    <p>Yes, WordMetrics is a free, web-based tool with maximum privacy.</p>
                  </div>
                </div>
              </section>
            </article>

            {/* Footer */}
            <footer className="pt-8 pb-4 text-center text-[8px] font-bold uppercase tracking-[0.2em] opacity-30">
              <p>© {new Date().getFullYear()} WordMetrics</p>
              <p className="mt-1">Built with Precision</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

