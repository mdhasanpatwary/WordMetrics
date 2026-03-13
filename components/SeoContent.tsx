import React from 'react';
import GeoContent from './GeoContent';
import FAQSection from './FAQSection';

const SeoContent: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <GeoContent />
      <FAQSection />
    </div>
  );
};

export default SeoContent;
