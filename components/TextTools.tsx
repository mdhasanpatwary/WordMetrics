import React, { useState } from 'react';
import { Space, WrapText, RefreshCw, ArrowDownAZ, ArrowUpAZ, Repeat, Download, FileText, Check } from 'lucide-react';
import * as TextToolsUtils from '../utils/textTools';

interface TextToolsProps {
  text: string;
  setText: (text: string) => void;
}

const TextTools: React.FC<TextToolsProps> = ({ text, setText }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = (id: string, action: () => void) => {
    action();
    setActiveAction(id);
    setTimeout(() => setActiveAction(null), 2000);
  };

  const exportToTxt = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wordmetrics-${new Date().getTime()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setActiveAction('export-txt');
    setTimeout(() => setActiveAction(null), 2000);
  };

  const exportToPdf = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>WordMetrics Export</title></head>
          <body style="font-family: sans-serif; padding: 40px; line-height: 1.6;">
            <div style="font-size: 8px; opacity: 0.5; margin-bottom: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em;">Exported from WordMetrics</div>
            <pre style="white-space: pre-wrap; font-family: inherit; font-size: 11px;">${text}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    setActiveAction('export-pdf');
    setTimeout(() => setActiveAction(null), 2000);
  };

  const tools = [
    { label: 'Remove Extra Spaces', id: 'spaces', icon: Space, action: () => setText(TextToolsUtils.removeExtraSpaces(text)) },
    { label: 'Remove Line Breaks', id: 'lines', icon: WrapText, action: () => setText(TextToolsUtils.removeLineBreaks(text)) },
    { label: 'Remove Duplicates', id: 'dups', icon: RefreshCw, action: () => setText(TextToolsUtils.removeDuplicateLines(text)) },
    { label: 'Sort A → Z', id: 'sort-asc', icon: ArrowDownAZ, action: () => setText(TextToolsUtils.sortLines(text, 'asc')) },
    { label: 'Sort Z → A', id: 'sort-desc', icon: ArrowUpAZ, action: () => setText(TextToolsUtils.sortLines(text, 'desc')) },
    { label: 'Reverse Text', id: 'reverse', icon: Repeat, action: () => setText(TextToolsUtils.reverseText(text)) },
  ];

  return (
    <div>
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">3. Text Tools</h2>
      <div className="grid grid-cols-2 gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleAction(tool.id, tool.action)}
            disabled={!text}
            className={`flex flex-col items-center justify-center p-3 border transition-all text-[8px] font-bold uppercase tracking-widest rounded-none disabled:opacity-20 ${
              activeAction === tool.id 
                ? 'bg-green-600 border-green-600 text-white' 
                : 'border-[#111111] dark:border-white bg-white dark:bg-[#111111] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111]'
            }`}
            aria-label={`Execute tool: ${tool.label}`}
          >
            {activeAction === tool.id ? <Check className="w-3 h-3 mb-2" aria-hidden="true" /> : <tool.icon className="w-3 h-3 mb-2" aria-hidden="true" />}
            {activeAction === tool.id ? 'Applied!' : tool.label}
          </button>
        ))}
        
        <button
          onClick={exportToTxt}
          disabled={!text}
          className={`flex flex-col items-center justify-center p-3 border transition-all text-[8px] font-bold uppercase tracking-widest rounded-none disabled:opacity-20 ${
            activeAction === 'export-txt' 
              ? 'bg-green-600 border-green-600 text-white' 
              : 'border-[#111111] dark:border-white bg-white dark:bg-[#111111] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111]'
          }`}
          aria-label="Export current text to a .txt file"
        >
          {activeAction === 'export-txt' ? <Check className="w-3 h-3 mb-2" aria-hidden="true" /> : <Download className="w-3 h-3 mb-2" aria-hidden="true" />}
          TXT Export
        </button>

        <button
          onClick={exportToPdf}
          disabled={!text}
          className={`flex flex-col items-center justify-center p-3 border transition-all text-[8px] font-bold uppercase tracking-widest rounded-none disabled:opacity-20 ${
            activeAction === 'export-pdf' 
              ? 'bg-green-600 border-green-600 text-white' 
              : 'border-[#111111] dark:border-white bg-white dark:bg-[#111111] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111]'
          }`}
          aria-label="Export current text to a PDF document"
        >
          {activeAction === 'export-pdf' ? <Check className="w-3 h-3 mb-2" aria-hidden="true" /> : <FileText className="w-3 h-3 mb-2" aria-hidden="true" />}
          PDF Export
        </button>
      </div>
    </div>
  );
};

export default TextTools;
