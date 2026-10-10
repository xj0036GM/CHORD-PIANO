import React from 'react';
import { generatePianoKeys, isBlackKey } from '../data/musicData';
import { ChordVoicing, HandPracticeMode } from '../types/music';
import { soundEngine } from '../audio/soundEngine';

interface PianoKeyboardProps {
  currentVoicing: ChordVoicing | null;
  activeMidiNotes: number[];
  practiceMode: HandPracticeMode;
  onKeyClick?: (midi: number) => void;
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  currentVoicing,
  activeMidiNotes,
  practiceMode,
  onKeyClick,
}) => {
  const allKeys = generatePianoKeys(); // C2 (36) to C5 (72)

  // Map notes from current voicing based on practice mode
  const activeLhNotes = (practiceMode === 'both' || practiceMode === 'left') && currentVoicing
    ? currentVoicing.lhNotes
    : [];

  const activeRhNotes = (practiceMode === 'both' || practiceMode === 'right') && currentVoicing
    ? currentVoicing.rhNotes
    : [];

  const handleKeyClick = (midi: number) => {
    soundEngine.playPianoNote(midi, 0.85, 1.4);
    if (onKeyClick) {
      onKeyClick(midi);
    }
  };

  // Separate white keys and black keys for proper positioning
  const whiteKeys = allKeys.filter(k => !k.isBlack);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Header bar above piano */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-400 inline-block"></span>
            3个八度实战键位图 (C2 - C5)
          </span>
          <span className="text-slate-500 hidden sm:inline">共 37 键 · 流行键盘实战黄金音区</span>
        </div>

        {/* Hand legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500 border border-sky-300 inline-flex items-center justify-center text-[9px] font-bold text-slate-950">
              L
            </span>
            <span className="text-sky-300 font-medium">左手低音 (LH · 根音/八度)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 inline-flex items-center justify-center text-[9px] font-bold text-slate-950">
              R
            </span>
            <span className="text-amber-300 font-medium">右手和弦 (RH · 转位/柱式)</span>
          </div>
        </div>
      </div>

      {/* Octave Guides */}
      <div className="grid grid-cols-3 gap-1 mb-2 text-center text-[11px] font-mono">
        <div className="py-1 px-2 rounded bg-slate-800/60 text-slate-400 border border-slate-750">
          低音区 Octave 2 (C2 ~ B2 · 左手重音根音)
        </div>
        <div className="py-1 px-2 rounded bg-slate-800/60 text-slate-300 border border-slate-750">
          中低过渡区 Octave 3 (C3 ~ B3 · 左手高八度 / 右手低位)
        </div>
        <div className="py-1 px-2 rounded bg-slate-800/60 text-amber-300/80 border border-slate-750">
          中央C和弦区 Octave 4 (C4 ~ C5 · 流行和声黄金织体)
        </div>
      </div>

      {/* The Piano Keys Container */}
      <div className="relative w-full overflow-x-auto pb-1 select-none">
        <div className="relative min-w-[760px] h-48 bg-slate-950 rounded-lg p-2 flex items-start border border-slate-800/80">
          {/* Render White Keys */}
          {whiteKeys.map((wKey) => {
            const isSoundingNow = activeMidiNotes.includes(wKey.midi);
            const lhNote = activeLhNotes.find(n => n.midi === wKey.midi);
            const rhNote = activeRhNotes.find(n => n.midi === wKey.midi);

            return (
              <div
                key={`white-${wKey.midi}`}
                onClick={() => handleKeyClick(wKey.midi)}
                className={`relative flex-1 h-44 rounded-b-md border border-slate-400/30 cursor-pointer transition-all duration-75 flex flex-col justify-end items-center pb-2.5 z-10 ${
                  isSoundingNow
                    ? lhNote
                      ? 'bg-gradient-to-t from-sky-400 via-sky-200 to-white shadow-lg shadow-sky-500/40 translate-y-0.5'
                      : 'bg-gradient-to-t from-amber-400 via-amber-200 to-white shadow-lg shadow-amber-500/40 translate-y-0.5'
                    : lhNote
                    ? 'bg-sky-100/95 border-sky-400 ring-2 ring-sky-400/60'
                    : rhNote
                    ? 'bg-amber-100/95 border-amber-400 ring-2 ring-amber-400/60'
                    : 'bg-slate-100 hover:bg-slate-50 active:bg-slate-200 active:translate-y-0.5'
                }`}
                title={`MIDI ${wKey.midi}: ${wKey.noteName}${wKey.octave}`}
              >
                {/* Hand and Finger Indicators */}
                {lhNote && (
                  <div className="absolute top-16 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md border border-sky-300">
                      {lhNote.finger}
                    </span>
                    <span className="text-[9px] font-semibold text-sky-800 tracking-tight mt-0.5 whitespace-nowrap">
                      左{lhNote.finger}指
                    </span>
                  </div>
                )}

                {rhNote && (
                  <div className="absolute top-16 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md border border-amber-300">
                      {rhNote.finger}
                    </span>
                    <span className="text-[9px] font-semibold text-amber-800 tracking-tight mt-0.5 whitespace-nowrap">
                      右{rhNote.finger}指
                    </span>
                  </div>
                )}

                {/* Key Label at bottom */}
                <div className="text-center pointer-events-none">
                  <span className={`text-[11px] font-bold block ${lhNote ? 'text-sky-900' : rhNote ? 'text-amber-900' : 'text-slate-800'}`}>
                    {wKey.noteName}
                    <sub className="text-[9px] font-normal">{wKey.octave}</sub>
                  </span>
                  {wKey.noteName === 'C' && (
                    <span className="text-[8px] text-slate-500 font-mono block">C{wKey.octave}</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Render Black Keys Absolutely Over White Keys */}
          {allKeys.map((key) => {
            if (!key.isBlack) return null;

            // Calculate horizontal offset based on white key index
            // There are 22 white keys total.
            // Octave 2: C2(0), D2(1), E2(2), F2(3), G2(4), A2(5), B2(6)
            // Octave 3: C3(7), D3(8), E3(9), F3(10), G3(11), A3(12), B3(13)
            // Octave 4: C4(14), D4(15), E4(16), F4(17), G4(18), A4(19), B4(20)
            // Octave 5: C5(21)
            const whiteIndexBefore = getWhiteIndexBefore(key.midi);
            const isSoundingNow = activeMidiNotes.includes(key.midi);
            const lhNote = activeLhNotes.find(n => n.midi === key.midi);
            const rhNote = activeRhNotes.find(n => n.midi === key.midi);

            // Black key width is approx 60% of white key width, centered on split
            // Each white key is (100% / 22)
            const leftPercent = ((whiteIndexBefore + 0.68) / 22) * 100;

            return (
              <div
                key={`black-${key.midi}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleKeyClick(key.midi);
                }}
                style={{
                  left: `${leftPercent}%`,
                  width: `${(1 / 22) * 62}%`,
                }}
                className={`absolute top-2 h-28 rounded-b-md z-20 cursor-pointer transition-all duration-75 flex flex-col justify-end items-center pb-2 ${
                  isSoundingNow
                    ? lhNote
                      ? 'bg-gradient-to-t from-sky-400 to-sky-300 ring-2 ring-sky-300 shadow-md shadow-sky-500/50'
                      : 'bg-gradient-to-t from-amber-400 to-amber-300 ring-2 ring-amber-300 shadow-md shadow-amber-500/50'
                    : lhNote
                    ? 'bg-sky-700 border-2 border-sky-300 shadow-sm'
                    : rhNote
                    ? 'bg-amber-700 border-2 border-amber-300 shadow-sm'
                    : 'bg-gradient-to-b from-slate-900 to-black hover:from-slate-800 hover:to-slate-900 border border-slate-700 active:translate-y-0.5'
                }`}
                title={`MIDI ${key.midi}: ${key.noteName}${key.octave}`}
              >
                {/* Finger Badge on Black Key */}
                {lhNote && (
                  <span className="w-4 h-4 rounded-full bg-sky-300 text-slate-950 font-bold text-[9px] flex items-center justify-center mb-1">
                    {lhNote.finger}
                  </span>
                )}
                {rhNote && (
                  <span className="w-4 h-4 rounded-full bg-amber-300 text-slate-950 font-bold text-[9px] flex items-center justify-center mb-1">
                    {rhNote.finger}
                  </span>
                )}
                <span className={`text-[9px] font-mono ${lhNote || rhNote ? 'text-white font-bold' : 'text-slate-400'}`}>
                  {key.noteName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Hand Voicing Detailed Summary */}
      {currentVoicing && (
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-sky-950/40 border border-sky-900/60 rounded-lg p-2.5">
            <div className="flex items-center justify-between text-sky-400 font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                左手键位 (Left Hand) · 低音支柱
              </span>
              <span className="text-slate-400 text-[11px]">根音+五度+八度</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentVoicing.lhNotes.map((note) => (
                <div
                  key={`lh-summary-${note.midi}`}
                  className="px-2 py-1 rounded bg-sky-900/40 border border-sky-700/50 text-sky-200 flex items-center gap-1.5"
                >
                  <span className="font-bold text-sky-300">{note.noteName}</span>
                  <span className="text-[10px] text-sky-400/90 font-mono">第{note.finger}指 ({note.role})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-950/40 border border-amber-900/60 rounded-lg p-2.5">
            <div className="flex items-center justify-between text-amber-400 font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                右手键位 (Right Hand) · 和弦织体
              </span>
              <span className="text-slate-400 text-[11px]">{currentVoicing.inversionName}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentVoicing.rhNotes.map((note) => (
                <div
                  key={`rh-summary-${note.midi}`}
                  className="px-2 py-1 rounded bg-amber-900/40 border border-amber-700/50 text-amber-200 flex items-center gap-1.5"
                >
                  <span className="font-bold text-amber-300">{note.noteName}</span>
                  <span className="text-[10px] text-amber-400/90 font-mono">第{note.finger}指 ({note.role})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to determine the zero-based index among white keys of the preceding white key
function getWhiteIndexBefore(midi: number): number {
  const whiteMidies = [
    36, 38, 40, 41, 43, 45, 47, // C2..B2 (0..6)
    48, 50, 52, 53, 55, 57, 59, // C3..B3 (7..13)
    60, 62, 64, 65, 67, 69, 71, // C4..B4 (14..20)
    72,                         // C5 (21)
  ];
  let lastIndex = 0;
  for (let i = 0; i < whiteMidies.length; i++) {
    if (whiteMidies[i] < midi) {
      lastIndex = i;
    }
  }
  return lastIndex;
}
