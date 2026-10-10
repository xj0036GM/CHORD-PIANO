import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Hand, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { MusicalKey, HandPracticeMode, KeyOption, ChordVoicing } from '../types/music';
import { KEY_OPTIONS } from '../data/musicData';

interface TrainingControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  selectedKey: MusicalKey;
  onKeyChange: (key: MusicalKey) => void;
  practiceMode: HandPracticeMode;
  onPracticeModeChange: (mode: HandPracticeMode) => void;
  metronomeEnabled: boolean;
  onToggleMetronome: (enabled: boolean) => void;
  drumEnabled: boolean;
  onToggleDrum: (enabled: boolean) => void;
  currentVoicing: ChordVoicing | null;
  nextVoicing: ChordVoicing | null;
  currentBar: number;
  totalBars: number;
  onQuickSmartPair: () => void;
}

export const TrainingControls: React.FC<TrainingControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  bpm,
  onBpmChange,
  selectedKey,
  onKeyChange,
  practiceMode,
  onPracticeModeChange,
  metronomeEnabled,
  onToggleMetronome,
  drumEnabled,
  onToggleDrum,
  currentVoicing,
  nextVoicing,
  currentBar,
  totalBars,
  onQuickSmartPair,
}) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Top Bar: Playback Master Controls & Anticipation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pb-4 border-b border-slate-800">
        {/* Play / Reset / Bar Info (5 Cols) */}
        <div className="lg:col-span-5 flex flex-wrap items-center gap-3">
          <button
            onClick={onTogglePlay}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>暂停练习</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>启动节拍伴奏 (Space)</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
            title="重置到第一小节"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
            <span className="text-slate-400">小节进度:</span>
            <span className="font-mono font-bold text-sky-400 text-sm">
              {currentBar + 1} / {totalBars}
            </span>
          </div>

          <button
            onClick={onQuickSmartPair}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-700/60 text-amber-300 hover:bg-amber-900/50 text-xs font-medium cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>智能配对</span>
          </button>
        </div>

        {/* Anticipation / Muscle Memory Prompt Card (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-3">
          {/* Current Chord */}
          <div className="flex-1 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-950/80 border border-sky-700/80 flex items-center justify-center font-bold text-sky-300 text-sm font-mono shrink-0">
              {currentVoicing?.roman || 'I'}
            </div>
            <div>
              <div className="text-[10px] text-slate-400">当前正在弹奏</div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{currentVoicing?.name || 'C'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-900/60 text-sky-300 font-normal">
                  {currentVoicing?.inversionName}
                </span>
              </div>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-600 shrink-0" />

          {/* Anticipated Next Chord (Muscle Memory Trainer) */}
          <div className="flex-1 flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-700/80 flex items-center justify-center font-bold text-amber-300 text-sm font-mono shrink-0">
              {nextVoicing?.roman || 'V'}
            </div>
            <div>
              <div className="text-[10px] text-amber-400/90 font-medium">★ 下一和弦肌肉预备</div>
              <div className="text-sm font-bold text-amber-200 flex items-center gap-2">
                <span>{nextVoicing?.name || 'G'}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  提前0.5拍脑手就位
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Detailed Parameters (Tempo 30-240, Key, Hands, Metronome) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
        {/* 1. Tempo Control (30 BPM to 240 BPM) */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              节拍速度 (BPM)
            </span>
            <div className="flex items-center gap-1 font-mono">
              <span className="text-base font-bold text-emerald-400 tabular-nums">{bpm}</span>
              <span className="text-slate-500 text-[10px]">BPM</span>
            </div>
          </div>
          <input
            type="range"
            min={30}
            max={240}
            step={1}
            value={bpm}
            onChange={(e) => onBpmChange(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <button
              onClick={() => onBpmChange(30)}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              30 (下限慢练)
            </button>
            <button
              onClick={() => onBpmChange(68)}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              68 (抒情)
            </button>
            <button
              onClick={() => onBpmChange(85)}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              85 (中板)
            </button>
            <button
              onClick={() => onBpmChange(112)}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              112 (摇滚)
            </button>
          </div>
        </div>

        {/* 2. Key / Tonality Selection */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-300 font-medium">常用调号 (Key)</span>
            <span className="text-[11px] text-sky-400 font-mono font-bold">{selectedKey} 调</span>
          </div>
          <select
            value={selectedKey}
            onChange={(e) => onKeyChange(e.target.value as MusicalKey)}
            className="w-full bg-slate-900 border border-slate-750 text-slate-200 text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer"
          >
            {KEY_OPTIONS.map((opt: KeyOption) => (
              <option key={opt.key} value={opt.key}>
                {opt.name} ({opt.accidentals})
              </option>
            ))}
          </select>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            {KEY_OPTIONS.find((k) => k.key === selectedKey)?.accidentals} · 一键平滑移调
          </div>
        </div>

        {/* 3. Hands Separation Mode */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Hand className="w-3.5 h-3.5 text-amber-400" />
              双手拆解练习
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-900 rounded-md border border-slate-800">
            <button
              onClick={() => onPracticeModeChange('both')}
              className={`py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                practiceMode === 'both'
                  ? 'bg-slate-800 text-emerald-300 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              双手同练
            </button>
            <button
              onClick={() => onPracticeModeChange('left')}
              className={`py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                practiceMode === 'left'
                  ? 'bg-sky-950 text-sky-300 font-bold border border-sky-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              仅练左手
            </button>
            <button
              onClick={() => onPracticeModeChange('right')}
              className={`py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                practiceMode === 'right'
                  ? 'bg-amber-950 text-amber-300 font-bold border border-amber-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              仅练右手
            </button>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {practiceMode === 'both' ? '双手协同训练' : practiceMode === 'left' ? '强化低音律动与八度跨度' : '专攻右手转位与切分咬合'}
          </div>
        </div>

        {/* 4. Metronome & Drum Pulse Toggles */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-2.5">
          <div className="text-slate-300 font-medium mb-1.5">辅助节拍声效</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleMetronome(!metronomeEnabled)}
              className={`flex-1 py-1.5 px-2 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                metronomeEnabled
                  ? 'bg-slate-800 border-emerald-500/80 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {metronomeEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>节拍器 {metronomeEnabled ? '开' : '关'}</span>
            </button>

            <button
              onClick={() => onToggleDrum(!drumEnabled)}
              className={`flex-1 py-1.5 px-2 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                drumEnabled
                  ? 'bg-slate-800 border-amber-500/80 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <span>鼓点底鼓 {drumEnabled ? '开' : '关'}</span>
            </button>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            第一拍木鱼高音重击 · 提供精准内时间线
          </div>
        </div>
      </div>
    </div>
  );
};
