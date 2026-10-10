import { useState, useEffect, useRef, useCallback } from 'react';
import { TopNav } from './components/TopNav';
import { PianoKeyboard } from './components/PianoKeyboard';
import { RhythmGridVisualizer } from './components/RhythmGridVisualizer';
import { TrainingControls } from './components/TrainingControls';
import { ProgressionSelector } from './components/ProgressionSelector';
import { RhythmSelector } from './components/RhythmSelector';
import { SmartPairModal } from './components/SmartPairModal';
import { KeyboardistTipsCard } from './components/KeyboardistTipsCard';
import { POP_PROGRESSIONS, POP_GROOVES, calculateChordVoicing, SMART_PAIRINGS } from './data/musicData';
import { PopChordProgression, PopGroove, MusicalKey, HandPracticeMode, ChordVoicing } from './types/music';
import { soundEngine } from './audio/soundEngine';
import { Sparkles, Trophy, Music, Zap, Layers } from 'lucide-react';

export default function App() {
  // Main states
  const [currentProgression, setCurrentProgression] = useState<PopChordProgression>(POP_PROGRESSIONS[1]); // Default 4536251
  const [currentGroove, setCurrentGroove] = useState<PopGroove>(POP_GROOVES[2]); // Default Syncopated Pop Groove
  const [selectedKey, setSelectedKey] = useState<MusicalKey>('C');
  const [bpm, setBpm] = useState<number>(72);
  const [practiceMode, setPracticeMode] = useState<HandPracticeMode>('both');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBar, setCurrentBar] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeMidiNotes, setActiveMidiNotes] = useState<number[]>([]);
  const [metronomeEnabled, setMetronomeEnabled] = useState<boolean>(true);
  const [drumEnabled, setDrumEnabled] = useState<boolean>(true);
  const [isSmartPairModalOpen, setIsSmartPairModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('all');

  // References for reliable interval/timer handling without stale closures
  const isPlayingRef = useRef<boolean>(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentBarRef = useRef<number>(currentBar);
  currentBarRef.current = currentBar;

  const currentStepRef = useRef<number>(currentStepIndex);
  currentStepRef.current = currentStepIndex;

  const bpmRef = useRef<number>(bpm);
  bpmRef.current = bpm;

  const grooveRef = useRef<PopGroove>(currentGroove);
  grooveRef.current = currentGroove;

  const progressionRef = useRef<PopChordProgression>(currentProgression);
  progressionRef.current = currentProgression;

  const keyRef = useRef<MusicalKey>(selectedKey);
  keyRef.current = selectedKey;

  const practiceModeRef = useRef<HandPracticeMode>(practiceMode);
  practiceModeRef.current = practiceMode;

  const timerRef = useRef<number | null>(null);

  // Compute current voicing and next voicing for the progression in current key
  const totalBars = currentProgression.chordsTemplate.length;
  const currentChordTemplate = currentProgression.chordsTemplate[currentBar] || currentProgression.chordsTemplate[0];
  const nextChordTemplate = currentProgression.chordsTemplate[(currentBar + 1) % totalBars];

  const currentVoicing: ChordVoicing = calculateChordVoicing(selectedKey, currentChordTemplate);
  const nextVoicing: ChordVoicing = calculateChordVoicing(selectedKey, nextChordTemplate);

  // Stop playback when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Sequencer loop step execution
  const executeStep = useCallback(() => {
    if (!isPlayingRef.current) return;

    const groove = grooveRef.current;
    const prog = progressionRef.current;
    const curKey = keyRef.current;
    const mode = practiceModeRef.current;

    const stepIndex = currentStepRef.current;
    const barIndex = currentBarRef.current;
    const totalSteps = groove.subdivisions;

    const step = groove.steps[stepIndex] || groove.steps[0];
    const curVoicing = calculateChordVoicing(curKey, prog.chordsTemplate[barIndex] || prog.chordsTemplate[0]);

    const soundingNotes: number[] = [];

    // 1. Metronome / Drum sound
    const isDownbeat = step.beat === 1 && step.sub === 0;
    const isQuarter = step.sub === 0;

    if (isDownbeat) {
      soundEngine.playMetronomeClick(true);
      soundEngine.playDrumBeat('kick');
    } else if (isQuarter) {
      soundEngine.playMetronomeClick(false);
      soundEngine.playDrumBeat('hat');
    }

    // 2. Left Hand triggers
    if (mode === 'both' || mode === 'left') {
      if (step.lh === 'root') {
        const rootNote = curVoicing.lhNotes[0]?.midi;
        if (rootNote) {
          soundEngine.playPianoNote(rootNote, step.accent ? 0.95 : 0.8, 1.4);
          soundingNotes.push(rootNote);
        }
      } else if (step.lh === 'fifth') {
        const fifthNote = curVoicing.lhNotes[1]?.midi;
        if (fifthNote) {
          soundEngine.playPianoNote(fifthNote, 0.75, 1.2);
          soundingNotes.push(fifthNote);
        }
      } else if (step.lh === 'octave') {
        const octNote = curVoicing.lhNotes[2]?.midi;
        if (octNote) {
          soundEngine.playPianoNote(octNote, 0.8, 1.2);
          soundingNotes.push(octNote);
        }
      }
    }

    // 3. Right Hand triggers
    if (mode === 'both' || mode === 'right') {
      if (step.rh === 'chord' || step.rh === 'chord_soft') {
        const vel = step.rh === 'chord' ? (step.accent ? 0.9 : 0.78) : 0.55;
        curVoicing.rhNotes.forEach((rn) => {
          soundEngine.playPianoNote(rn.midi, vel, step.rh === 'chord' ? 1.4 : 0.9);
          soundingNotes.push(rn.midi);
        });
      } else if (step.rh === 'arpeggio_low') {
        const note = curVoicing.rhNotes[0]?.midi;
        if (note) {
          soundEngine.playPianoNote(note, 0.75, 1.0);
          soundingNotes.push(note);
        }
      } else if (step.rh === 'arpeggio_mid') {
        const note = curVoicing.rhNotes[1]?.midi || curVoicing.rhNotes[0]?.midi;
        if (note) {
          soundEngine.playPianoNote(note, 0.72, 1.0);
          soundingNotes.push(note);
        }
      } else if (step.rh === 'arpeggio_high') {
        const note = curVoicing.rhNotes[curVoicing.rhNotes.length - 1]?.midi;
        if (note) {
          soundEngine.playPianoNote(note, 0.85, 1.2);
          soundingNotes.push(note);
        }
      }
    }

    if (soundingNotes.length > 0) {
      setActiveMidiNotes(soundingNotes);
      window.setTimeout(() => {
        setActiveMidiNotes([]);
      }, 160);
    }

    // Advance step
    const nextStep = (stepIndex + 1) % totalSteps;
    currentStepRef.current = nextStep;
    setCurrentStepIndex(nextStep);

    // If wrapped around, advance bar
    if (nextStep === 0) {
      const nextBar = (barIndex + 1) % prog.chordsTemplate.length;
      currentBarRef.current = nextBar;
      setCurrentBar(nextBar);
    }

    // Schedule next tick
    // BPM = Quarter notes per minute
    // Total steps per quarter note = totalSteps / 4 (4 for 16ths, 2 for 8ths)
    const stepsPerBeat = totalSteps / 4;
    const stepDurationMs = (60 / bpmRef.current / stepsPerBeat) * 1000;

    timerRef.current = window.setTimeout(executeStep, stepDurationMs);
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setActiveMidiNotes([]);
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      executeStep();
    }
  };

  const resetPlayback = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentBar(0);
    currentBarRef.current = 0;
    setCurrentStepIndex(0);
    currentStepRef.current = 0;
    setActiveMidiNotes([]);
  };

  // Keyboard shortcut: Space to play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Apply Smart Pairing
  const handleApplySmartPairing = (
    progression: PopChordProgression,
    groove: PopGroove,
    newBpm: number,
    newKey: MusicalKey
  ) => {
    setCurrentProgression(progression);
    setCurrentGroove(groove);
    setBpm(newBpm);
    setSelectedKey(newKey);
    setCurrentBar(0);
    currentBarRef.current = 0;
    setCurrentStepIndex(0);
    currentStepRef.current = 0;
  };

  // Quick smart pair button (cycles or picks best)
  const handleQuickSmartPair = () => {
    const match = SMART_PAIRINGS[0];
    const prog = POP_PROGRESSIONS.find((p) => p.id === match.progressionId);
    const groove = POP_GROOVES.find((g) => g.id === match.grooveId);
    if (prog && groove) {
      handleApplySmartPairing(prog, groove, match.suggestedBpm, match.suggestedKey);
    }
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const elem = document.getElementById(section);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="app" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* 3-Zone Top Navigation Bar */}
      <TopNav
        onOpenSmartPair={() => setIsSmartPairModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Section & Domain Overview */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800">
                  专业流行键盘伴奏训练系统
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-amber-400">覆盖 95% 流行曲律动与和声套路</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                以最低的脑力消耗，练成肌肉记忆的现场伴奏本能
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                融汇柱式伴奏、动力性推进、核心切分与流水分解四大支柱律动；无缝衔接卡农、4536251、6415等金曲走向。3个八度实战钢琴键位双手独立分拆，节拍速度低至 30 BPM 极致慢练。
              </p>
            </div>

            {/* Quick KPI badges */}
            <div className="flex flex-row lg:flex-col gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">和弦套路流行覆盖</div>
                  <div className="text-base font-bold text-sky-300 font-mono">96%+</div>
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">伴奏节奏律动覆盖</div>
                  <div className="text-base font-bold text-emerald-300 font-mono">95%+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Training Controls & Next-Chord Muscle Memory Anticipation */}
        <TrainingControls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onReset={resetPlayback}
          bpm={bpm}
          onBpmChange={(newBpm) => setBpm(newBpm)}
          selectedKey={selectedKey}
          onKeyChange={(newKey) => setSelectedKey(newKey)}
          practiceMode={practiceMode}
          onPracticeModeChange={(m) => setPracticeMode(m)}
          metronomeEnabled={metronomeEnabled}
          onToggleMetronome={(en) => {
            setMetronomeEnabled(en);
            soundEngine.toggleMetronome(en);
          }}
          drumEnabled={drumEnabled}
          onToggleDrum={(en) => {
            setDrumEnabled(en);
            soundEngine.toggleDrums(en);
          }}
          currentVoicing={currentVoicing}
          nextVoicing={nextVoicing}
          currentBar={currentBar}
          totalBars={totalBars}
          onQuickSmartPair={handleQuickSmartPair}
        />

        {/* 3-Octave Visual Piano Keyboard with LH (Cyan) and RH (Amber) Indicators */}
        <div id="keyboard">
          <PianoKeyboard
            currentVoicing={currentVoicing}
            activeMidiNotes={activeMidiNotes}
            practiceMode={practiceMode}
            onKeyClick={(midi) => {
              // Clicked note can audition
            }}
          />
        </div>

        {/* Rhythm Step Grid Visualizer (16-step / 8-step beat grid) */}
        <RhythmGridVisualizer
          groove={currentGroove}
          currentStepIndex={currentStepIndex}
          isPlaying={isPlaying}
          practiceMode={practiceMode}
        />

        {/* Dual Deck: Progression Selector & Rhythm Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="progressions">
            <ProgressionSelector
              currentProgression={currentProgression}
              onSelectProgression={(prog) => {
                setCurrentProgression(prog);
                setCurrentBar(0);
                currentBarRef.current = 0;
                setCurrentStepIndex(0);
                currentStepRef.current = 0;
              }}
              selectedKey={selectedKey}
            />
          </div>

          <div id="rhythms">
            <RhythmSelector
              currentGroove={currentGroove}
              onSelectGroove={(groove) => {
                setCurrentGroove(groove);
                setCurrentStepIndex(0);
                currentStepRef.current = 0;
              }}
            />
          </div>
        </div>

        {/* Pro Keyboardist Secret Tips */}
        <div id="pro-tips">
          <KeyboardistTipsCard />
        </div>
      </main>

      {/* Smart Pairing Modal */}
      <SmartPairModal
        isOpen={isSmartPairModalOpen}
        onClose={() => setIsSmartPairModalOpen(false)}
        onApplyPairing={handleApplySmartPairing}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 py-6 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">流行键盘伴奏工作站</span>
            <span>·</span>
            <span>高频肌肉记忆与可视化节奏伴奏系统</span>
          </div>
          <div className="text-[11px] text-slate-600 font-mono">
            30-240 BPM 智能节拍 · 3八度独立左右手指位 · Web Audio 合成音源
          </div>
        </div>
      </footer>
    </div>
  );
}
