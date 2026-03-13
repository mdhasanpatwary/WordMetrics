import React from 'react';
import StatsCard from './StatsCard';
import { Copy, Check } from 'lucide-react';
import { useValueFlash } from '../hooks/useValueFlash';

interface QuickStatsProps {
  stats: {
    wordCount: number;
    charCount: number;
    charCountNoSpaces: number;
    lineCount: number;
    readingTime: { min: number; sec: number };
  };
  onCopyStats: () => void;
  showCopySuccess: boolean;
  readingWpm: number;
  setReadingWpm: (wpm: number) => void;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats, onCopyStats, showCopySuccess, readingWpm, setReadingWpm }) => {
  const [wordGoal, setWordGoal] = React.useState(500);
  const progress = Math.min(100, (stats.wordCount / (wordGoal || 1)) * 100);
  const isReadingTimeFlashing = useValueFlash(stats.readingTime.min + stats.readingTime.sec);

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">1. Quick Statistics</h2>
        <button 
          onClick={onCopyStats}
          className="text-[9px] font-bold uppercase tracking-wider underline hover:opacity-50 transition-opacity flex items-center gap-1"
          aria-label="Copy statistics to clipboard"
        >
          {showCopySuccess ? 'Stats Copied!' : 'Copy Stats'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatsCard label="Words" value={stats.wordCount} />
        <StatsCard label="Lines" value={stats.lineCount} />
        <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
          <div className="flex justify-between items-center mb-1">
            <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50">Reading Time</span>
            <select 
              className="bg-transparent text-[7px] font-black uppercase focus:outline-none opacity-40 hover:opacity-100 cursor-pointer"
              aria-label="Change reading speed"
              value={readingWpm}
              onChange={(e) => setReadingWpm(parseInt(e.target.value))}
            >
              <option value="200" className="dark:bg-[#111111]">Avg (200)</option>
              <option value="150" className="dark:bg-[#111111]">Slow (150)</option>
              <option value="250" className="dark:bg-[#111111]">Fast (250)</option>
            </select>
          </div>
          <div className={`text-xl font-black leading-none transition-all duration-150 ${isReadingTimeFlashing ? 'opacity-30 translate-y-[-1px]' : 'opacity-100 translate-y-0'}`}>
            {stats.readingTime.min}m {stats.readingTime.sec}s
          </div>
        </div>
      </div>

      {/* Word Count Goal */}
      <div className="mt-4 p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Word Count Goal</span>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={wordGoal} 
              onChange={(e) => setWordGoal(parseInt(e.target.value) || 0)}
              className="w-10 bg-transparent border-b border-[#111111]/20 dark:border-white/20 text-[10px] font-black focus:outline-none text-right"
              aria-label="Set word count goal"
            />
            <span className="text-[9px] font-black opacity-30">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="w-full bg-[#111111]/10 dark:bg-white/10 h-1">
          <div 
            className="h-full bg-[#111111] dark:bg-white transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
