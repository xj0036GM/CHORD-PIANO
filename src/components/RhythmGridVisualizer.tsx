import React from 'react';
import { PopGroove, HandPracticeMode } from '../types/music';

interface RhythmGridVisualizerProps {
  groove: PopGroove;
  currentStepIndex: number; // 0 to subdivisions-1
  isPlaying: boolean;
  practiceMode: HandPracticeMode;
}

export const RhythmGridVisualizer: React.FC<RhythmGridVisualizerProps> = ({
  groove,
  currentStepIndex,
  isPlaying,
  practiceMode,
}) => {
  const steps = groove.steps;
  const totalSteps = groove.subdivisions; // 8 or 16

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Rhythm Info Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block"></span>
            律动十六分/八分拍网格 (Step Sequencer)
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
            流行覆盖率 {groove.coverageRate}%
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <span>拍号: {groove.timeSignature}</span>
          <span>·</span>
          <span>细分: {groove.subdivisions === 16 ? '16分音符高精度' : '8分音符稳健'}</span>
          <span>·</span>
          <span className="text-amber-400">★ 标识为流行经典切分点</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          {/* Beat Markers (1, 2, 3, 4) */}
          <div className="grid grid-cols-4 gap-1.5 mb-1.5 text-center text-xs font-mono font-semibold">
            {[1, 2, 3, 4].map((beat) => (
              <div
                key={`beat-header-${beat}`}
                className={`py-1 rounded border text-xs flex items-center justify-center gap-1.5 ${
                  isPlaying && Math.floor(currentStepIndex / (totalSteps / 4)) + 1 === beat
                    ? 'bg-emerald-900/40 border-emerald-500/80 text-emerald-300 font-bold'
                    : 'bg-slate-800/40 border-slate-800 text-slate-400'
                }`}
              >
                <span>第 {beat} 拍</span>
                {beat === 1 && <span className="text-[10px] text-emerald-400 font-normal">强拍</span>}
                {beat === 2 && <span className="text-[10px] text-amber-400/90 font-normal">切分核心</span>}
                {beat === 3 && <span className="text-[10px] text-slate-400 font-normal">次强拍</span>}
                {beat === 4 && <span className="text-[10px] text-amber-400/90 font-normal">提前进和弦</span>}
              </div>
            ))}
          </div>

          {/* Subdivisions Beat Row */}
          <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
            {steps.map((step, idx) => {
              const isCurrent = isPlaying && currentStepIndex === idx;
              const isQuarterBeat = step.sub === 0;

              return (
                <div
                  key={`step-head-${idx}`}
                  className={`py-0.5 text-center text-[10px] font-mono rounded ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : isQuarterBeat
                      ? 'bg-slate-800 text-slate-200 font-semibold'
                      : 'bg-slate-850 text-slate-500'
                  }`}
                >
                  {isQuarterBeat ? `${step.beat}` : step.sub === 2 && totalSteps === 16 ? '&' : '·'}
                </div>
              );
            })}
          </div>

          {/* Lane 1: Right Hand (RH) Chords */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-[11px] mb-1 px-1">
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                右手声部 (RH · 和弦/切分/琶音)
              </span>
              <span className="text-slate-500 text-[10px]">
                {practiceMode === 'left' ? '当前已静音 (纯左手练习)' : '活跃'}
              </span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
              {steps.map((step, idx) => {
                const isCurrent = isPlaying && currentStepIndex === idx;
                const hasRh = step.rh !== 'none';
                const isSync = step.syncopated;
                const isAccent = step.accent;

                return (
                  <div
                    key={`rh-step-${idx}`}
                    className={`h-14 rounded border flex flex-col items-center justify-center p-0.5 transition-all duration-75 relative ${
                      isCurrent && hasRh
                        ? 'bg-gradient-to-t from-amber-500 to-amber-300 border-white text-slate-950 font-bold shadow-lg shadow-amber-500/40 scale-105 z-10'
                        : isCurrent
                        ? 'bg-slate-800 border-emerald-400 text-slate-300'
                        : hasRh
                        ? isSync
                          ? 'bg-amber-950/60 border-amber-500/80 text-amber-300 ring-1 ring-amber-500/40'
                          : isAccent
                          ? 'bg-amber-900/40 border-amber-600/70 text-amber-200'
                          : 'bg-amber-950/30 border-amber-800/40 text-amber-300/80'
                        : 'bg-slate-900/80 border-slate-800/60 text-slate-600'
                    }`}
                  >
                    {isSync && (
                      <span className="absolute -top-1.5 -right-1 text-[9px] text-amber-400 font-bold">★</span>
                    )}
                    <span className="text-[10px] font-semibold text-center leading-tight">
                      {step.rh === 'chord'
                        ? '柱式'
                        : step.rh === 'chord_soft'
                        ? '轻弹'
                        : step.rh === 'arpeggio_high'
                        ? '高琶音'
                        : step.rh === 'arpeggio_mid'
                        ? '中琶音'
                        : step.rh === 'arpeggio_low'
                        ? '低琶音'
                        : '—'}
                    </span>
                    {step.annotation && (
                      <span className="text-[8px] text-slate-400/90 truncate max-w-full scale-90">
                        {step.annotation}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lane 2: Left Hand (LH) Bass */}
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1 px-1">
              <span className="text-sky-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                左手声部 (LH · 低音根音/五度/八度)
              </span>
              <span className="text-slate-500 text-[10px]">
                {practiceMode === 'right' ? '当前已静音 (纯右手练习)' : '活跃'}
              </span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
              {steps.map((step, idx) => {
                const isCurrent = isPlaying && currentStepIndex === idx;
                const hasLh = step.lh !== 'none';

                return (
                  <div
                    key={`lh-step-${idx}`}
                    className={`h-12 rounded border flex flex-col items-center justify-center p-0.5 transition-all duration-75 relative ${
                      isCurrent && hasLh
                        ? 'bg-gradient-to-t from-sky-500 to-sky-300 border-white text-slate-950 font-bold shadow-lg shadow-sky-500/40 scale-105 z-10'
                        : isCurrent
                        ? 'bg-slate-800 border-emerald-400 text-slate-300'
                        : hasLh
                        ? 'bg-sky-950/60 border-sky-600/70 text-sky-200'
                        : 'bg-slate-900/80 border-slate-800/60 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-center">
                      {step.lh === 'root'
                        ? '根音'
                        : step.lh === 'octave'
                        ? '八度'
                        : step.lh === 'fifth'
                        ? '五音'
                        : '—'}
                    </span>
                    {hasLh && (
                      <span className="text-[8px] text-sky-400/80 font-mono">
                        {step.lh === 'root' ? '小指5' : step.lh === 'octave' ? '拇指1' : '食指2'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
