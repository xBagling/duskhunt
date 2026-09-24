// Everything a player keeps lives in localStorage. No accounts, no email.
import { todayDay } from "./util.js";

const KEY = "duskhunt:v1";
// Saves from the first release live under this key; load() moves them over once.
const LEGACY_KEY = "slowzoo:v1";

function blank() {
  return {
    player: crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    seenHelp: false,
    sfxMuted: false,
    hardMode: false,
    games: {},
  };
}

let state = load();

function load() {
  try {
    let raw = localStorage.getItem(KEY);
    if (raw === null && (raw = localStorage.getItem(LEGACY_KEY)) !== null) {
      localStorage.setItem(KEY, raw);
      localStorage.removeItem(LEGACY_KEY);
    }
    const parsed = JSON.parse(raw);
    if (parsed && parsed.player && parsed.games) return parsed;
  } catch {}
  return blank();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export const store = {
  get player() {
    return state.player;
  },
  get seenHelp() {
    return state.seenHelp;
  },
  set seenHelp(v) {
    state.seenHelp = v;
    persist();
  },
  /** Hard mode: only the exact species counts and every guess costs a try. */
  get hardMode() {
    return Boolean(state.hardMode);
  },
  set hardMode(v) {
    state.hardMode = Boolean(v);
    persist();
  },
  get sfxMuted() {
    return Boolean(state.sfxMuted);
  },
  set sfxMuted(v) {
    state.sfxMuted = v;
    persist();
  },

  game(day) {
    return state.games[day] || null;
  },
  saveGame(day, game) {
    state.games[day] = game;
    persist();
  },
  deleteGame(day) {
    delete state.games[day];
    persist();
  },
  allGames() {
    return state.games;
  },
  exportJson() {
    return JSON.stringify(state, null, 2);
  },
  reset() {
    state = blank();
    persist();
  },
};

export function newGame(day, live) {
  return { day, guesses: [], status: "playing", live, hard: Boolean(state.hardMode), started: false, submitted: false, startedAt: Date.now(), finishedAt: null };
}

/** Personal stats only count games played on their own day ("live" games). */
export function personalStats() {
  const games = Object.values(state.games);
  const live = games.filter((g) => g.live && g.status !== "playing");
  const wins = live.filter((g) => g.status === "won");
  const dist = [0, 0, 0, 0, 0, 0, 0]; // [escaped, step1..step6]
  for (const g of live) dist[g.status === "won" ? g.guesses.length : 0]++;

  const finishedDays = new Set(live.map((g) => g.day));
  const today = todayDay();
  let current = 0;
  for (let d = finishedDays.has(today) ? today : today - 1; finishedDays.has(d); d--) current++;

  let max = 0;
  let run = 0;
  const sorted = [...finishedDays].sort((a, b) => a - b);
  sorted.forEach((d, i) => {
    run = i > 0 && sorted[i - 1] === d - 1 ? run + 1 : 1;
    max = Math.max(max, run);
  });

  return {
    played: live.length,
    wins: wins.length,
    winRate: live.length ? Math.round((wins.length / live.length) * 100) : 0,
    current,
    max,
    dist,
    archivePlayed: games.filter((g) => !g.live && g.status !== "playing").length,
  };
}
