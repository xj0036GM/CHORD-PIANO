import React from 'react';
import { X, Sparkles, Check, Flame, Heart, Coffee, Leaf, Zap, HelpCircle } from 'lucide-react';
import { SMART_PAIRINGS, POP_PROGRESSIONS, POP_GROOVES } from '../data/musicData';
import { SmartPairing, PopChordProgression, PopGroove, MusicalKey } from '../types/music';

interface SmartPairModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPairing: (progression: PopChordProgression, groove: PopGroove, bpm: number, key: MusicalKey) => void;
}

export const SmartPairModal: React.FC<SmartPairModalProps> = ({
  isOpen,
  onClose,
  onApplyPairing,
}) => {
  if (!isOpen) return null;

  const handleApply = (pair: SmartPairing) => {
    const prog = POP_PROGRESSIONS.find((p) => p.id === pair.progressionId);
    const groove = POP_GROOVES.find((g) => g.id === pair.grooveId);
    if (prog && groove) {
      onApplyPairing(prog, groove, pair.suggestedBpm, pair.suggestedKey);
      onClose();
    }
  };

  const handleRandomShuffle = () => {
    const randomPair = SMART_PAIRINGS[Math.floor(Math.random() * SMART_PAIRINGS.length)];
    handleApply(randomPair);
  };

  const renderIcon = (type: SmartPairing['iconType']) => {
    switch (type) {
      case 'fire':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'tear':
        return <Heart className="w-4 h-4 text-sky-400" />;
      case 'leaf':
        return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'sparkle':
        return <Zap className="w-4 h-4 text-violet-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">一键智能配对 · 节奏与和弦最佳组合</h2>
              <p className="text-xs text-slate-400">
                算法基于华语与欧美95%经典歌曲和声与律动契合度，为您智能匹配肌肉记忆高效组合
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomShuffle}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>智能随机启发</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Curated Pairings */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {SMART_PAIRINGS.map((pair) => {
              const prog = POP_PROGRESSIONS.find((p) => p.id === pair.progressionId);
              const groove = POP_GROOVES.find((g) => g.id === pair.grooveId);

              return (
                <div
                  key={pair.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-950 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Title, Match Score */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {renderIcon(pair.iconType)}
                        <h3 className="text-sm font-bold text-slate-100">{pair.title}</h3>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {pair.styleTag}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/80">
                        契合度 {pair.matchScore}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3">{pair.description}</p>

                    {/* Breakdown */}
                    <div className="space-y-1.5 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">和弦套路：</span>
                        <span className="font-semibold text-sky-300">{prog?.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">节奏律动：</span>
                        <span className="font-semibold text-emerald-300">{groove?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                        <span>建议调号: {pair.suggestedKey} 调</span>
                        <span>推荐速度: {pair.suggestedBpm} BPM</span>
                      </div>
                    </div>

                    {/* Why it works */}
                    <div className="text-[11px] text-slate-400 flex items-start gap-1.5 mb-3">
                      <HelpCircle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-300">配对机理：</strong>
                        {pair.whyItWorks}
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleApply(pair)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-amber-400"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>一键装载此套最佳组合</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400 flex items-center justify-between">
          <span>提示：装载后自动设定最佳调号、BPM节拍速度并生成双手3个八度实战键位。</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
