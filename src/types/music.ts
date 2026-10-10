export type MusicalKey = 'C' | 'G' | 'D' | 'A' | 'E' | 'F' | 'Bb' | 'Eb' | 'Ab' | 'Am' | 'Em' | 'Dm';

export interface KeyOption {
  key: MusicalKey;
  name: string;
  accidentals: string;
  tonicMidi: number; // in octave 3
  mode: 'major' | 'minor';
}

export interface ChordVoicing {
  name: string;
  roman: string;
  degree: number; // 1-7
  rootMidi: number; // Bass root MIDI (Octave 2 or 3)
  lhNotes: { midi: number; noteName: string; finger: number; role: string }[];
  rhNotes: { midi: number; noteName: string; finger: number; role: string }[];
  inversionName: string;
}

export interface PopChordProgression {
  id: string;
  name: string;
  subtitle: string;
  roman: string[];
  degrees: number[];
  coverageRate: number; // e.g. 96 for 96%
  mood: string;
  soundFeel: string;
  representativeSongs: string[];
  description: string;
  keyboardistTip: string;
  defaultBpm: number;
  recommendedGrooveId: string;
  chordsTemplate: {
    degree: number;
    suffix: string; // '', 'm', '7', 'maj7', 'm7', 'sus4', 'add9'
    bassDegree?: number; // slash chord e.g. 1/3, 5/7
    inversion: 0 | 1 | 2; // root, 1st inv, 2nd inv
  }[];
}

export type HandPracticeMode = 'both' | 'left' | 'right';

export interface RhythmStep {
  step: number; // 0 to 15 (for 16-subdivision) or 0 to 7 (for 8-subdivision)
  beat: number; // 1, 2, 3, 4
  sub: number; // 0, 1, 2, 3
  lh: 'root' | 'fifth' | 'octave' | 'none';
  rh: 'chord' | 'chord_soft' | 'arpeggio_low' | 'arpeggio_mid' | 'arpeggio_high' | 'none';
  accent?: boolean;
  syncopated?: boolean;
  annotation?: string;
}

export interface PopGroove {
  id: string;
  name: string;
  category: '柱式伴奏' | '动力性律动' | '核心切分' | '分解琶音' | '拉丁与Bossa' | '副歌爆发';
  coverageRate: number; // e.g. 95%
  feelDescription: string;
  representativeSongs: string[];
  timeSignature: '4/4' | '3/4' | '6/8';
  subdivisions: 16 | 8;
  steps: RhythmStep[];
  keyboardistTip: string;
  tags: string[];
}

export interface SmartPairing {
  id: string;
  title: string;
  styleTag: string;
  description: string;
  progressionId: string;
  grooveId: string;
  suggestedKey: MusicalKey;
  suggestedBpm: number;
  matchScore: number; // 98%, 95%
  whyItWorks: string;
  iconType: 'tear' | 'fire' | 'leaf' | 'coffee' | 'heart' | 'sparkle';
}

export interface PianoKeyData {
  midi: number;
  noteName: string;
  octave: number;
  isBlack: boolean;
  isLeftHand: boolean;
  isRightHand: boolean;
  finger?: number;
  handRole?: string;
}
