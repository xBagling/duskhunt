// Audio engine: decode a recording, find its "signature" moment, and play it
// tape-style at any speed (slower = deeper, which is where the monster voices come from).
import { CONFIG } from "./config.js";
import { loudnessAt } from "./loudness.js";

// Every clip is set to this perceived loudness (LUFS) at every speed, so no animal is much louder
// or quieter than another, and slowing a call down doesn't make it fade away.
const TARGET_LUFS = -16;
const MAX_BOOST = 100; // up to +40 dB for very faint recordings

let ctx = null;
let analyser = null;
let output = null;

/**
 * The master chain every clip goes through: level, then a compressor and a soft clipper that
 * catch peaks. Exported so the loudness tests can render exactly what players hear.
 */
export function buildOutput(c, { tap, dest } = {}) {
  const input = c.createGain();
  input.gain.value = 1;
  const compressor = c.createDynamicsCompressor(); // a peak limiter: leaves the level alone, catches spikes
  compressor.threshold.value = -1; // (a low threshold would also add hidden "makeup" gain)
  compressor.knee.value = 0;
  compressor.ratio.value = 20;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.12;
  // Soft clipper: untouched below 0.8, then rounds peaks off smoothly instead of hard clipping.
  // (It must stay linear at normal levels, or it would change how loud each clip sounds.)
  const clipper = c.createWaveShaper();
  const curve = new Float32Array(2049);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    const a = Math.abs(x);
    curve[i] = Math.sign(x) * (a <= 0.8 ? a : 0.8 + 0.2 * Math.tanh((a - 0.8) / 0.2));
  }
  clipper.curve = curve;
  // Low cut: a slowed growl drops partly below hearing (and below what speakers can play). That
  // inaudible rumble would only eat the limiter's headroom and make the audible part quieter.
  const lowCut = c.createBiquadFilter();
  lowCut.type = "highpass";
  lowCut.frequency.value = 35;
  lowCut.Q.value = 0.707;
  input.connect(lowCut);
  if (tap) lowCut.connect(tap).connect(compressor);
  else lowCut.connect(compressor);
  compressor.connect(clipper).connect(dest || c.destination);
  return input;
}

/** Only the low cut, for measuring the level going into the limiter. */
function lowCutOnly(c, { dest } = {}) {
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 35;
  f.Q.value = 0.707;
  f.connect(dest || c.destination);
  return f;
}

function context() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    output = buildOutput(ctx, { tap: analyser });
  }
  return ctx;
}

export function getAnalyser() {
  context();
  return analyser;
}

/** Shared context for UI sound effects. */
export function audioContext() {
  const c = context();
  if (c.state === "suspended") c.resume();
  return c;
}

const cache = new Map();

