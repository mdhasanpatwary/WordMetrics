import React from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import { sanitizeText } from '../utils/textTools';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  showHighlight: boolean;
  setShowHighlight: (show: boolean) => void;
  highlightedContent: React.ReactNode;
  onCopy: () => void;
  onClear: () => void;
  showCopySuccess: boolean;
  isHighlightDisabled: boolean;
  persistenceStatus: string | null;
}

const TextEditor: React.FC<TextEditorProps> = ({
  text,
  setText,
  showHighlight,
  setShowHighlight,
  highlightedContent,
  onCopy,
  onClear,
  showCopySuccess,
  isHighlightDisabled,
  persistenceStatus
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Responsive state detection
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-expand height logic
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Shared mirror properties for pixel-perfect alignment
  const sharedStyles: React.CSSProperties = {
    fontSize: isMobile ? '14px' : '18px',
    lineHeight: 1.4,
    padding: isMobile ? '14px' : '20px',
    fontFamily: '"Inter", "Inter var", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: isMobile ? '400' : '500',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    borderWidth: 0,
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
    transition: 'none',
    WebkitFontSmoothing: 'antialiased',
  };

  return (
    <section className="w-full md:w-[65%] flex-1 md:flex-none flex flex-col p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#111111]/10 dark:border-white/10 overflow-hidden shrink-0 min-h-[50vh]">
      <div className="flex-1 border-2 border-[#111111] dark:border-white bg-white dark:bg-[#111111] relative">
        <div className="absolute inset-0 overflow-auto">
          {/* Inner Wrapper for Geometry Sync */}
          <div className="relative w-full min-h-full">
            {showHighlight && (
              <div
                className="absolute inset-0 pointer-events-none text-transparent z-0 overflow-hidden"
                aria-hidden="true"
                style={sharedStyles}
              >
                {highlightedContent}
              </div>
            )}
            <textarea
              ref={textareaRef}
              className={`w-full bg-transparent focus:outline-none placeholder:text-[#111111]/20 dark:placeholder:text-white/20 rounded-none resize-none relative z-[1] overflow-hidden appearance-none ${showHighlight && !isHighlightDisabled ? 'text-[#111111]/40 dark:text-white/40' : 'text-[#111111] dark:text-white'}`}
              placeholder="START TYPING OR PASTE YOUR TEXT HERE..."
              value={text}
              onChange={(e) => setText(sanitizeText(e.target.value))}
              aria-label="Text editor content"
              style={{ ...sharedStyles, minHeight: '400px', caretColor: 'inherit' }}
            />
          </div>
        </div>

        {/* Floating Highlight Toggle - Fixed at the bottom-right corner */}
        <div className="absolute bottom-0 right-0 z-[10] flex items-center gap-3">
          {isHighlightDisabled && (
            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 bg-white/80 dark:bg-[#111111]/80 px-2 py-1">
              Disabled for Large Text
            </span>
          )}
          <button
            onClick={() => !isHighlightDisabled && setShowHighlight(!showHighlight)}
            disabled={isHighlightDisabled}
            className={`px-3 py-2 text-[8px] font-black uppercase tracking-[0.2em] border-l-2 border-t-2 border-[#111111] dark:border-white transition-all disabled:opacity-30 ${showHighlight && !isHighlightDisabled ? 'bg-yellow-400 text-[#111111] dark:bg-yellow-500' : 'bg-white text-[#111111] dark:bg-[#111111] dark:text-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111]'}`}
            aria-label={showHighlight ? 'Turn off highlights' : 'Turn on keyword highlights'}
          >
            {showHighlight && !isHighlightDisabled ? 'Keywords: Active' : 'Highlight Words'}
          </button>
        </div>
      </div>

      {/* Action Toolbar - Refined Placement */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-end">
          {persistenceStatus && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">
                {persistenceStatus === 'saved' ? 'Draft Saved' : 'Draft Restored'}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCopy}
            disabled={!text}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-none disabled:opacity-20 ${showCopySuccess ? 'bg-green-600 text-white border-2 border-green-600' : 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] border-2 border-[#111111] dark:border-white'
              }`}
            aria-label="Copy all text to clipboard"
          >
            {showCopySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {showCopySuccess ? 'Copied!' : 'Copy Content'}
          </button>
          <button
            onClick={onClear}
            disabled={!text}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-[#111111] dark:border-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-all rounded-none disabled:opacity-20"
            aria-label="Clear all text from editor"
          >
            <Trash2 className="w-4 h-4" />
            Clear Editor
          </button>
        </div>
      </div>
    </section>
  );
};

export default TextEditor;
