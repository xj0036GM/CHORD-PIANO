// High quality Web Audio Piano Synthesizer and Metronome Engine

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private metronomeGain: GainNode | null = null;
  private drumGain: GainNode | null = null;
  private isMuted: boolean = false;
  private metronomeEnabled: boolean = true;
  private drumEnabled: boolean = true;
  private metronomeVolume: number = 0.7;
  private pianoVolume: number = 0.85;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.pianoVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.metronomeGain = this.ctx.createGain();
      this.metronomeGain.gain.setValueAtTime(this.metronomeVolume, this.ctx.currentTime);
      this.metronomeGain.connect(this.ctx.destination);

      this.drumGain = this.ctx.createGain();
      this.drumGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.drumGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setPianoVolume(val: number) {
    this.pianoVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.pianoVolume, this.ctx.currentTime);
    }
  }

  public setMetronomeVolume(val: number) {
    this.metronomeVolume = Math.max(0, Math.min(1, val));
    if (this.metronomeGain && this.ctx) {
      this.metronomeGain.gain.setValueAtTime(this.metronomeEnabled ? this.metronomeVolume : 0, this.ctx.currentTime);
    }
  }

  public toggleMetronome(enabled: boolean) {
    this.metronomeEnabled = enabled;
  }

  public toggleDrums(enabled: boolean) {
    this.drumEnabled = enabled;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.pianoVolume, this.ctx.currentTime);
    }
  }

  public midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // Plays a rich acoustic-style piano note
  public playPianoNote(midi: number, velocity: number = 0.8, durationSeconds: number = 1.6) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const freq = this.midiToFreq(midi);

    // Stereo panning based on pitch (C2 left -0.35, C5 right +0.35)
    const panVal = Math.max(-0.4, Math.min(0.4, (midi - 54) / 40));
    const panner = this.ctx.createStereoPanner();
    panner.pan.setValueAtTime(panVal, now);
    panner.connect(this.masterGain);

    // Warm soundboard filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    // Higher velocity opens up harmonic brightness
    const cutoff = Math.min(8000, freq * 5 + velocity * 2500);
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(180, freq * 1.5), now + durationSeconds);
    filter.connect(panner);

    // Main Note Gain Envelope
    const noteGain = this.ctx.createGain();
    const peakGain = 0.28 * velocity;
    noteGain.gain.setValueAtTime(0.0001, now);
    // Instant hammer attack (5ms)
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.006);
    // Exponential piano decay
    noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.45, now + 0.25);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);
    noteGain.connect(filter);

    // 1. Fundamental Oscillator (Triangle)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // 2. Second Harmonic with subtle detune for acoustic richness
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2.detune.setValueAtTime(4, now); // +4 cents

    // 3. Sub harmonic / third harmonic for body
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq, now);
    osc3.detune.setValueAtTime(-3, now); // -3 cents

    const harmGain = this.ctx.createGain();
    harmGain.gain.setValueAtTime(0.35, now);
    harmGain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds * 0.7);

    osc2.connect(harmGain);
    harmGain.connect(noteGain);

    osc1.connect(noteGain);
    osc3.connect(noteGain);

    // 4. Hammer transient click (very short impulse)
    this.playHammerClick(filter, now, velocity);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + durationSeconds + 0.05);
    osc2.stop(now + durationSeconds + 0.05);
    osc3.stop(now + durationSeconds + 0.05);
  }

  private playHammerClick(targetNode: AudioNode, time: number, velocity: number) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.015); // 15ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2200, time);
    noiseFilter.Q.setValueAtTime(1.5, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05 * velocity, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.015);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(targetNode);

    noise.start(time);
    noise.stop(time + 0.016);
  }

  // Metronome tick
  public playMetronomeClick(isDownbeat: boolean) {
    if (!this.metronomeEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.metronomeGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Woodblock style click: 1400Hz for Beat 1, 950Hz for Beats 2, 3, 4
    const freq = isDownbeat ? 1400 : 950;
    const level = isDownbeat ? 0.35 * this.metronomeVolume : 0.2 * this.metronomeVolume;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.035);

    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.metronomeGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Rhythm drum pulse (subtle kick & hi-hat)
  public playDrumBeat(type: 'kick' | 'hat') {
    if (!this.drumEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.drumGain) return;

    const now = this.ctx.currentTime;

    if (type === 'kick') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.drumGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      // Hi-hat tick
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.03);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.drumGain);

      noise.start(now);
      noise.stop(now + 0.035);
    }
  }
}

export const soundEngine = new SoundEngine();
