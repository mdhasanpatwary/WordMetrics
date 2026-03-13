import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
        <HelpCircle className="w-3 h-3" /> Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold">How to improve my Flesch Reading Ease score?</h3>
          <p className="text-[10px] leading-relaxed opacity-60">
            To achieve a higher (easier) score, use shorter sentences and simpler words. Aim for 2 syllables or fewer per word and 15-20 words per sentence.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold">What is a good keyword density?</h3>
          <p className="text-[10px] leading-relaxed opacity-60">
            For SEO, target a keyword density between 1-2%. WordMetrics helps you track this by filtering out stop words and showing your most frequent terms.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold">Does WordMetrics save my text?</h3>
          <p className="text-[10px] leading-relaxed opacity-60">
            Your data stays local. We use browser localStorage to keep your work between refreshes, ensuring your privacy remains a priority.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold">How to count characters without spaces?</h3>
          <p className="text-[10px] leading-relaxed opacity-60">
            WordMetrics automatically calculates both &quot;Total Characters&quot; and &quot;Characters (No Spaces)&quot; in real-time, helping you meet strict limit requirements for social media or metadata.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
