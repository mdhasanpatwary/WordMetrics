import React from 'react';
import Image from 'next/image';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
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
  );
};

export default Header;
