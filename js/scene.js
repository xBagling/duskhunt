// The living landscape behind every screen: a layered, cut-paper scene whose sky, sun, moon and
// wildlife follow the time of day. Time 0 = noon; each miss moves it on, 5 = night.
//
// Colours and positions live in CSS (driven by <html data-time>), so transitions are smooth and
// cheap. JS only builds the markup once and flips a few attributes.

const W = 1440;
const H = 640;

function rand(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pine = (x, y, h) => {
  const w = h * 0.42;
  return `<path d="M${x} ${y - h} L${x - w * 0.55} ${y - h * 0.45} H${x - w * 0.25} L${x - w} ${y} H${x + w} L${x + w * 0.25} ${y - h * 0.45} H${x + w * 0.55} Z"/><rect x="${x - 2.5}" y="${y - 2}" width="5" height="10"/>`;
};

const roundTree = (x, y, r) =>
  `<rect x="${x - 3.5}" y="${y - r * 1.2}" width="7" height="${r * 1.35}"/><circle cx="${x}" cy="${y - r * 1.55}" r="${r}"/><circle cx="${x - r * 0.72}" cy="${y - r * 1.15}" r="${r * 0.66}"/><circle cx="${x + r * 0.74}" cy="${y - r * 1.12}" r="${r * 0.62}"/>`;

const acacia = (x, y) =>
  `<path d="M${x - 3} ${y} L${x - 2} ${y - 34} L${x - 14} ${y - 48} L${x - 11} ${y - 50} L${x} ${y - 40} L${x + 12} ${y - 52} L${x + 15} ${y - 50} L${x + 3} ${y - 36} L${x + 4} ${y} Z"/><ellipse cx="${x}" cy="${y - 54}" rx="46" ry="9"/>`;

const cloud = (w) =>
  `<path d="M0 0 H${w} C${w} ${-w * 0.14} ${w * 0.88} ${-w * 0.2} ${w * 0.76} ${-w * 0.16} C${w * 0.72} ${-w * 0.36} ${w * 0.5} ${-w * 0.42} ${w * 0.38} ${-w * 0.28} C${w * 0.3} ${-w * 0.36} ${w * 0.12} ${-w * 0.32} ${w * 0.12} ${-w * 0.14} C${w * 0.04} ${-w * 0.14} 0 ${-w * 0.08} 0 0 Z"/>`;

// A soaring gull, drawn filled: tapered wings, a little weight at the body. Mostly it glides;
// now and then two slow, shallow wingbeats. i staggers each bird's clock so they never sync.
const bird = (x, y, s = 1, i = 0) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><g class="bd" style="animation-duration:${(3.4 + (i % 3) * 0.7).toFixed(1)}s;animation-delay:${(-i * 1.3).toFixed(1)}s"><path class="wing" style="animation-duration:${(6.5 + (i % 4) * 1.1).toFixed(1)}s;animation-delay:${(-i * 2.3).toFixed(1)}s" d="M-12 1.2C-8.6-2.6-4.4-3.9 0 .1 4.4-3.9 8.6-2.6 12 1.2 8.2-1 4.2-.6 0 2.4-4.2-.6-8.2-1-12 1.2Z"/></g></g>`;

const bat = `<path d="M0 0 C5 -8 11 -8 13 -1 C15 -4 17 -4 18 -1 C20 -8 26 -8 31 0 C26 -2 22 1 18 4 C16.5 2.5 14.5 2.5 13 4 C9 1 5 -2 0 0Z"/>`;

const tuft = (x, y) => `<path class="tuft" style="transform-origin:${x + 7}px ${y}px" d="M${x} ${y} L${x + 3} ${y - 13} L${x + 5.5} ${y - 2} L${x + 8} ${y - 16} L${x + 10} ${y - 2} L${x + 12.5} ${y - 11} L${x + 15} ${y} Z"/>`;

// The keeper's lantern: hangs on its post all day, and is lit for the last try.
const lantern = `<g class="lamp" transform="translate(902 548) scale(1.35) translate(-902 -548)">
    <g class="lamp-core"><circle class="flicker" cx="882" cy="497" r="34" fill="url(#g-lamp-core)"/></g>
    <g class="lamp-iron">
      <rect x="899.5" y="470" width="4.5" height="120" rx="1"/><circle cx="901.75" cy="467.5" r="3.2"/>
      <path d="M903 472.5H879.5M900 489c-6-1-10.5-6-12-15.5M882 474v7.5" fill="none" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M874.4 490.4 882 484.6l7.6 5.8z"/>
      <rect class="glass" x="876" y="490" width="12" height="13.5" rx="1.6" stroke-width="1.5"/>
      <g class="flame"><path d="M882 493.6c2.3 2.7 3.1 4.4 3.1 5.9a3.1 3.1 0 0 1-6.2 0c0-1.5.8-3.2 3.1-5.9z" fill="#ffb24f"/><path d="M882 497.2c1.1 1.3 1.5 2.1 1.5 2.8a1.5 1.5 0 0 1-3 0c0-.7.4-1.5 1.5-2.8z" fill="#fff6dc"/></g>
      <rect x="874.4" y="502.6" width="15.2" height="3.2" rx="1.2"/>
    </g>
    <g class="moths">
      <g transform="translate(882 497) scale(1 .62)"><g class="moth" style="--r:19px;animation-duration:3.1s"><path d="M0 0l-3.4-2.6.5 4.4zM0 0l3.4-2.6-.5 4.4z"/></g></g>
      <g transform="translate(882 499) scale(1 .45)"><g class="moth" style="--r:27px;animation-duration:4.7s;animation-direction:reverse;animation-delay:-1.6s"><path d="M0 0l-2.8-2.2.4 3.7zM0 0l2.8-2.2-.4 3.7z"/></g></g>
    </g>
  </g>`;

function markup() {
  const r = rand(20260922);
  let stars = "";
  for (let i = 0; i < 90; i++) {
    const x = r() * W;
    const y = r() * 400;
    const s = 0.6 + r() * 1.4;
    stars += `<circle ${i % 7 === 0 ? `class="tw" style="animation-delay:${(r() * 6).toFixed(1)}s"` : ""} cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${s.toFixed(1)}"/>`;
  }
  let flies = "";
  const spots = [
    [590, 520], [640, 560], [700, 500], [760, 548], [880, 520], [930, 570], [980, 500], [520, 575], [820, 590], [1100, 540], [300, 560], [1240, 520],
  ];
  spots.forEach(([x, y], i) => {
    flies += `<g class="fly" style="animation-delay:${(i * 0.7).toFixed(1)}s;animation-duration:${(5 + (i % 4)).toFixed(0)}s"><circle cx="${x}" cy="${y}" r="9" fill="url(#g-fire)"/><circle cx="${x}" cy="${y}" r="1.7" fill="#EFFAB0"/></g>`;
  });
  let burstBirds = "";
  let burstFlies = "";
  for (let i = 0; i < 9; i++) {
    const a = -Math.PI / 2 + (i - 4) * 0.28;
    const d = 240 + r() * 140;
    burstBirds += `<g class="b" style="--dx:${(Math.cos(a) * d).toFixed(0)}px;--dy:${(Math.sin(a) * d).toFixed(0)}px;animation-delay:${(i * 0.06).toFixed(2)}s">${bird(752, 420, 0.9, i)}</g>`;
    burstFlies += `<g class="b" style="--dx:${((r() - 0.5) * 260).toFixed(0)}px;--dy:${(-160 - r() * 220).toFixed(0)}px;animation-delay:${(i * 0.08).toFixed(2)}s"><circle cx="832" cy="520" r="8" fill="url(#g-fire)"/><circle cx="832" cy="520" r="1.8" fill="#EFFAB0"/></g>`;
  }
  return `
<svg class="scene-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sky-top"/><stop offset="1" class="sky-bot"/></linearGradient>
    <radialGradient id="g-sun"><stop offset="0" class="sun-glow-in"/><stop offset="1" class="sun-glow-out"/></radialGradient>
    <radialGradient id="g-moon"><stop offset="0" stop-color="#F4E9C8" stop-opacity=".32"/><stop offset="1" stop-color="#F4E9C8" stop-opacity="0"/></radialGradient>
    <radialGradient id="g-fire"><stop offset="0" stop-color="#E9F59A" stop-opacity=".9"/><stop offset=".45" stop-color="#D4F06B" stop-opacity=".35"/><stop offset="1" stop-color="#D4F06B" stop-opacity="0"/></radialGradient>
    <radialGradient id="g-lamp"><stop offset="0" stop-color="#FFC66E" stop-opacity=".55"/><stop offset=".22" stop-color="#FFB45C" stop-opacity=".24"/><stop offset=".55" stop-color="#FFAE55" stop-opacity=".06"/><stop offset="1" stop-color="#FFAE55" stop-opacity="0"/></radialGradient>
    <radialGradient id="g-lamp-core"><stop offset="0" stop-color="#FFF1C8" stop-opacity=".95"/><stop offset=".28" stop-color="#FFD27A" stop-opacity=".5"/><stop offset="1" stop-color="#FFB257" stop-opacity="0"/></radialGradient>
    <filter id="f-sil" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .07  0 0 0 0 .06  0 0 0 0 .13  0 0 0 1 0"/></filter>
    <filter id="f-rim" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 .8  0 0 0 0 .47  0 0 0 1 0"/><feGaussianBlur stdDeviation=".6"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g-sky)"/>
  <g class="stars">${stars}</g>
  <g class="moon"><circle r="90" fill="url(#g-moon)"/><circle r="21" fill="#F4E9C8"/><circle cx="-7" cy="-5" r="4" fill="#E4D5AC"/><circle cx="6" cy="7" r="3" fill="#E4D5AC"/><circle cx="8" cy="-8" r="1.8" fill="#E4D5AC"/></g>
  <g class="sun"><circle r="120" fill="url(#g-sun)"/><circle class="sun-disc" r="32"/></g>
  <g class="clouds">
    <g class="cloud" style="--y:118px;animation-duration:190s;animation-delay:-40s">${cloud(170)}</g>
    <g class="cloud" style="--y:205px;animation-duration:260s;animation-delay:-150s">${cloud(120)}</g>
    <g class="cloud" style="--y:92px;animation-duration:230s;animation-delay:-95s">${cloud(90)}</g>
    <g class="cloud" style="--y:265px;animation-duration:300s;animation-delay:-230s">${cloud(150)}</g>
  </g>
  <g class="birds">
    <g class="flock" style="--y:190px;animation-duration:58s;animation-delay:-10s"><g class="sway" style="animation-duration:13s">${bird(0, 0, 1, 0)}${bird(30, -12, 0.85, 1)}${bird(54, 5, 0.75, 2)}</g></g>
    <g class="flock" style="--y:262px;animation-duration:76s;animation-delay:-44s"><g class="sway" style="animation-duration:16s;animation-delay:-5s">${bird(0, 0, 0.8, 3)}${bird(24, 9, 0.7, 4)}</g></g>
    <g class="flock far" style="--y:138px;animation-duration:120s;animation-delay:-70s"><g class="sway" style="animation-duration:19s;animation-delay:-2s">${bird(0, 0, 0.5, 5)}${bird(15, -5, 0.45, 6)}${bird(28, 3, 0.45, 7)}</g></g>
  </g>
  <g class="bats">
    <g class="batf" style="--y:230px;animation-duration:17s">${bat}</g>
    <g class="batf" style="--y:300px;animation-duration:26s;animation-delay:-11s"><g transform="scale(.75)">${bat}</g></g>
  </g>
  <path class="far" d="M0 455 C140 420 260 432 380 418 S620 396 740 410 S980 430 1100 404 S1320 392 1440 412 V640 H0Z"/>
  <g class="mid">
    <path d="M0 505 C180 470 340 488 520 476 S700 462 780 470 S980 490 1120 478 S1320 470 1440 486 V640 H0Z"/>
    ${pine(612, 474, 62)}${pine(640, 472, 84)}${pine(668, 471, 56)}
    ${roundTree(760, 472, 26)}
    ${pine(214, 486, 70)}${pine(244, 484, 52)}${acacia(1150, 480)}${roundTree(1290, 478, 22)}
    <path d="M764 452 L796 444 L797 447 L766 456Z"/>
  </g>
  <g class="owl">
    <ellipse cx="787" cy="434" rx="7.5" ry="10.5"/><path d="M780.5 427 L781 419 L785 425Z M793.5 427 L793 419 L789 425Z"/>
    <g class="owl-eyes"><circle cx="784.5" cy="430" r="1.6" fill="#F2B66D"/><circle cx="789.5" cy="430" r="1.6" fill="#F2B66D"/></g>
  </g>
  <g class="lamp-halo"><circle class="flicker" cx="875" cy="486" r="175" fill="url(#g-lamp)"/></g>
  <g class="animal"><text class="rim" x="834.2" y="536.6" text-anchor="middle" font-size="60" filter="url(#f-rim)"></text><text x="832" y="538" text-anchor="middle" font-size="60" filter="url(#f-sil)"></text></g>
  <g class="eyes"><circle cx="824" cy="524" r="2.6"/><circle cx="840" cy="524" r="2.6"/></g>
  <g class="near">
    <path d="M0 590 C200 566 380 572 560 560 S740 538 830 532 S960 540 1080 556 S1320 572 1440 562 V640 H0Z"/>
    <rect x="688" y="514" width="5" height="44"/><path d="M670 512 H716 L725 520 L716 528 H670Z"/>
  </g>
  <g class="lamp-pool"><ellipse class="flicker" cx="866" cy="552" rx="170" ry="30" fill="url(#g-lamp)"/></g>
  ${lantern}
  <g class="paws">${[[852, 540, 0], [874, 546, 1], [896, 540, 2], [918, 547, 3], [941, 542, 4], [963, 549, 5], [986, 545, 6], [1008, 552, 7]]
    .map(([x, y, i]) => `<g class="pw" style="--i:${i}" transform="translate(${x} ${y}) rotate(80)"><ellipse rx="3.4" ry="2.8"/><circle cx="-2.9" cy="-3.9" r="1.3"/><circle cx="0" cy="-5" r="1.3"/><circle cx="2.9" cy="-3.9" r="1.3"/></g>`)
    .join("")}</g>
  <g class="flies">${flies}</g>
  <g class="ground">
    <path d="M0 606 C240 598 480 604 720 598 S1200 596 1440 604 V640 H0Z"/>
    ${[160, 300, 470, 560, 650, 880, 975, 1090, 1260].map((x) => tuft(x, 604)).join("")}
  </g>
  <g class="burst burst-day">${burstBirds}</g>
  <g class="burst burst-night">${burstFlies}</g>
</svg>
<button class="snail" type="button" aria-label="The keeper, a snail">
  <svg viewBox="0 0 48 34" aria-hidden="true">
    <path d="M4 31c0-2 1.6-3 3.6-3h24c2.6 0 3.8-1.4 4.2-3.8l1-6.6c.3-1.7 1.3-2.6 2.8-2.6s2.4 1.3 2.1 3l-1.2 7.8C39.7 31 36.8 33 32.4 33H5.2c-.7 0-1.2-.5-1.2-1.1z" fill="#E7C29A"/>
    <circle cx="18" cy="17" r="11" fill="#B86F48"/><circle cx="18.6" cy="17.6" r="6.2" fill="#9A5534"/><circle cx="19" cy="18" r="2.4" fill="#B86F48"/>
    <path d="M38.8 15.6 37.2 9.6M41.8 15.2 43 9.4" stroke="#E7C29A" stroke-width="2" stroke-linecap="round"/>
    <circle cx="37" cy="9" r="1.8" fill="#1B2340"/><circle cx="43.2" cy="8.8" r="1.8" fill="#1B2340"/>
  </svg>
  <span class="snail-say" aria-live="polite"></span>
</button>`;
}

