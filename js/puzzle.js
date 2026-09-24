import { ANSWERS, DEMO_ID } from "./data/answers.js";
import { SCHEDULE } from "./data/schedule.js";
import { LOCAL_SOUNDS } from "./data/sound-hosting.js";
import { BY_ID, ANIMALS, closeness, normalize, withArticle } from "./animals.js";
import { CONFIG, MAX_GUESSES } from "./config.js";
import { hashString } from "./util.js";

// The schedule is lightly encoded so today's answer isn't sitting in plain sight in the source.
const IDS = JSON.parse(atob(SCHEDULE.split("").reverse().join("")));

export const SCHEDULE_LENGTH = IDS.length;

export function answerIdForDay(day) {
  if (day < 1) return null;
  return IDS[(day - 1) % IDS.length];
}

export function puzzleForDay(day) {
  const id = answerIdForDay(day);
  if (!id) return null;
  return makePuzzle(id, day);
}

export function makePuzzle(id, day = 0) {
  const animal = BY_ID.get(id);
  const data = ANSWERS[id];
  if (!animal || !data) throw new Error(`Missing answer data for "${id}"`);
  const sound = { ...data.sound, src: LOCAL_SOUNDS[id] || data.sound.src };
  return { day, id, animal, ...data, sound };
}

export const demoPuzzle = () => makePuzzle(DEMO_ID);

// ---------- Game helpers ----------

/** 1-based step you're on (1..6). */
export function stepOf(game) {
  return Math.min(game.guesses.length + 1, MAX_GUESSES);
}

export function speedForStep(step) {
  return CONFIG.SPEEDS[Math.max(0, Math.min(step, MAX_GUESSES) - 1)];
}

// ---------- Rules: normal and hard mode ----------
//
// Normal mode is kinder about lookalikes:
// • "Right kind": same family and the same kind of name (Periodical cicada vs Cicada, Arctic fox vs
//   Red fox) gets the warmest feedback, and the first one each game is free: it costs no try.
// • "Close enough": species listed in the answer's `accept` (ones even an expert couldn't tell
//   apart by ear) count as found.
// Hard mode (per game, from the saved setting) is exact: only the species itself counts.

const kindWord = (animal) => normalize(animal.name).split(" ").pop();

/** Species that count as found for this answer, outside hard mode. */
export const closeEnoughIds = (answerId) => ANSWERS[answerId]?.accept || [];

/** Everything in the answer's family with the same kind of name: the "right kind" guesses. */
export function rightKindOf(answerId) {
  const a = BY_ID.get(answerId);
  if (!a) return [];
  const word = kindWord(a);
  return ANIMALS.filter((x) => x.id !== a.id && x.cls.key === a.cls.key && x.family.key === a.family.key && kindWord(x) === word);
}

/** closeness(), plus the normal-mode levels: "kind", and "correct" for close-enough species. */
export function judge(game, guessId, answerId) {
  const c = closeness(guessId, answerId);
  if (game?.hard || guessId == null || c.level === "correct") return c;
  const a = BY_ID.get(answerId);
  const g = BY_ID.get(guessId);
  if (closeEnoughIds(answerId).includes(guessId)) return { level: "correct", near: true, text: `Close enough! It's ${withArticle(a.name.toLowerCase())}, to be exact` };
  if (c.level === "family" && kindWord(g) === kindWord(a)) return { level: "kind", text: `Right kind. It's ${withArticle(kindWord(a))}, just not that one` };
  return c;
}

/** Guesses in the order they were made, with the free one (if any) back in its place. */
export function timeline(game) {
  const t = game.guesses.map((id) => ({ id, free: false }));
  if (game.free) t.splice(game.free.at, 0, { id: game.free.id, free: true });
  return t;
}

/** Every animal already guessed this game, counted or free. */
export const guessedIds = (game) => [...game.guesses, game.free?.id].filter(Boolean);

export function applyGuess(game, guessId, answerId) {
  if (game.status !== "playing") return game;
  const j = judge(game, guessId, answerId);
  // The first right-kind guess is on the house: it doesn't use a try or move the day on.
  if (j.level === "kind" && !game.free) {
    game.free = { id: guessId, at: game.guesses.length };
    return game;
  }
  game.guesses.push(guessId);
  if (j.level === "correct") game.status = "won";
  else if (game.guesses.length >= MAX_GUESSES) game.status = "lost";
  if (game.status !== "playing") game.finishedAt = Date.now();
  return game;
}

