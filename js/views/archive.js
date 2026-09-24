import { store } from "../store.js";
import { puzzleForDay, timeOfGame, tierOf } from "../puzzle.js";
import { MAX_GUESSES } from "../config.js";
import { icon } from "../icons.js";
import * as scene from "../scene.js";
import { $, $$, esc, todayDay, formatDay, dateFromDay } from "../util.js";

// Each card is a tiny version of the landscape at the moment the day ended for you:
// sky, hills and sun from the scene's palette, with the animal's silhouette on the ridge.
// Unplayed days are a misty morning with a question mark, waiting to be solved.
const SCAPES = [
  { top: "#6fb8e6", bot: "#d3eef8", far: "#a8d096", near: "#5e9c63", sun: "#ffe39a", sx: 58, sy: 20 },
  { top: "#83b6dd", bot: "#e8e8d4", far: "#adc88c", near: "#639561", sun: "#ffd873", sx: 70, sy: 26 },
  { top: "#d6a26b", bot: "#f8dea4", far: "#bca770", near: "#7a8354", sun: "#ffc65e", sx: 86, sy: 34 },
  { top: "#b95a6d", bot: "#f3a66d", far: "#9e6a5f", near: "#614346", sun: "#ff8b58", sx: 100, sy: 44 },
  { top: "#2c2a5e", bot: "#8b5a7e", far: "#4e3e66", near: "#2a2446", sun: "#f4e9c8", sx: 132, sy: 20, moon: true, stars: 0.6, dark: true },
  { top: "#070b24", bot: "#1d2458", far: "#1b2152", near: "#0f1436", sun: "#f4e9c8", sx: 128, sy: 17, moon: true, stars: 1, dark: true },
];
// Unplayed days: soft dawns that vary from day to day, so the grid doesn't turn into a grey wall.
const DAWNS = [
  { top: "#cfe3ea", bot: "#f7efe0", far: "#c4d8c0", near: "#a9c2a4", sun: null },
  { top: "#e9d7e4", bot: "#fbeee2", far: "#d6cbd6", near: "#bcaec4", sun: null },
  { top: "#f3dccb", bot: "#fdf3e4", far: "#dccfb8", near: "#c3b59a", sun: null },
  { top: "#d6e0f0", bot: "#f3f0ea", far: "#c9d2d8", near: "#aebcc6", sun: null },
];
const LEVEL = ["", "Easy", "Medium", "Hard"];
const SHORT = ["1/8×", "1/4×", "1/2×", "1×", "dusk", "night"];
const STARS = [[18, 12], [34, 26], [52, 8], [74, 18], [96, 10], [118, 24], [136, 12], [150, 30], [126, 36], [64, 32]];
const PAW = `<svg class="paw" viewBox="0 0 16 16" aria-hidden="true"><ellipse cx="8" cy="10.6" rx="3.4" ry="3"/><circle cx="3.6" cy="6.6" r="1.6"/><circle cx="6.4" cy="3.6" r="1.6"/><circle cx="9.6" cy="3.6" r="1.6"/><circle cx="12.4" cy="6.6" r="1.6"/></svg>`;

function status(day) {
  const g = store.game(day);
  if (!g || (g.status === "playing" && !g.guesses.length && !g.started)) return { key: "new", game: null };
  if (g.status === "playing") return { key: "playing", game: g };
  return { key: g.status, game: g };
}

const paletteFor = (s, day) => (s.key === "new" ? DAWNS[(day * 7) % DAWNS.length] : SCAPES[s.key === "lost" ? 5 : timeOfGame(s.game)]);

/** The mini landscape for one card. */
function scape(day, p) {
  const id = `sk${day}`;
  const stars = p.stars ? STARS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#f6efd9" opacity="${p.stars}"/>`).join("") : "";
  const light = p.sun
    ? p.moon
      ? `<circle cx="${p.sx}" cy="${p.sy}" r="7" fill="${p.sun}"/><circle cx="${p.sx + 3.5}" cy="${p.sy - 2.5}" r="6" fill="${p.top}"/>`
      : `<circle cx="${p.sx}" cy="${p.sy}" r="15" fill="${p.sun}" opacity=".35"/><circle cx="${p.sx}" cy="${p.sy}" r="8" fill="${p.sun}"/>`
    : "";
  return `<svg class="scape" viewBox="0 0 160 80" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.top}"/><stop offset="1" stop-color="${p.bot}"/></linearGradient></defs>
    <rect width="160" height="80" fill="url(#${id})"/>${stars}${light}
    <path d="M0 50C26 42 52 47 82 42S134 37 160 44V80H0Z" fill="${p.far}"/>
    <path d="M0 66C34 58 70 63 100 56S146 57 160 60V80H0Z" fill="${p.near}"/>
  </svg>`;
}

