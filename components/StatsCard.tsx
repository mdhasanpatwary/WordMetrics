import React from 'react';
import { useValueFlash } from '../hooks/useValueFlash';

interface StatsCardProps {
  label: string;
  value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => {
  const isFlashing = useValueFlash(value);
  
  return (
    <div className="p-4 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111]">
      <span className="block text-[8px] font-bold uppercase tracking-widest opacity-50 mb-1">{label}</span>
      <span className={`text-xl font-black transition-all duration-150 ${isFlashing ? 'opacity-30 translate-y-[-1px]' : 'opacity-100 translate-y-0'}`}>
        {value}
      </span>
    </div>
  );
};

export default StatsCard;