/** Fetch + decode a sound once. Resolves to a Clip. */
export function loadClip(sound) {
  const key = sound.src;
  if (!cache.has(key)) {
    const p = (async () => {
      const res = await fetch(sound.src, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.arrayBuffer();
      const buffer = await new Promise((resolve, reject) => {
        const r = context().decodeAudioData(data, resolve, reject);
        if (r && r.then) r.then(resolve, reject);
      });
      const clip = new Clip(buffer, sound);
      await clip.ready;
      return clip;
    })();
    p.catch(() => cache.delete(key));
    cache.set(key, p);
  }
  return cache.get(key);
}

export class Clip {
  constructor(buffer, sound) {
    this.buffer = buffer;
    this.len = Math.min(sound.len ?? CONFIG.CLIP_SECONDS, buffer.duration);
    this.start = sound.start ?? findLoudestWindow(buffer, this.len);
    this.start = Math.max(0, Math.min(this.start, buffer.duration - this.len));
    this.gain = normalizeGain(buffer, this.start, this.len); // quick estimate until measured
    this.gains = new Map(); // speed → gain, from the perceived loudness at that speed
    this.current = null;
    // All game speeds are measured at once. The clip counts as ready as soon as the first speed
    // (the one played first) is known; the others land in the background long before a miss.
    const speeds = [...new Set([...CONFIG.SPEEDS, 1])].sort((a, b) => a - b);
    const each = speeds.map((s) => this.measureAt(s));
    this.ready = each[0];
    this.allReady = Promise.all(each);
  }

  /** Measure the loudness at one speed (tape-slowing shifts the sound, and ears hear pitches
   * unevenly, so each speed needs its own level). */
  async measureAt(s) {
    try {
      const clamp = (g) => Math.min(MAX_BOOST, Math.max(0.02, g));
      // Pass 1: straight to the target, measured after the low cut.
      const lufs = await loudnessAt(this.buffer, this.start, this.len, s, { chain: lowCutOnly });
      if (lufs <= -69) return this.gains.set(s, 1);
      let g = clamp(10 ** ((TARGET_LUFS - lufs) / 20));
      // Pass 2, only when peaks will reach the limiter: add back what it takes (at most +6 dB).
      if (g * this.peak() > 0.5) {
        const heard = await loudnessAt(this.buffer, this.start, this.len, s, { gain: g, chain: buildOutput });
        if (heard > -69) g = clamp(g * Math.min(2, Math.max(0.5, 10 ** ((TARGET_LUFS - heard) / 20))));
      }
      this.gains.set(s, g);
    } catch {
      // Without OfflineAudioContext we keep the quick estimate.
    }
  }

  /** Sample peak of the played window (any channel). */
  peak() {
    if (this._peak != null) return this._peak;
    const a = Math.floor(this.start * this.buffer.sampleRate);
    const b = Math.min(this.buffer.length, Math.floor((this.start + this.len) * this.buffer.sampleRate));
    let p = 0;
    for (let ch = 0; ch < this.buffer.numberOfChannels; ch++) {
      const d = this.buffer.getChannelData(ch);
      for (let i = a; i < b; i++) if (Math.abs(d[i]) > p) p = Math.abs(d[i]);
    }
    return (this._peak = p);
  }

  /** Gain for a playback speed; between measured speeds it's interpolated (in dB, on a log scale). */
  gainFor(speed) {
    const pts = [...this.gains.entries()].sort((a, b) => a[0] - b[0]);
    if (!pts.length) return this.gain;
    if (pts.length === 1) return pts[0][1];
    if (speed <= pts[0][0]) return pts[0][1];
    if (speed >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const [s0, g0] = pts[i];
      const [s1, g1] = pts[i + 1];
      if (speed <= s1) {
        const t = Math.log2(speed / s0) / Math.log2(s1 / s0);
        return 10 ** ((20 * Math.log10(g0) * (1 - t) + 20 * Math.log10(g1) * t) / 20);
      }
    }
    return this.gain;
  }

  /** Real-time duration of a play at this speed, in seconds. */
  durationAt(speed) {
    return this.len / speed;
  }

  /**
   * Play the clip tape-style. With `from`, the speed glides from `from` to `speed` over
   * `rampTime` seconds, like a tape spinning up (used after a miss and for the big reveal).
   */
  play(speed, { onEnd, onProgress, from = null, rampTime = 0 } = {}) {
    this.stop();
    const c = context();
    if (c.state === "suspended") c.resume();
    const src = c.createBufferSource();
    src.buffer = this.buffer;
    const env = c.createGain();
    const t0 = c.currentTime + 0.02;
    let dur = this.durationAt(speed);
    let ramp = 0;
    if (from != null && from !== speed && rampTime > 0) {
      // Buffer seconds used up during the glide = average rate × glide time.
      ramp = rampTime;
      if (ramp * ((from + speed) / 2) > this.len * 0.85) ramp = (this.len * 0.85) / ((from + speed) / 2);
      src.playbackRate.setValueAtTime(from, t0);
      src.playbackRate.linearRampToValueAtTime(speed, t0 + ramp);
      dur = ramp + (this.len - ramp * ((from + speed) / 2)) / speed;
    } else {
      src.playbackRate.value = speed;
    }
    // The level follows the speed, so a glide from 1/8 to 1/4 stays equally loud all the way.
    const fade = Math.min(0.06, dur / 10);
    const gEnd = this.gainFor(speed);
    const gStart = ramp ? this.gainFor(from) : gEnd;
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(gStart, t0 + fade);
    if (ramp) {
      const steps = 8; // follow the glide in small steps (the curve isn't linear)
      for (let i = 1; i <= steps; i++) {
        const t = (i / steps) * ramp;
        const sp = from + (speed - from) * (i / steps);
        env.gain.linearRampToValueAtTime(this.gainFor(sp), t0 + Math.max(fade, t));
      }
    }
    env.gain.setValueAtTime(gEnd, t0 + dur - fade);
    env.gain.linearRampToValueAtTime(0, t0 + dur);
    src.connect(env).connect(output);
    src.start(t0, this.start);
    src.stop(t0 + dur);

    let raf = 0;
    const tick = () => {
      const p = Math.min(1, Math.max(0, (c.currentTime - t0) / dur));
      onProgress?.(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const handle = { src, speed, stopped: false };
    src.onended = () => {
      cancelAnimationFrame(raf);
      if (this.current === handle) this.current = null;
      onProgress?.(handle.stopped ? 0 : 1);
      onEnd?.(handle.stopped);
    };
    this.current = handle;
    return handle;
  }

  stop() {
    if (this.current) {
      this.current.stopped = true;
      try {
        this.current.src.stop();
      } catch {}
      this.current = null;
    }
  }

  get playing() {
    return Boolean(this.current);
  }

  /** Downsampled peak envelope for drawing waveforms (admin sound lab). */
  envelope(points = 600) {
    const data = mono(this.buffer);
    const step = Math.max(1, Math.floor(data.length / points));
    const out = new Float32Array(points);
    for (let i = 0; i < points; i++) {
      let peak = 0;
      for (let j = i * step, end = Math.min(data.length, j + step); j < end; j++) peak = Math.max(peak, Math.abs(data[j]));
      out[i] = peak;
    }
    return out;
  }
}

function mono(buffer) {
  if (buffer.numberOfChannels === 1) return buffer.getChannelData(0);
  const a = buffer.getChannelData(0);
  const b = buffer.getChannelData(1);
  const out = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) out[i] = (a[i] + b[i]) / 2;
  return out;
}

/** Slide a window across the recording and pick the most energetic stretch. */
function findLoudestWindow(buffer, len) {
  const data = mono(buffer);
  const frame = Math.floor(buffer.sampleRate * 0.05);
  const frames = Math.floor(data.length / frame);
  const energy = new Float32Array(frames);
  for (let f = 0; f < frames; f++) {
    let e = 0;
    for (let i = f * frame, end = i + frame; i < end; i++) e += data[i] * data[i];
    energy[f] = e;
  }
  const win = Math.max(1, Math.round(len / 0.05));
  if (frames <= win) return 0;
  let sum = 0;
  for (let f = 0; f < win; f++) sum += energy[f];
  let best = sum;
  let bestAt = 0;
  for (let f = win; f < frames; f++) {
    sum += energy[f] - energy[f - win];
    if (sum > best) {
      best = sum;
      bestAt = f - win + 1;
    }
  }
  // Start a touch early so the call doesn't begin mid-note.
  return Math.max(0, bestAt * 0.05 - 0.1);
}

/**
 * Loudness-match clips so every day's animal plays at a similar volume.
 * Aims for a target average (RMS) level, but lets peaks go at most ~8 dB over full scale;
 * the compressor and soft clipper on the output tame whatever pokes through.
 */
function normalizeGain(buffer, start, len) {
  const data = mono(buffer);
  const a = Math.floor(start * buffer.sampleRate);
  const b = Math.min(data.length, Math.floor((start + len) * buffer.sampleRate));
  let peak = 0;
  let sum = 0;
  for (let i = a; i < b; i++) {
    const v = Math.abs(data[i]);
    if (v > peak) peak = v;
    sum += v * v;
  }
  if (!peak) return 1;
  const rms = Math.sqrt(sum / Math.max(1, b - a));
  const peakGain = 0.95 / peak;
  const rmsGain = 0.16 / rms;
  return Math.min(12, Math.max(Math.min(peakGain, rmsGain), Math.min(rmsGain, peakGain * 2.5)));
}
