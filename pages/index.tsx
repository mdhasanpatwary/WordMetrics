import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111]" aria-hidden="true" />
    );
  }

  return (

    <div className="min-h-screen font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-[#111111]">
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

      {/* Main Container: Centered, max width, responsive padding */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col min-h-screen">

        {/* Header: Centered title with theme toggle absolute positioned */}
        <header className="relative mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image 
              src="/logo.png" 
              alt="WordMetrics Precision Logo" 
              width={40} 
              height={40} 
              className="w-8 h-8 sm:w-10 sm:h-10"
              priority
            />
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
              <span className="opacity-50">Word</span>Metrics
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-3 border border-[#111111] dark:border-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-colors"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />}
          </button>
        </header>

        {/* Text Area: Full width, height ~200px on desktop, auto-resize mobile */}
        <section className="w-full mb-8" aria-labelledby="editor-heading">
          <h2 id="editor-heading" className="sr-only">Text Editor</h2>
          <textarea
            className="w-full min-h-[200px] md:h-64 p-6 text-xl md:text-2xl bg-transparent border-2 border-[#111111] dark:border-white focus:outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 leading-relaxed font-medium"
            placeholder="START TYPING..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Text to count"
          />
        </section>

        {/* Case Converter Controls */}
        <section className="flex flex-wrap gap-2 mb-8" aria-label="Case converter">
          <button
            onClick={convertToUpperCase}
            disabled={!text}
            className="px-4 py-2 border border-[#111111] dark:border-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            UPPERCASE
          </button>
          <button
            onClick={convertToLowerCase}
            disabled={!text}
            className="px-4 py-2 border border-[#111111] dark:border-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            lowercase
          </button>
          <button
            onClick={convertToTitleCase}
            disabled={!text}
            className="px-4 py-2 border border-[#111111] dark:border-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Title Case
          </button>
          <button
            onClick={convertToSentenceCase}
            disabled={!text}
            className="px-4 py-2 border border-[#111111] dark:border-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Sentence case
          </button>
          <button
            onClick={convertToCapitalized}
            disabled={!text}
            className="px-4 py-2 border border-[#111111] dark:border-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Capitalize Words
          </button>
        </section>

        {/* Stats Panel: Inline on desktop, block on mobile */}
        <section className="flex flex-col md:flex-row gap-4 md:gap-12 mb-10 border-b-2 border-[#111111]/10 dark:border-white/10 pb-8" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Live Statistics</h2>
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
        <nav className="flex flex-col sm:flex-row gap-4 mb-20" aria-label="Editor actions">
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-10 py-4 bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Copy text to clipboard"
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
            Copy
          </button>
          <button
            onClick={clearText}
            disabled={!text}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-10 py-4 border-2 border-[#111111] dark:border-white font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all  disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Clear text editor"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Clear
          </button>
        </nav>

        {/* GEO/AEO Content Section: Rich context for AI and Search Engines */}
        <article className="prose dark:prose-invert max-w-none border-t-2 border-[#111111]/5 dark:border-white/5 pt-16">
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 italic underline decoration-4 underline-offset-8">Information & Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-8 opacity-80 text-sm md:text-base leading-relaxed">
              <p>
                <strong>WordMetrics</strong> is a dedicated tool for authors, bloggers, and content creators who require precise text analysis. Whether you are drafting a tweet, a professional email, or a long-form article, our tool ensures your content fits perfectly within your target constraints.
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>Professional copy editing and character counting</li>
                <li>Length verification for social media posts</li>
                <li>SEO meta-description and title tag optimization</li>
                <li>Academic essay word count tracking</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl md:text-2xl font-black uppercase tracking-tight mb-8 italic underline decoration-4 underline-offset-8">Common Questions (FAQ)</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-2">How to count words online?</h3>
                <p className="opacity-70">To count words online, simply copy your text and paste it into the WordMetrics editor. The stats update instantly as you type or paste, showing words, characters, and line counts.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">What is a word counter?</h3>
                <p className="opacity-70">A word counter is a digital tool that analyzes a string of text to provide quantitative metrics. WordMetrics uses precision algorithms to distinguish between words, whitespace, and special characters.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Is WordMetrics free to use?</h3>
                <p className="opacity-70">Yes, WordMetrics is a free, web-based tool. It does not require registration and does not store your private text data on our servers, ensuring maximum privacy for your writing.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Footer: Small centered text */}
        <footer className="mt-auto pt-24 pb-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
          <p>© {new Date().getFullYear()} WordMetrics // Built with Precision</p>
          <p className="mt-2 text-[8px]">Optimized for Human Readers and Generative AI Agents</p>
        </footer>
      </main>
    </div>
  );
}

