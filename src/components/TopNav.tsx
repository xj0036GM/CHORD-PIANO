import React from 'react';
import { Sparkles, Music2 } from 'lucide-react';

interface TopNavProps {
  onOpenSmartPair: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenSmartPair,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark in display face */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-sky-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-950/50">
          <Music2 className="w-4 h-4" />
        </div>
        <a
          href="#app"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('all');
          }}
          className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-sky-300 transition-colors"
        >
          流行键盘伴奏工作站
        </a>
      </div>

      {/* Zone 2: 4-5 concise single-line nav links with hover underlines */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => onNavigate('progressions')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'progressions' ? 'text-sky-400 underline underline-offset-8' : ''
          }`}
        >
          和弦套路库
        </button>
        <button
          onClick={() => onNavigate('rhythms')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'rhythms' ? 'text-sky-400 underline underline-offset-8' : ''
          }`}
        >
          节奏律动库
        </button>
        <button
          onClick={() => onNavigate('keyboard')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'keyboard' ? 'text-sky-400 underline underline-offset-8' : ''
          }`}
        >
          3八度键位
        </button>
        <button
          onClick={() => onNavigate('smart-pairs')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'smart-pairs' ? 'text-sky-400 underline underline-offset-8' : ''
          }`}
        >
          最佳配对方案
        </button>
        <button
          onClick={() => onNavigate('pro-tips')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'pro-tips' ? 'text-sky-400 underline underline-offset-8' : ''
          }`}
        >
          键盘手秘籍
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSmartPair}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-sky-400 hover:from-amber-300 hover:to-sky-300 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>一键智能配对</span>
        </button>
      </div>
    </header>
  );
};
