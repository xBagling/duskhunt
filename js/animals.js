import { ANIMAL_LIST } from "./data/animal-list.js";
import { slugify } from "./util.js";

const EMOJI_TAIL = /\s+([\p{Extended_Pictographic}‍️\u{1F3FB}-\u{1F3FF}]+)$/u;

export function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’`.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parseHeader(line) {
  const [key, label, emoji] = line.slice(1).split("|").map((s) => s.trim());
  return { key, label, emoji: emoji || "" };
}

function parse(text) {
  const entries = [];
  let cls, order, family;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("//")) continue;
    if (line[0] === "@") {
      cls = parseHeader(line);
      order = family = null;
      continue;
    }
    if (line[0] === "#") {
      order = parseHeader(line);
      family = null;
      continue;
    }
    if (line[0] === "%") {
      family = parseHeader(line);
      continue;
    }
    for (let chunk of line.split(";")) {
      chunk = chunk.trim();
      if (!chunk) continue;
      let emoji = "";
      const m = chunk.match(EMOJI_TAIL);
      if (m) {
        emoji = m[1];
        chunk = chunk.slice(0, m.index).trim();
      }
      const [name, aliasText = ""] = chunk.split("=");
      const aliases = aliasText.split(",").map((a) => a.trim()).filter(Boolean);
      const fam = family || { key: `${order?.key}-misc`, label: order?.label || cls.label, emoji: "" };
      const ord = order || { key: `${cls.key}-misc`, label: cls.label, emoji: "" };
      entries.push({
        id: slugify(name.trim()),
        name: name.trim(),
        aliases,
        emoji: emoji || fam.emoji || ord.emoji || cls.emoji,
        ownEmoji: Boolean(emoji),
        cls,
        order: ord,
        family: fam,
        terms: [normalize(name), ...aliases.map(normalize)],
      });
    }
  }
  return entries;
}

export const ANIMALS = parse(ANIMAL_LIST);
export const BY_ID = new Map(ANIMALS.map((a) => [a.id, a]));

if (BY_ID.size !== ANIMALS.length) {
  const seen = new Set();
  for (const a of ANIMALS) {
    if (seen.has(a.id)) console.warn("Duplicate animal id:", a.id);
    seen.add(a.id);
  }
}

// ---------- Search ----------

function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2 = new Array(b.length + 1);
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    for (let j = 0; j <= b.length; j++) prev2[j] = prev[j];
    prev = cur;
  }
  return prev[b.length];
}

function scoreTerm(q, qTokens, term) {
  if (term === q) return 1000;
  if (term.startsWith(q)) return 800 - (term.length - q.length);
  const words = term.split(" ");
  if (qTokens.every((t) => words.some((w) => w.startsWith(t)))) return 600 - term.length;
  if (term.includes(q)) return 400 - term.length;
  if (q.length < 3) return 0;
  const max = q.length <= 4 ? 1 : q.length <= 7 ? 2 : 3;
  let best = editDistance(q, term, max);
  best = Math.min(best, editDistance(q, term.slice(0, q.length), max));
  for (const w of words) if (w.length >= 3) best = Math.min(best, editDistance(q, w, max));
  if (best <= max) return 250 - best * 60 - term.length * 0.5;
  return 0;
}

/**
 * Fuzzy search across every name and alias.
 * Returns [{ animal, alias }] where alias is the matched nickname (if it wasn't the main name).
 */
export function search(query, { limit = 8, exclude = new Set() } = {}) {
  const q = normalize(query);
  if (!q) return [];
  const qTokens = q.split(" ");
  const hits = [];
  for (const animal of ANIMALS) {
    if (exclude.has(animal.id)) continue;
    let best = 0;
    let alias = null;
    animal.terms.forEach((term, i) => {
      const s = scoreTerm(q, qTokens, term) - (i === 0 ? 0 : 15);
      if (s > best) {
        best = s;
        alias = i === 0 ? null : animal.aliases[i - 1];
      }
    });
    if (best > 0) hits.push({ animal, alias, score: best });
  }
  hits.sort((a, b) => b.score - a.score || a.animal.name.length - b.animal.name.length || a.animal.name.localeCompare(b.animal.name));
  return hits.slice(0, limit);
}

// ---------- Closeness ----------

export const LEVELS = {
  correct: { rank: 4, square: "✅", tone: "correct" },
  family: { rank: 3, square: "🟩", tone: "family" },
  order: { rank: 2, square: "🟨", tone: "order" },
  class: { rank: 1, square: "🟧", tone: "class" },
  none: { rank: 0, square: "🟥", tone: "none" },
  skip: { rank: -1, square: "⬜", tone: "skip" },
};

/** "a mammal" / "an insect" */
export const withArticle = (word) => (/^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`);

export function closeness(guessId, answerId) {
  if (guessId == null) return { level: "skip", text: "Skipped. Speeding up…" };
  const g = BY_ID.get(guessId);
  const a = BY_ID.get(answerId);
  if (!g || !a) return { level: "none", text: "Unknown guess" };
  if (g.id === a.id) return { level: "correct", text: "That's it!" };
  const sameClass = g.cls.key === a.cls.key;
  if (sameClass && g.family.key === a.family.key) return { level: "family", text: `Same family: ${a.family.label.toLowerCase()}` };
  if (sameClass && g.order.key === a.order.key) return { level: "order", text: `Same group: ${a.order.label.toLowerCase()}` };
  if (sameClass) return { level: "class", text: `Right class. It's ${withArticle(a.cls.label.toLowerCase())}` };
  if (g.cls.key === "Thing") return { level: "none", text: "Not even alive. It's a real animal" };
  if (g.cls.key === "Mythical") return { level: "none", text: "Mythical. The mystery animal is real" };
  if (g.cls.key === "Dinosauria" || g.cls.key === "Pterosauria") return { level: "none", text: "Extinct. The mystery animal is alive" };
  return { level: "none", text: `The mystery animal isn't ${withArticle(g.cls.label.toLowerCase())}` };
}

export function groupLabel(animal) {
  if (animal.cls.key === "Thing" || animal.cls.key === "Mythical") return animal.cls.label;
  return `${animal.cls.label} · ${animal.family.label}`;
}
