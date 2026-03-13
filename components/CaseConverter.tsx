import React, { useState } from 'react';
import { Type, Check } from 'lucide-react';
import * as CaseConverterUtils from '../utils/caseConverter';

interface CaseConverterProps {
  text: string;
  setText: (text: string) => void;
}

const CaseConverter: React.FC<CaseConverterProps> = ({ text, setText }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = (id: string, action: () => void) => {
    action();
    setActiveAction(id);
    setTimeout(() => setActiveAction(null), 2000);
  };

  const tools = [
    { id: 'upper', label: 'UPPERCASE', action: () => setText(text.toUpperCase()) },
    { id: 'lower', label: 'lowercase', action: () => setText(text.toLowerCase()) },
    { id: 'title', label: 'Title Case', action: () => setText(CaseConverterUtils.toTitleCase(text)) },
    { id: 'sentence', label: 'Sentence case', action: () => setText(CaseConverterUtils.toSentenceCase(text)) },
    { id: 'capitalize', label: 'Capitalize Words', action: () => setText(CaseConverterUtils.capitalizeWords(text)) },
    { id: 'camel', label: 'camelCase', action: () => setText(CaseConverterUtils.toCamelCase(text)) },
    { id: 'pascal', label: 'PascalCase', action: () => setText(CaseConverterUtils.toPascalCase(text)) },
    { id: 'snake', label: 'snake_case', action: () => setText(CaseConverterUtils.toSnakeCase(text)) },
    { id: 'kebab', label: 'kebab-case', action: () => setText(CaseConverterUtils.toKebabCase(text)) },
    { id: 'toggle', label: 'tOGGLE cASE', action: () => setText(CaseConverterUtils.toToggleCase(text)) },
  ];

  return (
    <div>
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">4. Case Converter</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {tools.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleAction(btn.id, btn.action)}
            disabled={!text}
            className={`flex flex-col items-center justify-center p-3 border transition-all text-[8px] font-bold uppercase tracking-widest rounded-none disabled:opacity-20 ${
              activeAction === btn.id 
                ? 'bg-green-600 border-green-600 text-white' 
                : 'border-[#111111] dark:border-white bg-white dark:bg-[#111111] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111]'
            }`}
            aria-label={`Convert to ${btn.label}`}
          >
            {activeAction === btn.id ? <Check className="w-3 h-3 mb-2" /> : <Type className="w-3 h-3 mb-2" />}
            {activeAction === btn.id ? 'Converted!' : btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CaseConverter;
