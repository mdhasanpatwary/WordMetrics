import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Copy, Trash2, Moon, Sun } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Stats calculation
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === '' ? 0 : text.split('\n').length;

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
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearText = () => {
    setText('');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-[#111111]">
      <Head>
        <title>WordMetrics</title>
        <meta name="description" content="Minimalist word counter with sharp edges" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* Main Container: Centered, max width, responsive padding */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col min-h-screen">

        {/* Header: Centered title with theme toggle absolute positioned */}
        <header className="relative mb-16 text-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.png" alt="WordMetrics Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
              <span className="opacity-50">Word</span>Metrics
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="absolute top-1/2 -translate-y-1/2 right-0 p-3 border border-[#111111] dark:border-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </header>

        {/* Text Area: Full width, height ~200px on desktop, auto-resize mobile */}
        <section className="w-full mb-8">
          <textarea
            className="w-full min-h-[200px] md:h-64 p-6 text-xl md:text-2xl bg-transparent border-2 border-[#111111] dark:border-white focus:outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 leading-relaxed font-medium"
            placeholder="START TYPING..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </section>

        {/* Stats Panel: Inline on desktop, block on mobile */}
        <section className="flex flex-col md:flex-row gap-4 md:gap-12 mb-10 border-b-2 border-[#111111]/10 dark:border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-widest opacity-50 text-[#111111] dark:text-white">Words</span>
            <span className="text-3xl font-black">{wordCount}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-widest opacity-50 text-[#111111] dark:text-white">Characters</span>
            <span className="text-3xl font-black">{charCount}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-widest opacity-50 text-[#111111] dark:text-white">Lines</span>
            <span className="text-3xl font-black">{lineCount}</span>
          </div>
        </section>

        {/* Action Buttons: Sharp edges, horizontal alignment */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-10 py-4 bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={clearText}
            disabled={!text}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-10 py-4 border-2 border-[#111111] dark:border-white font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all  disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Footer: Small centered text */}
        <footer className="mt-auto pt-16 pb-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
          <p>© {new Date().getFullYear()} WordMetrics // Built with Precision</p>
        </footer>
      </main>
    </div>
  );
}

