import { CONFIG } from "./config.js";

// ---------- DOM ----------

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

/** Tagged template that escapes interpolations unless they are wrapped with raw(). */
export function html(strings, ...values) {
  return strings.reduce((out, str, i) => {
    if (i === 0) return str;
    const v = values[i - 1];
    const s = v && v.__raw ? v.value : Array.isArray(v) ? v.map((x) => (x && x.__raw ? x.value : esc(x))).join("") : esc(v);
    return out + s + str;
  }, "");
}
export const raw = (value) => ({ __raw: true, value: String(value ?? "") });

let toastTimer;
export function toast(message) {
  let el = $("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.setAttribute("role", "status");
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// ---------- Days ----------
// Day numbers are based on the player's local calendar date, like Wordle.

const MS_DAY = 86_400_000;
const [LY, LM, LD] = CONFIG.LAUNCH_DATE.split("-").map(Number);
const LAUNCH_UTC = Date.UTC(LY, LM - 1, LD);

export function dayFromDate(date) {
  return Math.round((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - LAUNCH_UTC) / MS_DAY) + 1;
}
export const todayDay = () => dayFromDate(new Date());

export function dateFromDay(day) {
  const d = new Date(LAUNCH_UTC + (day - 1) * MS_DAY);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function formatDay(day, opts = { weekday: "short", month: "short", day: "numeric" }) {
  return dateFromDay(day).toLocaleDateString("en-US", opts);
}

export function isoFromDay(day) {
  const d = dateFromDay(day);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function dayFromIso(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return dayFromDate(new Date(y, m - 1, d));
}

export function msUntilMidnight() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next - now;
}

export function formatCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// ---------- Misc ----------

export function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0);

export function speedLabel(speed) {
  return { 0.125: "1/8×", 0.25: "1/4×", 0.5: "1/2×", 1: "1×" }[speed] ?? `${speed}×`;
}

export function speedWords(speed) {
  return { 0.125: "1/8 speed", 0.25: "1/4 speed", 0.5: "1/2 speed", 1: "full speed" }[speed] ?? `${speed}× speed`;
}

export async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function regionFromTimeZone() {
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {}
  const [area, city = ""] = tz.split("/");
  const southAmerica =
    /^(Sao_Paulo|Argentina|Buenos_Aires|Bogota|Lima|Santiago|Caracas|Montevideo|La_Paz|Asuncion|Guayaquil|Belem|Fortaleza|Recife|Manaus|Cuiaba|Porto_Velho|Boa_Vista|Rio_Branco|Paramaribo|Cayenne|Guyana|Punta_Arenas|Campo_Grande|Maceio|Araguaina|Bahia|Santarem|Noronha)/;
  if (area === "America") return southAmerica.test(city) ? "South America" : "North America";
  if (area === "Europe" || area === "Atlantic") return "Europe";
  if (area === "Africa") return "Africa";
  if (area === "Asia" || area === "Indian") return "Asia";
  if (area === "Australia" || area === "Pacific") return "Oceania";
  return "Somewhere wild";
}

export const REGION_EMOJI = {
  Europe: "🌍",
  Africa: "🌍",
  "North America": "🌎",
  "South America": "🌎",
  Asia: "🌏",
  Oceania: "🌏",
  "Somewhere wild": "🧭",
};
