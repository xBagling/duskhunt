// The equaliser ring around the play button. Its bars move heavily at slow speeds and jitter at
// full speed, take their colours from the time of day, and feed the scene's grass and fireflies.
import { getAnalyser } from "../audio.js";
import { setAmp } from "../scene.js";

export function createVisualizer(canvas, { isPlaying, speed }) {
  const g = canvas.getContext("2d");
  let raf = 0;
  let timer = 0;
  let t = 0;
  let data = null;
  let smooth = null;
  let frame = 0;
  let colors = { ink: "#1b2340", hot: "#e0503f" };

  function readColors() {
    const css = getComputedStyle(document.documentElement);
    colors = { ink: css.getPropertyValue("--on-sky").trim() || colors.ink, hot: css.getPropertyValue("--accent").trim() || colors.hot };
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    if (frame++ % 20 === 0) readColors();
    const { width, height } = canvas.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;
    const inner = Math.min(width, height) * 0.33;
    const maxLen = Math.min(width, height) * 0.15;
    const bars = 56;
    const playing = isPlaying();
    const sp = speed();
    g.clearRect(0, 0, width, height);

    let level = 0;
    if (playing) {
      const an = getAnalyser();
      if (!data || data.length !== an.frequencyBinCount) {
        data = new Uint8Array(an.frequencyBinCount);
        smooth = new Float32Array(bars);
      }
      an.getByteFrequencyData(data);
    }
    // Slow speeds: heavy, lazy bars. Full speed: quick and twitchy.
    const follow = 0.08 + Math.min(1, sp) * 0.34;
    t += 0.01 + sp * 0.02;
    g.lineCap = "round";
    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
      let v;
      if (playing) {
        const half = bars / 2;
        const k = i < half ? i : bars - i;
        const bin = Math.floor(Math.pow(k / half, 1.6) * data.length * 0.7);
        const target = data[bin] / 255;
        smooth[i] += (target - smooth[i]) * follow;
        v = smooth[i];
        level += v;
      } else {
        if (smooth) smooth[i] *= 0.9;
        v = (smooth ? smooth[i] : 0) + 0.08 + 0.05 * Math.sin(t * 1.6 + i * 0.45);
      }
      const len = 3 + v * maxLen;
      g.strokeStyle = playing && v > 0.72 ? colors.hot : colors.ink;
      g.globalAlpha = playing ? 0.92 : 0.32;
      g.lineWidth = 4;
      g.beginPath();
      g.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      g.lineTo(cx + Math.cos(angle) * (inner + len), cy + Math.sin(angle) * (inner + len));
      g.stroke();
    }
    g.globalAlpha = 1;
    setAmp(playing ? Math.min(1, (level / bars) * 1.8) : 0);
    schedule(playing);
  }

  function schedule(playing) {
    if (document.hidden) return;
    if (playing) raf = requestAnimationFrame(draw);
    else timer = setTimeout(() => (raf = requestAnimationFrame(draw)), 90);
  }
  function onVisibility() {
    if (!document.hidden) {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    }
  }

  readColors();
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(timer);
    setAmp(0);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
