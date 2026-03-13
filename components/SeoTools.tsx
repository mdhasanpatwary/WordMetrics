import React from 'react';

interface SeoToolsProps {
  stats: {
    charCount: number;
    keywordDensity: { word: string; count: number; percentage: number }[];
    flesch: { score: number; label: string };
  };
}

const SeoTools: React.FC<SeoToolsProps> = ({ stats }) => {
  const metaLength = stats.charCount;
  const metaStatus = metaLength === 0 ? 'Empty' : metaLength >= 120 && metaLength <= 160 ? 'Good' : 'Needs Adjustment';
  const metaColor = metaStatus === 'Good' ? 'text-green-500' : metaLength > 160 ? 'text-red-500' : 'text-yellow-500';

  return (
    <div>
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">5. SEO Writer Tools</h2>
      <div className="space-y-4">
        {/* Meta Description Length */}
        <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Meta Description Length (120-160)</span>
            <span className={`text-[8px] font-black uppercase ${metaColor}`}>{metaStatus}</span>
          </div>
          <div className="text-xl font-black mb-1">{stats.charCount} / 160</div>
          <div className="w-full bg-[#111111]/10 dark:bg-white/10 h-1">
            <div 
              className={`h-full transition-all ${metaStatus === 'Good' ? 'bg-green-500' : metaStatus === 'Empty' ? 'bg-transparent' : 'bg-red-500'}`} 
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
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-1">Reading Ease</span>
              <span className="text-xl font-black">{stats.flesch.score}</span>
            </div>
            <div className="text-right">
              <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-1">Difficulty</span>
              <span className="text-xl font-black">{stats.flesch.label}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#111111]/5 dark:border-white/5">
            <div className="p-3 border border-[#111111]/5 dark:border-white/5 bg-[#f9f9f9] dark:bg-white/5">
              <span className="block text-[7px] font-bold opacity-40 uppercase tracking-widest mb-1">Target</span>
              <span className="text-[9px] font-black uppercase tracking-tighter">60–70 Score</span>
            </div>
            <div className="p-3 border border-[#111111]/5 dark:border-white/5 bg-[#f9f9f9] dark:bg-white/5">
              <span className="block text-[7px] font-bold opacity-40 uppercase tracking-widest mb-1">Status</span>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${stats.flesch.score >= 60 ? 'text-green-500' : 'text-yellow-500'}`}>
                {stats.flesch.score >= 60 ? 'OPTIMAL' : 'NEED FIX'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoTools;
