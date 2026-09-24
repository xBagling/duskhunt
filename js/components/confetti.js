// Paper confetti for a win: pieces in the game's own colours that tumble, flip and flutter down.
// One canvas over the page, created on first use and removed when the last piece has landed.

const COLORS = ["#f4c24d", "#e0503f", "#63b866", "#2bb3a0", "#6fb8e6", "#fff4d6", "#f08a4b"];

let canvas = null;
let ctx = null;
let pieces = [];
let raf = 0;

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.className = "confetti";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  ctx = canvas.getContext("2d");
  resize();
  addEventListener("resize", resize);
}

function resize() {
  if (!canvas) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function piece(x, y, angle, speed) {
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    w: 6 + Math.random() * 6,
    h: 9 + Math.random() * 8,
    round: Math.random() < 0.22,
    color: COLORS[(Math.random() * COLORS.length) | 0],
    spin: (Math.random() - 0.5) * 0.3,
    rot: Math.random() * Math.PI,
    flip: Math.random() * Math.PI,
    flipSpeed: 0.08 + Math.random() * 0.12,
    sway: Math.random() * Math.PI * 2,
    life: 0,
  };
}

function tick() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces = pieces.filter((p) => p.y < innerHeight + 40 && p.life < 600);
  for (const p of pieces) {
    p.life++;
    p.vy += 0.12; // gravity
    p.vx *= 0.97; // paper has a lot of air resistance: it flutters down instead of dropping
    p.vy *= 0.96;
    p.sway += 0.05;
    p.x += p.vx + Math.sin(p.sway) * 0.6;
    p.y += p.vy;
    p.rot += p.spin;
    p.flip += p.flipSpeed;
    const fade = p.life > 540 ? 1 - (p.life - 540) / 60 : 1;
    ctx.save();
    ctx.globalAlpha = Math.max(0, fade);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(1, Math.cos(p.flip)); // the paper turning over
    ctx.fillStyle = p.color;
    if (p.round) {
      ctx.beginPath();
      ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  if (pieces.length) raf = requestAnimationFrame(tick);
  else {
    cancelAnimationFrame(raf);
    raf = 0;
    canvas.remove();
    removeEventListener("resize", resize);
    canvas = null;
  }
}

function start() {
  if (!raf) raf = requestAnimationFrame(tick);
}

/** A burst from a point (page coordinates), fanning upwards. power 0..1 scales the party. */
export function confettiBurst(x, y, power = 1) {
  if (reducedMotion()) return;
  ensureCanvas();
  const n = Math.round(15 + 155 * power); // a late find gets a puff, a first-try find a storm
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.1;
    pieces.push(piece(x, y, angle, 10 + Math.random() * 12 * (0.7 + power * 0.5)));
  }
  start();
}

/** Two cannons firing up and inwards from the bottom corners, for the very best finds. */
export function confettiCannons(power = 1) {
  if (reducedMotion()) return;
  ensureCanvas();
  const n = Math.round(40 + 60 * power);
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < n; i++) {
      const angle = side ? -Math.PI * 0.68 + (Math.random() - 0.5) * 0.5 : -Math.PI * 0.32 + (Math.random() - 0.5) * 0.5;
      pieces.push(piece(side ? innerWidth + 10 : -10, innerHeight * 0.85, angle, 16 + Math.random() * 14));
    }
  }
  start();
}

/** Confetti drifting down from above the top edge, for the bigger wins. */
export function confettiRain(power = 1) {
  if (reducedMotion()) return;
  ensureCanvas();
  const n = Math.round(40 + 90 * power);
  for (let i = 0; i < n; i++) {
    const p = piece(Math.random() * innerWidth, -20 - Math.random() * innerHeight * 0.25, Math.PI / 2, 1 + Math.random() * 2);
    p.vx = (Math.random() - 0.5) * 2;
    pieces.push(p);
  }
  start();
}
