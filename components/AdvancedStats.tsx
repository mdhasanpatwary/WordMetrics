import React from 'react';
import StatsCard from './StatsCard';
import { useValueFlash } from '../hooks/useValueFlash';

interface AdvancedStatsProps {
  stats: {
    avgWordLength: number;
    avgSentenceLength: number;
    longest: string;
    shortest: string;
    paragraphCount: number;
    sentenceCount: number;
    speakingTime: { min: number; sec: number };
    punctuation: {
      commas: number;
      periods: number;
      semicolons: number;
      exclamations: number;
      questions: number;
    };
  };
}

const AdvancedStats: React.FC<AdvancedStatsProps> = ({ stats }) => {
  const isSpeakingTimeFlashing = useValueFlash(stats.speakingTime.min + stats.speakingTime.sec);
  const isPunctuationFlashing = useValueFlash(Object.values(stats.punctuation).reduce((a, b) => a + b, 0));
  const isLongestFlashing = useValueFlash(stats.longest);
  const isShortestFlashing = useValueFlash(stats.shortest);

  return (
    <div>
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">4. Advanced Statistics</h2>
      <div className="grid grid-cols-2 gap-2">
        <StatsCard label="Paragraphs" value={stats.paragraphCount} />
        <StatsCard label="Sentences" value={stats.sentenceCount} />
        <StatsCard label="Speaking Time" value={`${stats.speakingTime.min}m ${stats.speakingTime.sec}s`} />
        <StatsCard label="Avg Word Len" value={stats.avgWordLength} />
        <StatsCard label="Avg Sent Len" value={stats.avgSentenceLength} />
        <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] col-span-2">
          <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-2">Punctuation Analysis</span>
          <div className={`grid grid-cols-5 gap-1 text-center font-black transition-all duration-150 ${isPunctuationFlashing ? 'opacity-30 translate-y-[-1px]' : 'opacity-100 translate-y-0'}`}>
            <div className="flex flex-col">
              <span className="opacity-30 text-[7px] uppercase tracking-tighter">Commas</span>
              <span className="text-sm">{stats.punctuation.commas}</span>
            </div>
            <div className="flex flex-col">
              <span className="opacity-30 text-[7px] uppercase tracking-tighter">Dots</span>
              <span className="text-sm">{stats.punctuation.periods}</span>
            </div>
            <div className="flex flex-col">
              <span className="opacity-30 text-[7px] uppercase tracking-tighter">Semi</span>
              <span className="text-sm">{stats.punctuation.semicolons}</span>
            </div>
            <div className="flex flex-col">
              <span className="opacity-30 text-[7px] uppercase tracking-tighter">Excl</span>
              <span className="text-sm">{stats.punctuation.exclamations}</span>
            </div>
            <div className="flex flex-col">
              <span className="opacity-30 text-[7px] uppercase tracking-tighter">Quest</span>
              <span className="text-sm">{stats.punctuation.questions}</span>
            </div>
          </div>
        </div>
        <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] col-span-2">
          <div className="flex justify-between items-center">
             <div className={`flex flex-col transition-all duration-150 ${isLongestFlashing ? 'opacity-30 translate-y-[-1px]' : 'opacity-100 translate-y-0'}`}>
                <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50">Longest</span>
                <span className="text-[10px] font-black truncate max-w-[80px]">{stats.longest}</span>
             </div>
             <div className={`flex flex-col text-right transition-all duration-150 ${isShortestFlashing ? 'opacity-30 translate-y-[-1px]' : 'opacity-100 translate-y-0'}`}>
                <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50">Shortest</span>
                <span className="text-[10px] font-black truncate max-w-[80px]">{stats.shortest}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStats;
