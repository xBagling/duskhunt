// Small synthesized UI sounds (no audio files). Toggled with the speaker button.
import { audioContext } from "./audio.js";
import { store } from "./store.js";

function tone(freq, { type = "sine", start = 0, dur = 0.2, gain = 0.18, to = null } = {}) {
  const c = audioContext();
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

// A soft wooden "pluck", like a marimba bar: a warm fundamental plus a quick bright overtone.
function pluck(freq, { start = 0, gain = 0.22, dur = 0.45 } = {}) {
  tone(freq, { start, dur, gain });
  tone(freq * 4, { start, dur: dur * 0.22, gain: gain * 0.28 });
}

// Wrong guesses answer with two falling notes; the closer the guess, the higher and brighter.
const NOPE = { none: [196, 147], class: [247, 196], order: [294, 247], family: [370, 330], kind: [392, 523] }; // "right kind" rises: nearly!

// ---------- The win: sparkle, chord, applause ----------

let noise = null;
function noiseBuffer(c) {
  if (noise && noise.sampleRate === c.sampleRate) return noise;
  noise = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noise;
}

/** A burst of filtered noise: one clap, or (long and soft) the murmur of a crowd. */
function noiseHit(c, { start, dur, gain, freq, q = 1.2, attack = 0.002 }) {
  const t = c.currentTime + start;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c);
  src.loop = true;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(c.destination);
  src.start(t, Math.random() * 1.5);
  src.stop(t + dur + 0.05);
}

/** A warm chord note: two slightly detuned triangles that swell in and ring out. */
function pad(freq, { start = 0, dur = 1.4, gain = 0.07 } = {}) {
  const c = audioContext();
  const t = c.currentTime + start;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(c.destination);
  for (const detune of [-6, 7]) {
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.value = freq;
    o.detune.value = detune;
    o.connect(g);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
}

/** A bright brass-ish note: a sawtooth through a filter that opens as it sounds. */
function brass(freq, { start = 0, dur = 0.3, gain = 0.07 } = {}) {
  const c = audioContext();
  const t = c.currentTime + start;
  const o = c.createOscillator();
  o.type = "sawtooth";
  o.frequency.value = freq;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(freq * 1.5, t);
  lp.frequency.exponentialRampToValueAtTime(freq * 6, t + 0.06);
  lp.frequency.exponentialRampToValueAtTime(freq * 2.5, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
  g.gain.setValueAtTime(gain, t + dur * 0.7);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(lp).connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

const play = (fn) => {
  if (store.sfxMuted) return;
  try {
    fn();
  } catch {}
};

export const sfx = {
  get muted() {
    return store.sfxMuted;
  },
  toggle() {
    store.sfxMuted = !store.sfxMuted;
    return store.sfxMuted;
  },
  tap: () => play(() => tone(900, { type: "triangle", dur: 0.05, gain: 0.05 })),
  wrong: (level = "none") =>
    play(() => {
      const [a, b] = NOPE[level] || NOPE.none;
      pluck(a, { gain: 0.26 });
      pluck(b, { start: 0.14, gain: 0.26, dur: 0.6 });
    }),
  /** The win. power 0..1: the earlier you found it, the bigger the cheer. */
  win: (power = 1) =>
    play(() => {
      const c = audioContext();
      // Sparkle run up to the octave…
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => pluck(f, { start: i * 0.06, gain: 0.2, dur: 0.6 }));
      // …landing on a warm major chord, with a bell on top.
      [261.63, 329.63, 392, 523.25].forEach((f) => pad(f, { start: 0.3, dur: 1.6 + power * 0.6, gain: 0.05 + power * 0.02 }));
      tone(2093, { type: "sine", start: 0.32, dur: 1.4, gain: 0.05 });
      tone(3136, { type: "sine", start: 0.4, dur: 1.0, gain: 0.025 });
      // The crowd: a soft "yay" swell and a round of applause.
      noiseHit(c, { start: 0.25, dur: 1.2 + power * 0.8, gain: 0.03 + power * 0.03, freq: 900, q: 0.8, attack: 0.35 });
      const claps = Math.round(18 + power * 34);
      for (let i = 0; i < claps; i++) {
        const at = 0.3 + Math.pow(Math.random(), 1.6) * (1.2 + power * 0.9); // dense at first, then trailing off
        noiseHit(c, { start: at, dur: 0.05 + Math.random() * 0.04, gain: 0.08 + Math.random() * 0.1, freq: 900 + Math.random() * 1800 });
      }
    }),
  skip: () =>
    play(() => {
      tone(300, { type: "triangle", dur: 0.3, gain: 0.08, to: 900 });
      tone(450, { type: "sine", start: 0.05, dur: 0.28, gain: 0.05, to: 1350 });
    }),
  /** Legendary finds get a "ta-da-da-daaa" before the chord and applause. */
  fanfare: () =>
    play(() => {
      [[392, 0, 0.14], [523.25, 0.14, 0.14], [659.25, 0.28, 0.14], [783.99, 0.42, 0.7]].forEach(([f, start, dur]) => {
        brass(f, { start, dur, gain: 0.06 });
        brass(f / 2, { start, dur, gain: 0.03 });
      });
    }),
  /** A late find: relief rather than triumph. Two soft rising notes and a few claps. */
  phew: () =>
    play(() => {
      const c = audioContext();
      pluck(659.25, { gain: 0.18, dur: 0.5 });
      pluck(783.99, { start: 0.16, gain: 0.18, dur: 0.9 });
      pad(392, { start: 0.16, dur: 1.1, gain: 0.035 });
      for (let i = 0; i < 5; i++) noiseHit(c, { start: 0.35 + i * 0.13 + Math.random() * 0.05, dur: 0.06, gain: 0.07, freq: 1100 + Math.random() * 1200 });
    }),
  /** It got away: an owl hoots, a low falling tone, and the night wind. Gentle, not mocking. */
  lose: () =>
    play(() => {
      const c = audioContext();
      for (const at of [0, 0.42]) tone(330, { type: "sine", start: at, dur: 0.34, gain: 0.09, to: 300 });
      pad(233.08, { start: 0.9, dur: 1.3, gain: 0.05 });
      pad(196, { start: 1.25, dur: 1.8, gain: 0.05 });
      noiseHit(c, { start: 0.5, dur: 2.4, gain: 0.025, freq: 380, q: 0.5, attack: 0.9 });
    }),
};
