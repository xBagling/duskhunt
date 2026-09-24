// Perceived loudness, the way broadcasters measure it (ITU-R BS.1770 / EBU R128, "LUFS"):
// K-weighting (ears are less sensitive to deep rumble, more to presence), 400 ms blocks, and gating,
// so silence between two meows doesn't count as "quiet". Used to make every animal play equally loud
// at every speed.

/** Gated loudness (LUFS) of mono samples that have already been K-weighted. */
function gatedLoudness(x, sampleRate) {
  const block = Math.round(0.4 * sampleRate);
  const step = Math.round(0.1 * sampleRate); // 75% overlap
  const ms = [];
  if (x.length < block) {
    let s = 0;
    for (let i = 0; i < x.length; i++) s += x[i] * x[i];
    ms.push(s / Math.max(1, x.length));
  } else {
    for (let at = 0; at + block <= x.length; at += step) {
      let s = 0;
      for (let i = at; i < at + block; i++) s += x[i] * x[i];
      ms.push(s / block);
    }
  }
  const lufs = (m) => -0.691 + 10 * Math.log10(m + 1e-12);
  const abs = ms.filter((m) => lufs(m) > -70);
  if (!abs.length) return -70;
  const mean = (a) => a.reduce((p, q) => p + q, 0) / a.length;
  const rel = lufs(mean(abs)) - 10;
  const kept = abs.filter((m) => lufs(m) > rel);
  return lufs(mean(kept.length ? kept : abs));
}

/** K-weighting inside an offline context; returns its input. */
function kWeighting(c) {
  const hp = c.createBiquadFilter(); // RLB: roll off below ~40 Hz
  hp.type = "highpass";
  hp.frequency.value = 38;
  hp.Q.value = 0.5;
  const shelf = c.createBiquadFilter(); // head-related presence boost
  shelf.type = "highshelf";
  shelf.frequency.value = 1500;
  shelf.gain.value = 4;
  hp.connect(shelf).connect(c.destination);
  return hp;
}

/**
 * Loudness (LUFS) of `len` seconds from `start`, as heard when played at `speed` with `gain`.
 * `chain(c, { dest })`, if given, builds the rest of the playback path (low cut, limiter) into
 * `dest`, so the measurement matches what comes out of the speakers.
 */
export async function loudnessAt(buffer, start, len, speed, { gain = 1, chain = null } = {}) {
  // Tape-slowing to 1/8 is the very same samples played at 1/8 of the sample rate. So instead of
  // rendering 24 s of slowed audio, relabel the window's samples with a lower rate: identical
  // sound, no resampling, and every speed costs as little as full speed.
  const SR = buffer.sampleRate * speed;
  const a = Math.floor(start * buffer.sampleRate);
  const n = Math.max(1, Math.min(buffer.length - a, Math.round(len * buffer.sampleRate)));
  const win = new AudioBuffer({ numberOfChannels: 1, length: n, sampleRate: SR });
  const mono = win.getChannelData(0);
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const d = buffer.getChannelData(ch);
    for (let i = 0; i < n; i++) mono[i] += d[a + i] / buffer.numberOfChannels;
  }
  const c = new OfflineAudioContext(1, n, SR);
  const src = c.createBufferSource();
  src.buffer = win;
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(g);
  const k = kWeighting(c);
  g.connect(chain ? chain(c, { dest: k }) : k);
  src.start();
  const out = await c.startRendering();
  return gatedLoudness(out.getChannelData(0), SR);
}

/** Loudness (LUFS) of an already rendered buffer (used by the tests). */
export async function loudnessOf(rendered) {
  const SR = rendered.sampleRate;
  const c = new OfflineAudioContext(1, rendered.length, SR);
  const src = c.createBufferSource();
  src.buffer = rendered;
  src.connect(kWeighting(c));
  src.start();
  const out = await c.startRendering();
  return gatedLoudness(out.getChannelData(0), SR);
}
