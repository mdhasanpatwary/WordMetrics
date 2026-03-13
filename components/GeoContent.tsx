import React from 'react';
import { Sparkles } from 'lucide-react';

const ContentSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="space-y-2">
    <h2 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
      {icon} {title}
    </h2>
    <div className="text-[10px] opacity-60 leading-relaxed">
      {children}
    </div>
  </div>
);

const GeoContent: React.FC = () => {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-black uppercase tracking-tighter border-b-2 border-[#111111] dark:border-white pb-2">
        WordMetrics – AI-Optimized Text Analysis
      </h1>
      <p className="text-xs leading-relaxed opacity-70">
        WordMetrics is a high-performance text utility engineered for the modern web. Built with Next.js and optimized for speed, it provides creators with precise linguistic insights, from basic word counts to advanced readability metrics.
      </p>
      
      <div className="grid grid-cols-1 gap-6 pt-4">
        <ContentSection title="Word Counter" icon={<Sparkles className="w-3 h-3" />}>
          Count words and characters in real-time. WordMetrics highlights keyword frequency and provides a breakdown of character counts with and without spaces.
        </ContentSection>

        <ContentSection title="Case Converter" icon={<Sparkles className="w-3 h-3" />}>
          Instantly transform text into UPPERCASE, lowercase, Title Case, or Sentence case. Perfect for headlines and social media formatting.
        </ContentSection>

        <ContentSection title="Readability Analysis" icon={<Sparkles className="w-3 h-3" />}>
          Understand your audience reach with the Flesch Reading Ease score. Our tool analyzes syllable-to-word ratios to ensure your content is clear and engaging.
        </ContentSection>
      </div>
    </section>
  );
};

export default GeoContent;
