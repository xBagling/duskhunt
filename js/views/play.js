import { MAX_GUESSES } from "../config.js";
import { BY_ID, withArticle } from "../animals.js";
import { loadClip } from "../audio.js";
import { store, newGame, personalStats } from "../store.js";
import { puzzleForDay, stepOf, speedForStep, applyGuess, verdictFor, timeOfGame, judge, timeline, guessedIds } from "../puzzle.js";
import { createSearch } from "../components/search.js";
import { createVisualizer } from "../components/visualizer.js";
import { modeSwitch } from "../components/modeswitch.js";
import { winLevel, winTitle, cheerLanding, cheerReveal, mournLoss } from "../components/celebrate.js";
import { renderResults, renderRecap } from "./results.js";
import { admin } from "./admin.js";
import { icon } from "../icons.js";
import { sfx } from "../sfx.js";
import * as scene from "../scene.js";
import { $, $$, esc, html, raw, toast, formatDay } from "../util.js";

const CONTINENTS = ["North America", "South America", "Europe", "Africa", "Asia", "Oceania", "Oceans"];
const METER = ["1/8×", "1/4×", "1/2×", "1×", "dusk", "night"];
const SPEED_WORD = { 0.125: "1/8 speed", 0.25: "1/4 speed", 0.5: "1/2 speed", 1: "full speed" };
const FACTS = [
  "At ⅛ speed, a mouse can sound like a whale.",
  "Slowing a sound drops its pitch.",
  "Lots of animals are busiest at dusk and dawn.",
  "Full speed now. Listen for the rhythm.",
  "Look at the ridge. Something's standing there.",
  "Last light. The keeper lit the lantern.",
];
// Tree-of-life lines a guess can land on. Hard mode has no "right kind" line.
const levelsFor = (game) => (game.hard ? ["none", "class", "order", "family", "correct"] : ["none", "class", "order", "family", "kind", "correct"]);

/**
 * mode: "today"   — the daily puzzle; counts for streaks and global stats
 *       "archive" — a past day; saved locally, not submitted
 *       "test"    — admin test play; nothing saved or submitted
 */
