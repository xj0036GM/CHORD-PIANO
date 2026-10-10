import React, { useState } from 'react';
import { PopGroove } from '../types/music';
import { POP_GROOVES } from '../data/musicData';
import { Sliders, Check, Disc3, Sparkles } from 'lucide-react';

interface RhythmSelectorProps {
  currentGroove: PopGroove;
  onSelectGroove: (groove: PopGroove) => void;
}

export const RhythmSelector: React.FC<RhythmSelectorProps> = ({
  currentGroove,
  onSelectGroove,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredGrooves = POP_GROOVES.filter((g) => {
    if (selectedCategory === 'all') return true;
    return g.category === selectedCategory;
  });

  const categories = ['all', '柱式伴奏', '动力性律动', '核心切分', '分解琶音', '拉丁与Bossa', '副歌爆发'];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Header and Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>流行伴奏核心律动库</span>
            <span className="text-[11px] font-normal text-slate-400">
              (覆盖 95% 以上流行歌曲伴奏 · 柱式/动力/切分/分解)
            </span>
          </h2>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? `全部律动 (${POP_GROOVES.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grooves Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
        {filteredGrooves.map((groove) => {
          const isSelected = groove.id === currentGroove.id;

          return (
            <div
              key={groove.id}
              onClick={() => onSelectGroove(groove)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 relative ${
                isSelected
                  ? 'bg-slate-850 border-emerald-400 shadow-md ring-1 ring-emerald-400/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Top Row: Name, Category, Coverage Rate */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      <span>{groove.name}</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {groove.category}
                    </span>
                    <span>·</span>
                    <span>拍号 {groove.timeSignature}</span>
                    <span>·</span>
                    <span>{groove.subdivisions} 分音符精度</span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[11px] font-bold">
                    流行覆盖率 {groove.coverageRate}%
                  </span>
                </div>
              </div>

              {/* Auditory Feeling (听感) */}
              <div className="text-xs text-slate-300 mb-2">
                <span className="text-sky-400 font-medium mr-1.5">【律动听感】</span>
                <span>{groove.feelDescription}</span>
              </div>

              {/* Representative Songs */}
              <div className="text-xs text-slate-400 mb-2.5">
                <div className="flex items-center gap-1 text-slate-300 font-medium text-[11px] mb-1">
                  <Disc3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>经典应用曲目：</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                  {groove.representativeSongs.map((song, idx) => (
                    <span key={idx} className="bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                      {song}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keyboardist Technique Tip */}
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-emerald-300/90 flex items-start gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-emerald-300">触键要诀：</strong>
                  {groove.keyboardistTip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