/** Scene time for a game: 0 = noon … 5 = night. */
export function timeOfGame(game) {
  if (!game) return 0;
  if (game.status === "won") return game.guesses.length - 1;
  if (game.status === "lost") return 5;
  return Math.min(game.guesses.length, 5);
}

// ---------- Tiers: how quickly you found it ----------

export const TIERS = [
  { key: "snail", name: "Snail ears", emoji: "☀️", when: "at 1/8 speed", line: "You heard it through a pillow. Absurd." },
  { key: "tortoise", name: "Tortoise", emoji: "🌤️", when: "at 1/4 speed", line: "Slow and steady. Sharp ears." },
  { key: "hare", name: "Hare ears", emoji: "🌅", when: "at 1/2 speed", line: "Quick ears. Nicely done." },
  { key: "cheetah", name: "Cheetah", emoji: "🌇", when: "at full speed", line: "Real speed, real answer." },
  { key: "owl", name: "Owl eyes", emoji: "🌆", when: "at dusk", line: "Spotted its shape against the sunset." },
  { key: "bat", name: "Bat ears", emoji: "🌙", when: "in the dark", line: "Found it in the dark. It counts." },
  { key: "gone", name: "Got away", emoji: "🐾", when: "", line: "It slipped off into the night." },
];

/** 0..5 = solved on that try, 6 = got away. */
export function tierIndex(game) {
  return game.status === "won" ? game.guesses.length - 1 : 6;
}

export const tierOf = (game) => TIERS[tierIndex(game)];

// ---------- One-liners for each guess ----------

const VERDICTS = {
  none: ["Cold.", "Wrong corner of the zoo.", "Not even close."],
  class: ["Getting there.", "Right class.", "Narrowing in."],
  order: ["Warm.", "Warmer.", "Getting warm."],
  family: ["So close.", "Whisker close.", "Almost. A cousin."],
  kind: ["Right kind!", "Nearly there!", "Oh, so close!"],
  correct: ["That's it!", "Got it!", "Spot on!"],
  skip: ["Speeding up…"],
};

/** free: this guess was the free right-kind one. */
export function verdictFor(guessId, answerId, game = null, { free = false } = {}) {
  const c = judge(game, guessId, answerId);
  const g = guessId ? BY_ID.get(guessId) : null;
  let title;
  if (g?.cls.key === "Thing") title = `A ${g.name.toLowerCase()}? Bold.`;
  else if (g?.cls.key === "Mythical") title = "Nice try.";
  else if (g?.cls.key === "Dinosauria" || g?.cls.key === "Pterosauria") title = "Too extinct.";
  else {
    const list = VERDICTS[c.level];
    title = list[hashString(`${guessId}:${answerId}`) % list.length];
  }
  if (c.near) title = "Close enough!";
  return { level: c.level, near: Boolean(c.near), title, detail: free ? `${c.text}. This guess is free` : c.text };
}

// ---------- Sharing ----------

// Share row: each wrong guess "hatches" a little more the closer it was, then the sky you found it
// under (☀️ noon … 🌙 night), or paw prints if it got away. No tier animals: people read those as
// the answer.
export const SHARE_ICONS = { none: "🥚", class: "🐣", order: "🐤", family: "🐔", kind: "🪺", skip: "💨" };

export function squares(game, answerId) {
  const used = timeline(game).map(({ id }) => {
    const lv = judge(game, id, answerId).level;
    return lv === "correct" ? TIERS[game.guesses.length - 1].emoji : SHARE_ICONS[lv];
  });
  if (game.status === "lost") used.push(TIERS[6].emoji);
  return used.join("");
}

export function shareText(puzzle, game, beat) {
  const t = tierOf(game);
  const tags = [game.hard && "hard", game.replay ? "replay" : !game.live && "archive"].filter(Boolean);
  const lines = [`Dusk Hunt #${puzzle.day}${tags.length ? ` (${tags.join(", ")})` : ""}`, squares(game, puzzle.id)];
  lines.push(game.status === "won" ? `Found it ${t.when}${beat != null ? ` · beat ${beat}%` : ""}` : "It got away");
  lines.push(location.origin + location.pathname);
  return lines.join("\n");
}