export function renderGame({ hero, view, day, mode }) {
  const puzzle = puzzleForDay(day);
  const answer = puzzle.animal;
  // "replay" plays the day again just for fun: kept in memory, never replaces the first result.
  let game =
    mode === "test" ? admin.testGame(day) : mode === "replay" ? { ...newGame(day, false), started: true, replay: true } : store.game(day) || newGame(day, mode === "today");
  const persist = () => (mode === "test" ? admin.saveTestGame(game) : mode === "replay" ? null : store.saveGame(day, game));

  const sceneEl = $("#scene");
  const meter = $("#meter");
  const drop = $("#drop");
  const tag = $("#tag");
  const verdict = $("#verdict");

  let clip = null;
  let clipState = "idle"; // idle | loading | ready | error
  let selected = 1; // which speed step the play button plays
  let busy = false;
  let search = null;
  const cleanups = [];
  // The guess animation runs on timers. They stop when you leave the page, so a quick tap on
  // "Past days" mid-celebration can't have the old results drawn over the new page.
  let alive = true;
  cleanups.push(() => (alive = false));
  const later = (fn, ms) => setTimeout(() => alive && fn(), ms);
  let stopViz = null;

  // ---------- Audio ----------
  function ensureClip() {
    if (clip || clipState === "loading") return Promise.resolve(clip);
    clipState = "loading";
    paintPlay();
    return loadClip(puzzle.sound)
      .then((c) => {
        clip = c;
        clipState = "ready";
        paintPlay();
        paintSpeed();
        return c;
      })
      .catch((err) => {
        console.error("Could not load sound", err);
        clipState = "error";
        paintPlay();
        return null;
      });
  }

  function playStep(step, opts = {}) {
    if (!clip) return;
    selected = step;
    clip.play(speedForStep(step), { ...opts, onEnd: paintPlay });
    paintPlay();
    paintSpeed();
  }

  function togglePlay() {
    if (clipState === "error") {
      clipState = "idle";
      ensureClip();
      return;
    }
    if (!clip) return ensureClip().then((c) => c && playStep(selected));
    if (clip.playing) {
      clip.stop();
      paintPlay();
    } else playStep(selected);
  }

  function onKey(e) {
    if (e.code !== "Space" || e.target.closest("input, textarea, button, a, select")) return;
    if (!$(".play-btn", hero)) return;
    e.preventDefault();
    togglePlay();
  }
  document.addEventListener("keydown", onKey);
  cleanups.push(() => document.removeEventListener("keydown", onKey));
  cleanups.push(() => clip?.stop());
  cleanups.push(() => {
    stopViz?.();
    meter.hidden = true;
    drop.className = "drop";
    tag.style.opacity = 0;
    verdict.classList.remove("on", "win", "legend", "great", "good", "phew", "lose");
    sceneEl.classList.remove("theater");
  });

  // =====================================================================
  // Intro: the start ritual
  // =====================================================================
  function showIntro() {
    scene.setSceneMode("tall");
    scene.setTime(0);
    scene.setAnimal(answer.emoji, "hidden");
    scene.setEyes(false);
    scene.setLantern(false);
    meter.hidden = true;
    // Archive days carry an extra word, so they use the short date to stay on one line.
    const when = formatDay(day, mode === "archive" ? undefined : { weekday: "long", month: "long", day: "numeric" });
    hero.innerHTML = html`
      ${raw(mode === "test" ? admin.bannerHtml(puzzle) : "")}
      <div class="intro">
        <div class="day">Day ${String(day).padStart(3, "0")} · ${when}${mode === "archive" ? " · archive" : ""}</div>
        <h1>Dusk Hunt</h1>
        <p class="tag-line">One animal a day. Slowed right down.</p>
        <ul class="rules">
          <li>You hear it at 1/8 speed.</li>
          <li>Every miss speeds it up.</li>
          <li>And the sun goes down.</li>
          <li><b>Find it before dark.</b></li>
        </ul>
        <button class="cta" type="button" id="start">${raw(icon("play"))} ${mode === "today" ? "Start listening" : "Play this day"}</button>
        <div class="links"><button type="button" data-action="help">How it works</button><a href="#/archive">Past days</a></div>
        ${raw(modeSwitch())}
      </div>`;
    view.innerHTML = `<div class="wrap" id="intro-ground"></div>`;
    const ground = $("#intro-ground", view);
    if (mode === "today" && day > 1) {
      ground.insertAdjacentHTML("beforeend", `<div class="card" id="recap"></div>`);
      renderRecap($("#recap", view), day - 1);
    }
    const s = personalStats();
    if (s.played) ground.insertAdjacentHTML("beforeend", `<p class="logline">Streak <b>${s.current}</b> · Played <b>${s.played}</b> · Solved <b>${s.winRate}%</b></p>`);
    $("#start", hero).addEventListener("click", () => {
      sfx.tap();
      game.started = true;
      game.hard = store.hardMode; // the mode is fixed once the game starts
      persist();
      showPlaying(true);
    });
    ensureClip(); // warm the sound while they read
  }

  // =====================================================================
  // Playing
  // =====================================================================
  function showPlaying(autoplay) {
    scene.setSceneMode("hero");
    applySceneForProgress();
    selected = stepOf(game);
    hero.innerHTML = html`
      ${raw(mode === "test" ? admin.bannerHtml(puzzle) : "")}
      <div class="hud">
        <span>Day ${String(day).padStart(3, "0")}${raw(game.hard ? ' <b class="hard-badge">hard</b>' : "")}</span>
        <ol class="tries" aria-label="Tries"></ol>
        <span class="streak">${raw(icon("flame"))} ${personalStats().current}</span>
      </div>
      <div class="stage">
        <div class="player">
          <canvas aria-hidden="true"></canvas>
          <button class="play-btn" type="button" id="play"></button>
        </div>
        <div class="speed-line" id="speed-line"></div>
        <div class="replay" id="replay" role="group" aria-label="Replay a speed"></div>
        <p class="fact" id="fact"></p>
      </div>`;
    view.innerHTML = `<div class="wrap">
        <div class="hints" id="hints"></div>
        <div class="guesses" id="guesses" aria-label="Your guesses"></div>
        <div class="guess-bar" id="guess-bar"></div>
      </div>`;

    $("#play", hero).addEventListener("click", togglePlay);
    stopViz?.();
    stopViz = createVisualizer($(".player canvas", hero), {
      isPlaying: () => Boolean(clip?.playing),
      speed: () => speedForStep(selected),
    });
    buildGuessBar();
    paintAll();
    if (finePointer()) search.focus();
    if (autoplay) ensureClip().then((c) => c && playStep(selected));
    else ensureClip();
  }

  function applySceneForProgress() {
    const g = game.guesses.length;
    scene.setTime(Math.min(g, 5));
    scene.setAnimal(answer.emoji, g >= 4 ? "peek" : "hidden");
    scene.setLantern(g >= 5);
    scene.setEyes(false);
  }

  // ---------- Painting ----------
  function paintPlay() {
    const btn = $("#play", hero);
    if (!btn) return;
    const playing = Boolean(clip?.playing);
    const speed = speedForStep(selected);
    // The speed is written underneath, so the button only says something when it can't play.
    const note = clipState === "loading" ? "loading" : clipState === "error" ? "retry" : "";
    btn.classList.toggle("playing", playing);
    btn.classList.toggle("loading", clipState === "loading");
    btn.classList.toggle("error", clipState === "error");
    btn.innerHTML = `${icon(clipState === "error" ? "replay" : playing ? "stop" : "play")}${note ? `<span class="pb-label">${note}</span>` : ""}`;
    btn.setAttribute("aria-label", playing ? "Stop" : clipState === "error" ? "The sound didn't load. Retry" : `Play at ${SPEED_WORD[speed]}`);
  }

  function paintSpeed() {
    const line = $("#speed-line", hero);
    if (!line) return;
    const speed = speedForStep(selected);
    const secs = clip ? Math.round(clip.durationAt(speed)) : null;
    line.textContent = `${SPEED_WORD[speed]}${secs ? ` · ${secs}s` : ""}`;
    const cur = stepOf(game);
    const speeds = [1, 2, 3, 4];
    $("#replay", hero).innerHTML = speeds
      .map((s) => {
        const unlocked = game.status !== "playing" || s <= cur;
        const on = speedForStep(selected) === speedForStep(s);
        return `<button type="button" data-s="${s}" aria-pressed="${on}" ${unlocked && clip ? "" : "disabled"}>${METER[s - 1]}</button>`;
      })
      .join("");
    $$("#replay button", hero).forEach((b) => b.addEventListener("click", () => playStep(Number(b.dataset.s))));
  }

  function paintHud() {
    const ol = $(".tries", hero);
    if (!ol) return;
    const cur = game.guesses.length;
    ol.innerHTML = Array.from({ length: MAX_GUESSES }, (_, i) => {
      if (i < cur) return `<li data-lv="${judge(game, game.guesses[i], puzzle.id).level}"></li>`;
      return `<li class="${i === cur && game.status === "playing" ? "now" : ""}"></li>`;
    }).join("");
  }

  function paintMeter() {
    const g = Math.min(game.guesses.length, 5);
    meter.hidden = false;
    meter.innerHTML =
      `<div class="rail"></div>` +
      METER.map((m, i) => `<div class="tick ${i <= g ? "done" : ""}" style="top:${(i / 5) * 100}%">${m}</div>`).join("") +
      `<div class="you" style="top:${(g / 5) * 100}%"></div>`;
  }

  function paintFact() {
    const f = $("#fact", hero);
    if (f) f.textContent = FACTS[Math.min(game.guesses.length, 5)];
  }

  function paintHints() {
    const g = game.guesses.length;
    const parts = [];
    if (g >= 5) {
      const pattern = answer.name.replace(/[A-Za-zÀ-ÿ]/g, (ch, i) => (i === 0 ? ch.toUpperCase() : "_"));
      parts.push(`<div class="hint">${icon("lantern")}<div><div class="kicker">Lantern light · its name</div><div class="letters" aria-label="Starts with ${esc(answer.name[0])}">${esc(pattern)}</div></div></div>`);
    }
    if (g >= 4) {
      parts.push(`<div class="hint">${icon("eye")}<div><div class="kicker">Dusk · on the ridge</div>
        <div class="vignette"><span class="sun-dot"></span><span class="sil">${esc(answer.emoji)}</span></div></div></div>`);
    }
    if (g >= 3) {
      const where = puzzle.continents.includes("Worldwide") ? CONTINENTS.slice(0, 6) : puzzle.continents;
      parts.push(`<div class="hint">${icon("pin")}<div><div class="kicker">Where it lives</div><div class="value">${esc(puzzle.habitat)}</div>
        <div class="pills">${CONTINENTS.map((c) => `<span class="pill ${where.includes(c) ? "on" : ""}">${esc(c)}</span>`).join("")}</div></div></div>`);
    }
    if (g >= 2) {
      parts.push(`<div class="hint">${icon("branch")}<div><div class="kicker">Tree of life</div><div class="value">It's ${esc(withArticle(answer.cls.label.toLowerCase()))}</div></div></div>`);
    }
    $("#hints", view).innerHTML = parts.join("");
  }

  function paintGuesses() {
    $("#guesses", view).innerHTML = timeline(game)
      .reverse()
      .map(({ id, free }) => {
        const v = verdictFor(id, puzzle.id, game); // the FREE pill says the rest
        const a = id ? BY_ID.get(id) : null;
        const lead = a ? `<span class="sil" aria-hidden="true">${esc(a.emoji)}</span>` : icon("ffwd", "skip-ico");
        return `<div class="guess ${v.level === "correct" ? "correct" : ""}">${lead}
          <div><div class="g-name">${esc(a ? a.name : "Skipped")}${free ? ' <span class="free-pill">free</span>' : ""}</div><div class="g-note">${esc(v.level === "skip" ? "Sped it up" : v.detail)}</div></div>
          <span class="closeness" data-lv="${v.level}" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>`;
      })
      .join("");
  }

  function paintAll() {
    paintHud();
    paintPlay();
    paintSpeed();
    paintFact();
    paintMeter();
    paintHints();
    paintGuesses();
  }

  function buildGuessBar() {
    const bar = $("#guess-bar", view);
    const last = stepOf(game) === MAX_GUESSES;
    bar.innerHTML = `
      <div id="search-slot"></div>
      <div class="bar-actions">
        <button class="btn" type="button" id="skip">${last ? icon("flag") + " Give up" : icon("ffwd") + " Skip"}</button>
        <button class="btn btn-primary" type="button" id="guess">Guess</button>
      </div>`;
    search = createSearch({ getExclude: () => new Set(guessedIds(game)), onSubmit: () => submit(search.resolve()) });
    $("#search-slot", bar).append(search.el);
    $("#guess", bar).addEventListener("click", () => submit(search.resolve()));
    $("#skip", bar).addEventListener("click", () => {
      if (!busy) makeGuess(null);
    });
  }

  // =====================================================================
  // Guessing: the tag sinks onto the tree of life
  // =====================================================================
  function submit(animal) {
    if (busy) return;
    if (!animal) {
      toast("Pick an animal from the list");
      search?.openList();
      return;
    }
    if (guessedIds(game).includes(animal.id)) {
      toast("You already tried that one");
      return;
    }
    makeGuess(animal.id);
  }

  function lineLabel(level, guess) {
    if (level === "correct") return "match";
    if (!guess) return "";
    if (level === "kind") return "right kind";
    if (level === "none") return guess.cls.key === "Thing" ? "not an animal" : "other class";
    if (level === "class") return `same class · ${guess.cls.label.toLowerCase()}`;
    if (level === "order") return `same order · ${guess.order.label.toLowerCase()}`;
    return `same family · ${guess.family.label.toLowerCase()}`;
  }

  function theater(on) {
    sceneEl.classList.toggle("theater", on);
    $(".stage", hero)?.style.setProperty("opacity", on ? "0.06" : "");
    $(".stage", hero)?.style.setProperty("transition", "opacity .35s");
  }

  // On a computer the cursor goes straight back to the search box after every guess. On a phone
  // that would pop the keyboard up over the scene, so only do it when they were typing anyway.
  const finePointer = () => matchMedia("(pointer: fine)").matches;
  let refocus = false;

  function makeGuess(id) {
    if (busy || game.status !== "playing") return;
    busy = true;
    refocus = finePointer() || Boolean(search?.focused);
    const prevSpeed = speedForStep(stepOf(game));
    const free = id != null && !game.free && judge(game, id, puzzle.id).level === "kind";
    const v = verdictFor(id, puzzle.id, game, { free });
    const guess = id ? BY_ID.get(id) : null;
    applyGuess(game, id, puzzle.id);
    persist();
    clip?.stop();
    search?.clear();
    document.activeElement?.blur?.();

    const sceneBox = sceneEl.getBoundingClientRect();
    const playerBox = $(".player", hero).getBoundingClientRect();
    const top = playerBox.bottom - sceneBox.top - 6;
    const height = Math.max(150, sceneBox.height - top - 44);
    const centerY = playerBox.top - sceneBox.top + playerBox.height / 2;
    verdict.style.top = `${centerY - 36}px`;

    const say = (title, small) => {
      verdict.innerHTML = html`<b>${title}</b>${raw(small ? `<small>${esc(small)}</small>` : "")}`;
      verdict.classList.add("on");
    };

    if (!id && game.status === "lost") {
      finish(false); // gave up on the last try
      return;
    }
    theater(true);
    if (!id) {
      sfx.skip();
      say("Skipped.", "every miss winds the day on");
      later(() => after(prevSpeed), 1500);
      return;
    }

    // Build the five tree-of-life lines; only the one it lands on names the group.
    drop.style.top = `${top}px`;
    drop.style.height = `${height}px`;
    const levels = levelsFor(game);
    const gap = 84 / (levels.length - 1);
    drop.innerHTML = levels.map((lv, i) => {
      const label = lv === v.level ? lineLabel(lv, guess) : lv === "none" ? "other class" : lv === "correct" ? "match" : lv === "kind" ? "right kind" : `same ${lv}`;
      return `<div class="lvl" data-lv="${lv}" style="top:${8 + i * gap}%"><span>${lv === v.level ? `<b>${esc(label)}</b>` : esc(label)}</span></div>`;
    }).join("");
    drop.classList.add("on");

    const levelIdx = levels.indexOf(v.level);
    const targetY = top + height * ((8 + levelIdx * gap) / 100) - 38;
    tag.textContent = guess.name;
    tag.style.transition = "none";
    tag.style.opacity = "1";
    tag.style.transform = `translate(-50%, ${centerY - 20}px) rotate(-3deg) scale(.9)`;
    void tag.offsetWidth;
    tag.style.transition = "transform 1.05s cubic-bezier(.52,0,.3,1.18), opacity .3s";
    requestAnimationFrame(() => (tag.style.transform = `translate(-50%, ${targetY}px) rotate(${levelIdx % 2 ? 3 : -3}deg)`));

    later(() => {
      $(`.lvl[data-lv="${v.level}"]`, drop)?.classList.add("hit");
      if (v.level === "correct") {
        // The quicker the find, the bigger the kick (see components/celebrate.js).
        const level = winLevel(game.guesses.length);
        say(v.near ? v.title : winTitle(game.guesses.length), v.near ? v.detail : null);
        verdict.classList.add("win", level);
        const r = tag.getBoundingClientRect();
        cheerLanding(level, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      } else {
        sfx.wrong(v.level);
        say(v.title, v.detail);
      }
      paintHud();
      // Hold the verdict long enough to read it before the scene moves on.
      if (game.status === "won") {
        later(() => finish(true), 1500);
      } else {
        later(() => after(prevSpeed), 2400);
      }
    }, 1100);
  }

  function after(prevSpeed) {
    drop.classList.remove("on");
    tag.style.opacity = "0";
    verdict.classList.remove("on");
    theater(false);
    if (game.status === "lost") return finish(false);
    applySceneForProgress();
    selected = stepOf(game);
    buildGuessBar();
    paintAll();
    if (refocus) search.focus();
    const next = speedForStep(selected);
    if (clip) clip.play(next, { from: prevSpeed, rampTime: next !== prevSpeed ? 0.7 : 0, onEnd: paintPlay });
    paintPlay();
    busy = false;
  }

  function finish(win) {
    drop.classList.remove("on");
    tag.style.opacity = "0";
    // The stage stays dimmed and the headline up until the results take over.
    if (win) {
      // The chime already played when the tag landed; the call itself stays quiet now (the
      // results screen has Slow / Slide / Real buttons for that).
      scene.setAnimal(answer.emoji, "full");
      cheerReveal(winLevel(game.guesses.length));
      scene.setLantern(false);
      later(() => showDone(true), 1600);
    } else {
      theater(true); // a give-up comes straight here
      mournLoss();
      verdict.innerHTML = "<b>It got away…</b><small>the night was too dark this time</small>";
      verdict.classList.remove("win", "legend", "great", "good", "phew");
      verdict.classList.add("on", "lose");
      scene.setTime(5);
      scene.setLantern(false);
      scene.setAnimal(answer.emoji, "hidden");
      scene.setEyes(true);
      later(() => showDone(true), 3400); // time for the paw prints to trot off
    }
  }

  // =====================================================================
  // Done
  // =====================================================================
  function showDone(fresh) {
    busy = false;
    theater(false);
    verdict.classList.remove("on", "win", "legend", "great", "good", "phew", "lose");
    stopViz?.();
    stopViz = null;
    meter.hidden = true;
    scene.setSceneMode("hero");
    scene.setTime(timeOfGame(game));
    scene.setAnimal(answer.emoji, game.status === "won" ? "full" : "hidden");
    scene.setLantern(false);
    if (!fresh) scene.setEyes(false);
    if (mode === "today") $(".hud .streak", hero)?.remove();
    renderResults({
      hero,
      view,
      puzzle,
      game,
      mode,
      banner: mode === "test" ? admin.bannerHtml(puzzle) : "",
      listen: (kind) => {
        ensureClip().then((c) => {
          if (!c) return;
          if (kind === "slow") c.play(0.125);
          else if (kind === "slide") c.play(1, { from: 0.125, rampTime: 3.2 });
          else c.play(1);
        });
      },
    });
    if (fresh) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Go ----------
  if (game.status !== "playing") showDone(false);
  else if (mode === "replay") showPlaying(true);
  else if (!game.started && game.guesses.length === 0) showIntro();
  else showPlaying(false);

  if (!store.seenHelp && mode === "today" && game.status === "playing" && !game.started) {
    later(() => window.dispatchEvent(new CustomEvent("duskhunt:help")), 600);
  }
  return () => cleanups.forEach((fn) => fn());
}

