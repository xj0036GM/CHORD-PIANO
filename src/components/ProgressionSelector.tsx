import React, { useState } from 'react';
import { PopChordProgression, MusicalKey } from '../types/music';
import { POP_PROGRESSIONS, calculateChordVoicing } from '../data/musicData';
import { Music, Check, Disc3, Sparkles } from 'lucide-react';

interface ProgressionSelectorProps {
  currentProgression: PopChordProgression;
  onSelectProgression: (prog: PopChordProgression) => void;
  selectedKey: MusicalKey;
}

export const ProgressionSelector: React.FC<ProgressionSelectorProps> = ({
  currentProgression,
  onSelectProgression,
  selectedKey,
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const filteredProgressions = POP_PROGRESSIONS.filter((prog) => {
    if (filterTag === 'all') return true;
    if (filterTag === 'tear' && (prog.id === 'prog-4536251' || prog.id === 'prog-canon' || prog.id === 'prog-descending-bass')) return true;
    if (filterTag === 'energy' && (prog.id === 'prog-6415' || prog.id === 'prog-4566' || prog.id === 'prog-4516')) return true;
    if (filterTag === 'classic' && (prog.id === 'prog-1645' || prog.id === 'prog-1451' || prog.id === 'prog-4321')) return true;
    if (filterTag === 'rnb' && (prog.id === 'prog-2514' || prog.id === 'prog-4536251')) return true;
    return true;
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Music className="w-4 h-4 text-sky-400" />
            <span>流行音乐和弦套路库</span>
            <span className="text-[11px] font-normal text-slate-400">
              (覆盖 95% 以上华语与欧美金曲 · 肌肉记忆高频模板)
            </span>
          </h2>
        </div>

        {/* Filter Controls (Segmented buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800/80 text-xs">
          <button
            onClick={() => setFilterTag('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              filterTag === 'all'
                ? 'bg-slate-800 text-sky-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            全部套路 ({POP_PROGRESSIONS.length})
          </button>
          <button
            onClick={() => setFilterTag('tear')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              filterTag === 'tear'
                ? 'bg-slate-800 text-sky-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            催泪抒情
          </button>
          <button
            onClick={() => setFilterTag('energy')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              filterTag === 'energy'
                ? 'bg-slate-800 text-sky-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            高燃与副歌
          </button>
          <button
            onClick={() => setFilterTag('classic')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              filterTag === 'classic'
                ? 'bg-slate-800 text-sky-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            纯真复古
          </button>
          <button
            onClick={() => setFilterTag('rnb')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              filterTag === 'rnb'
                ? 'bg-slate-800 text-sky-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            都市R&B
          </button>
        </div>
      </div>

      {/* Progression Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
        {filteredProgressions.map((prog) => {
          const isSelected = prog.id === currentProgression.id;

          // Compute chord names in selected key
          const chordNamesInKey = prog.chordsTemplate.map((tpl) => {
            const voicing = calculateChordVoicing(selectedKey, tpl);
            return voicing.name;
          });

          return (
            <div
              key={prog.id}
              onClick={() => onSelectProgression(prog)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 relative ${
                isSelected
                  ? 'bg-slate-850 border-sky-400 shadow-md ring-1 ring-sky-400/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Top Row: Name, Roman Degree, Coverage Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                      <span>{prog.name}</span>
                    </h3>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{prog.subtitle}</div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono text-[11px] font-bold">
                    流行覆盖率 {prog.coverageRate}%
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 font-mono">
                    推荐 {prog.defaultBpm} BPM
                  </span>
                </div>
              </div>

              {/* Roman Formula & Real Chords in current key */}
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 mb-2.5">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold text-amber-300 mb-1">
                  <span className="text-slate-400 font-normal text-[10px] mr-1">级数走向:</span>
                  {prog.roman.map((r, i) => (
                    <React.Fragment key={`roman-${i}`}>
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300">
                        {r}
                      </span>
                      {i < prog.roman.length - 1 && <span className="text-slate-600">→</span>}
                    </React.Fragment>
                  ))}
                </div>

                {/* Transposed chord names in active Key */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-sky-300">
                  <span className="text-slate-400 font-normal text-[10px] mr-1">{selectedKey}调和弦:</span>
                  {chordNamesInKey.map((name, i) => (
                    <React.Fragment key={`chord-${i}`}>
                      <span className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-800/60 text-sky-200">
                        {name}
                      </span>
                      {i < chordNamesInKey.length - 1 && <span className="text-slate-600">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Auditory Feeling (听感) */}
              <div className="text-xs text-slate-300 mb-2">
                <span className="text-emerald-400 font-medium mr-1.5">【听感画像】</span>
                <span>{prog.soundFeel}</span>
              </div>

              {/* Representative Songs (代表作) */}
              <div className="text-xs text-slate-400 mb-2.5">
                <div className="flex items-center gap-1 text-slate-300 font-medium text-[11px] mb-1">
                  <Disc3 className="w-3.5 h-3.5 text-rose-400" />
                  <span>代表作 (肌肉记忆联想)：</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                  {prog.representativeSongs.map((song, idx) => (
                    <span key={idx} className="bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                      {song}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keyboardist Tip */}
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-300">键盘手秘诀：</strong>
                  {prog.keyboardistTip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
