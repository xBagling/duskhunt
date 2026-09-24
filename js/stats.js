// Global daily stats: submit your result, fetch how everyone else did.
import { CONFIG } from "./config.js";
import { ANIMALS, BY_ID } from "./animals.js";
import { store } from "./store.js";
import { regionFromTimeZone, seededRandom, hashString } from "./util.js";

const enabled = () => Boolean(CONFIG.STATS_API);

/** step: 1..6 when solved, 0 when the animal escaped. */
export function resultStep(game) {
  return game.status === "won" ? game.guesses.length : 0;
}

export async function submitResult(game) {
  if (!enabled() || !game.live || game.submitted || game.status === "playing") return false;
  try {
    const res = await fetch(`${CONFIG.STATS_API}/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: game.day,
        player: store.player,
        guesses: game.guesses,
        solved: game.status === "won",
        region: regionFromTimeZone(),
      }),
    });
    // 409 = already counted, 400 = can never be counted (e.g. too late). Either way, stop retrying.
    if (!res.ok && res.status !== 409 && res.status !== 400) return false;
    game.submitted = true;
    store.saveGame(game.day, game);
    return true;
  } catch {
    return false;
  }
}

/** Retry any finished live games that never reached the server (e.g. played offline). */
export function flushPending() {
  for (const game of Object.values(store.allGames())) {
    if (game.live && !game.submitted && game.status !== "playing") submitResult(game);
  }
}

export async function fetchStats(day) {
  if (!enabled()) return null;
  try {
    const res = await fetch(`${CONFIG.STATS_API}/stats?day=${day}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Share of players you did strictly better than, counting ties as half. Excludes yourself. */
export function beatPercent(stats, myStep) {
  const score = (step) => (step === 0 ? 0 : 7 - step);
  const mine = score(myStep);
  let worse = 0;
  let ties = 0;
  let total = 0;
  stats.dist.forEach((n, step) => {
    total += n;
    const s = score(step);
    if (s < mine) worse += n;
    else if (s === mine) ties += n;
  });
  ties = Math.max(0, ties - 1);
  total = Math.max(0, total - 1);
  if (!total) return null;
  return Math.round(((worse + ties / 2) / total) * 100);
}

/** Believable fake stats so admins can preview the results screen with a crowd. */
export function sampleCrowd(day, answerId) {
  const rand = seededRandom(hashString(`crowd-${day}-${answerId}`));
  const answer = BY_ID.get(answerId);
  const total = 400 + Math.floor(rand() * 4000);
  const weights = [0.12, 0.05, 0.12, 0.22, 0.26, 0.14, 0.09].map((w) => w * (0.6 + rand() * 0.8));
  const sum = weights.reduce((a, b) => a + b, 0);
  const dist = weights.map((w) => Math.round((w / sum) * total));

  const sameClass = ANIMALS.filter((a) => a.cls.key === answer.cls.key && a.id !== answerId);
  const silly = ANIMALS.filter((a) => a.cls.key === "Thing" || a.cls.key === "Mythical");
  const other = ANIMALS.filter((a) => a.cls.key !== answer.cls.key);
  const pick = (list) => list[Math.floor(rand() * list.length)].id;
  const wrong = {};
  const all = new Map();
  for (let step = 1; step <= 6; step++) {
    const pool = new Map();
    const guessers = dist.slice(step + 1).reduce((a, b) => a + b, 0) + dist[0];
    for (let i = 0; i < 6; i++) {
      const src = step <= 2 ? (rand() < 0.35 ? silly : rand() < 0.5 ? other : sameClass) : sameClass;
      const id = pick(src);
      pool.set(id, (pool.get(id) || 0) + Math.round(guessers * rand() * 0.25));
    }
    wrong[step] = [...pool].sort((a, b) => b[1] - a[1]).slice(0, 5);
    for (const [id, n] of pool) all.set(id, (all.get(id) || 0) + n);
  }
  wrong.all = [...all].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const regions = ["Europe", "North America", "Asia", "Oceania", "South America", "Africa"].map((region) => ({
    region,
    n: Math.round(total * (0.05 + rand() * 0.3)),
    avg: Math.round((1.5 + rand() * 2.5) * 10) / 10,
  }));
  regions.sort((a, b) => b.avg - a.avg);

  return { day, total: dist.reduce((a, b) => a + b, 0), dist, wrong, regions, sample: true };
}