let root = null;
let sayIdx = 0;
const LINES = ["…hm?", "I'm going as fast as I can.", "Shh. I'm listening.", "Slow and steady.", "Did you hear that?", "Mind the lettuce.", "Every animal is fast to me."];

export function mountScene(container) {
  root = container;
  container.insertAdjacentHTML("afterbegin", `<div class="scene-art">${markup()}</div>`);
  const snail = container.querySelector(".snail");
  snail.addEventListener("click", () => say(LINES[sayIdx++ % LINES.length]));
  let visible = true;
  const update = () => container.classList.toggle("paused", !visible || document.hidden);
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => ((visible = e.isIntersecting), update())).observe(container);
  document.addEventListener("visibilitychange", update);
}

export function say(text, ms = 2200) {
  const el = root?.querySelector(".snail-say");
  const snail = root?.querySelector(".snail");
  if (!el) return;
  el.textContent = text;
  snail.classList.remove("wiggle");
  void snail.offsetWidth;
  snail.classList.add("wiggle", "talking");
  clearTimeout(say.t);
  say.t = setTimeout(() => snail.classList.remove("talking"), ms);
}

/** 0 (noon) … 5 (night). */
export function setTime(t) {
  const d = document.documentElement;
  d.dataset.time = String(Math.max(0, Math.min(5, t)));
  d.dataset.dark = t >= 4 ? "1" : "0";
}