function card(day, today) {
  const s = status(day);
  const puzzle = puzzleForDay(day);
  const p = paletteFor(s, day);
  const href = day === today ? "#/" : `#/day/${day}`;
  const date = day === today ? "Today" : formatDay(day);
  let who, name, meta, label;
  if (s.key === "won") {
    who = `<span class="who sil">${esc(puzzle.animal.emoji)}</span>`;
    name = puzzle.animal.name;
    meta = `<span class="dtag found">${icon("check")} ${SHORT[s.game.guesses.length - 1]}</span>`;
    label = `Day ${day}: ${name}, found ${tierOf(s.game).when}`;
  } else if (s.key === "lost") {
    who = `<span class="who tracks">${PAW}${PAW}${PAW}</span>`;
    name = puzzle.animal.name;
    meta = `<span class="dtag gone">got away</span>`;
    label = `Day ${day}: ${name}, got away`;
  } else if (s.key === "playing") {
    const used = s.game.guesses.length;
    who = `<span class="who mystery">?</span>`;
    name = "In progress";
    meta = `<span class="tries">${Array.from({ length: MAX_GUESSES }, (_, i) => `<i class="${i < used ? "used" : ""}"></i>`).join("")}</span>`;
    label = `Day ${day}: in progress, ${used} of ${MAX_GUESSES} tries used`;
  } else {
    who = `<span class="who mystery">?</span>`;
    name = "Unsolved";
    meta = `<span class="level">${Array.from({ length: 3 }, (_, i) => `<i class="${i < puzzle.difficulty ? "on" : ""}">${PAW}</i>`).join("")}<b>${LEVEL[puzzle.difficulty]}</b></span>`;
    label = `Day ${day}: not played yet, ${LEVEL[puzzle.difficulty].toLowerCase()}`;
  }
  return `<a class="day-card is-${s.key}${p.dark ? " dark" : ""}${day === today ? " today" : ""}" href="${href}" aria-label="${esc(label)}">
    <div class="sky">${scape(day, p)}<span class="num">${day}</span>${who}${day === today ? `<span class="today-flag">Today</span>` : ""}</div>
    <div class="body"><div class="d-date">${esc(date)}</div><div class="d-name">${esc(name)}</div><div class="d-meta">${meta}</div></div>
  </a>`;
}

/** Monday-to-Sunday weeks, newest first. */
function weeks(today) {
  const out = [];
  let cur = null;
  for (let d = today; d >= 1; d--) {
    const date = dateFromDay(d);
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    const key = monday.toDateString();
    if (!cur || cur.key !== key) out.push((cur = { key, days: [] }));
    cur.days.push(d);
  }
  return out;
}

function weekTitle(w, i) {
  if (i === 0) return "This week";
  if (i === 1) return "Last week";
  const first = w.days[w.days.length - 1];
  const last = w.days[0];
  const sameMonth = dateFromDay(first).getMonth() === dateFromDay(last).getMonth();
  return `${formatDay(first, { month: "short", day: "numeric" })} – ${formatDay(last, sameMonth ? { day: "numeric" } : { month: "short", day: "numeric" })}`;
}

export function renderArchive({ hero, view }) {
  const today = todayDay();
  let filter = "all";
  scene.setSceneMode("strip");
  scene.setTime(2);
  scene.setAnimal("", "hidden");
  scene.setEyes(false);
  scene.setLantern(false);

  const keys = Array.from({ length: today }, (_, i) => status(i + 1).key);
  const found = keys.filter((k) => k === "won").length;
  const lost = keys.filter((k) => k === "lost").length;
  const open = today - found - lost;
  const pc = (n) => ((n / Math.max(1, today)) * 100).toFixed(2);

  hero.innerHTML = `<div class="page-head"><h1>Past days</h1><p>${today} days of animals</p></div>`;
  view.innerHTML = `<div class="wrap">
    <section class="card archive-summary" aria-label="Your progress">
      <div class="as-nums">
        <div><b>${found}</b><span>found</span></div>
        <div><b>${lost}</b><span>got away</span></div>
        <div><b>${open}</b><span>left to play</span></div>
      </div>
      <div class="as-bar" aria-hidden="true"><i class="won" style="width:${pc(found)}%"></i><i class="lost" style="width:${pc(lost)}%"></i></div>
      <button class="btn btn-dark btn-block" id="random" type="button" ${open ? "" : "disabled"}>${icon("shuffle")} ${open ? "Surprise me with an unsolved day" : "You've played every day"}</button>
    </section>
    <div class="filters" role="group" aria-label="Filter">
      <button class="chip" type="button" data-f="all" aria-pressed="true">All</button>
      <button class="chip" type="button" data-f="new" aria-pressed="false">Unsolved</button>
      <button class="chip" type="button" data-f="won" aria-pressed="false">Found</button>
      <button class="chip" type="button" data-f="lost" aria-pressed="false">Got away</button>
    </div>
    <div id="days"></div>
    <p class="logline" style="margin-top:18px">Archive games don't touch your streak</p>
  </div>`;

  function render() {
    const match = (k) => filter === "all" || k === filter || (filter === "new" && k === "playing");
    const groups = weeks(today)
      .map((w, i) => {
        const days = w.days.filter((d) => match(status(d).key));
        if (!days.length) return "";
        const done = w.days.filter((d) => status(d).key === "won").length;
        return `<section class="week">
          <header class="week-head"><h2>${esc(weekTitle(w, i))}</h2><span>${done} of ${w.days.length} found</span></header>
          <div class="days">${days.map((d) => card(d, today)).join("")}</div>
        </section>`;
      })
      .join("");
    $("#days", view).innerHTML = groups || `<p class="logline">Nothing here yet.</p>`;
  }

  $$(".chip[data-f]", view).forEach((c) =>
    c.addEventListener("click", () => {
      filter = c.dataset.f;
      $$(".chip[data-f]", view).forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
      render();
    })
  );
  $("#random", view).addEventListener("click", () => {
    const choices = [];
    for (let d = 1; d < today; d++) if (status(d).key === "new" || status(d).key === "playing") choices.push(d);
    location.hash = choices.length ? `#/day/${choices[Math.floor(Math.random() * choices.length)]}` : "#/";
  });
  render();
}