/** "tall" (start screen), "hero" (game), "strip" (inner pages). */
export function setSceneMode(mode) {
  document.body.dataset.scene = mode;
}

/** Something on the ridge. state: hidden | peek | full */
export function setAnimal(emoji, state = "hidden") {
  if (!root) return;
  const g = root.querySelector(".animal");
  g.querySelectorAll("text").forEach((t) => (t.textContent = emoji || ""));
  g.dataset.state = state;
  // Newer emoji (a goose, say) only exist in the Noto fallback font, which downloads on first use.
  // SVG text drawn before it arrives stays an empty box, so redraw once the glyph is in.
  if (emoji && document.fonts?.load) {
    document.fonts.load('60px "Noto Color Emoji"', emoji).then(() => {
      g.querySelectorAll("text").forEach((t) => {
        if (t.textContent === emoji) t.textContent = emoji;
      });
    }).catch(() => {});
  }
}

export function setEyes(on) {
  root?.querySelector(".eyes").classList.toggle("on", on);
}

/** The keeper's lantern, lit for the last try. It backlights the animal on the ridge. */
export function setLantern(on) {
  root?.querySelector(".scene-svg").classList.toggle("lamp-lit", on);
}

/** A warm flash of light over the landscape. strength 0..1. */
export function flash(strength = 1) {
  const art = root?.querySelector(".scene-art");
  if (!art) return;
  art.style.setProperty("--flash", String(strength));
  art.classList.remove("flash");
  void art.offsetWidth;
  art.classList.add("flash");
  setTimeout(() => art.classList.remove("flash"), 1300);
}

/** The animal on the ridge hops for joy, a few times. */
export function hop(times = 3) {
  const g = root?.querySelector(".animal");
  if (!g) return;
  g.style.setProperty("--hops", String(times));
  g.classList.remove("hop");
  void g.getBoundingClientRect();
  g.classList.add("hop");
  setTimeout(() => g.classList.remove("hop"), 1800);
}

/** It got away: paw prints appear one by one, trotting off along the ridge. */
export function pawTrail() {
  const s = root?.querySelector(".scene-svg");
  if (!s) return;
  s.classList.remove("pawtrail");
  void s.getBoundingClientRect();
  s.classList.add("pawtrail");
  setTimeout(() => s.classList.remove("pawtrail"), 5200);
}

export function celebrate() {
  if (!root) return;
  const s = root.querySelector(".scene-svg");
  s.classList.remove("celebrate");
  void s.getBoundingClientRect();
  s.classList.add("celebrate");
  setTimeout(() => s.classList.remove("celebrate"), 3200);
}

/** Loudness of the playing sound, 0..1. Makes grass and fireflies react. */
export function setAmp(v) {
  if (!root) return;
  root.style.setProperty("--amp", v.toFixed(3));
}
