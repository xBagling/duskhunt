// Admin mode: pick any day (past or future), test-play it, preview stats, tune sounds.
// Open it at #/admin. The passcode hash lives in config.js.
import { CONFIG } from "../config.js";
import { Clip, loadClip } from "../audio.js";
import { store, newGame } from "../store.js";
import { fetchStats } from "../stats.js";
import { puzzleForDay, SCHEDULE_LENGTH, rightKindOf, closeEnoughIds } from "../puzzle.js";
import { $, $$, esc, html, raw, toast, todayDay, formatDay, isoFromDay, dayFromIso, sha256Hex, speedLabel } from "../util.js";
import { icon } from "../icons.js";
import * as scene from "../scene.js";
import { cheerLanding, cheerReveal, mournLoss } from "../components/celebrate.js";

const KEY = "duskhunt:admin";
let prefs = { unlocked: false, revealAnswer: true, sampleCrowd: false };
try {
  prefs = { ...prefs, ...JSON.parse(sessionStorage.getItem(KEY) || "{}") };
} catch {}
const savePrefs = () => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {}
};

const testGames = new Map();

export const admin = {
  get unlocked() {
    return prefs.unlocked;
  },
  get revealAnswer() {
    return prefs.unlocked && prefs.revealAnswer;
  },
  get useSampleCrowd() {
    return prefs.unlocked && prefs.sampleCrowd;
  },
  async unlock(pass) {
    const ok = (await sha256Hex(pass)) === CONFIG.ADMIN_PASSCODE_SHA256;
    if (ok) {
      prefs.unlocked = true;
      savePrefs();
    }
    return ok;
  },
  lock() {
    prefs.unlocked = false;
    savePrefs();
  },
  testGame(day) {
    if (!testGames.has(day)) testGames.set(day, newGame(day, false));
    return testGames.get(day);
  },
  saveTestGame(game) {
    testGames.set(game.day, game);
  },
  resetTestGame(day) {
    testGames.delete(day);
  },
  bannerHtml(puzzle) {
    return html`<div class="admin-banner">
      <span>Test mode · day ${puzzle.day} · nothing is saved${raw(this.revealAnswer ? ` · answer: <b>${esc(puzzle.animal.name)}</b>` : "")}</span>
      <span class="row">
        <button class="btn btn-small" type="button" data-admin-action="restart" data-day="${puzzle.day}">Restart</button>
        <a class="btn btn-small" href="#/admin/${puzzle.day}">Admin</a>
      </span>
    </div>`;
  },
};

// ---------- Views ----------

export function renderAdmin({ hero, view, day }) {
  scene.setSceneMode("strip");
  scene.setTime(0);
  scene.setEyes(false);
  scene.setLantern(false);
  scene.setAnimal("", "hidden");
  hero.innerHTML = `<div class="page-head"><h1>Keeper's office</h1><p>Admin · pick any day, test it, tune it</p></div>`;
  if (!prefs.unlocked) return renderLock(view);

  const today = todayDay();
  let selected = Number.isInteger(day) && day >= 1 ? day : today;
  const cleanups = [];
  let lab = null;

  view.innerHTML = `<div class="wrap">
    <div class="row" style="justify-content:flex-end;margin:14px 0"><button class="btn btn-small" type="button" id="lock">${icon("lock")} Lock</button></div>

    <section class="card">
      <h2>Scene preview</h2>
      <p class="muted" style="font-size:14px;margin:0 0 10px">See every time of day and scene moment. Scroll up to look.</p>
      <div class="scene-btns" id="scene-btns">
        ${["Noon", "Afternoon", "Golden", "Sunset", "Dusk", "Night"].map((n, i) => `<button class="btn btn-small" type="button" data-t="${i}">${n}</button>`).join("")}
        <button class="btn btn-small" type="button" data-fx="peek">Animal peeks</button>
        <button class="btn btn-small" type="button" data-fx="full">Animal steps out</button>
        <button class="btn btn-small" type="button" data-fx="eyes">Eyes in the dark</button>
        <button class="btn btn-small" type="button" data-fx="lantern">Lantern</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="legend">Win: 1st try</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="great">Win: 2nd–3rd</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="good">Win: 4th</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="phew">Win: dusk/night</button>
        <button class="btn btn-small" type="button" data-fx="lose">Got away</button>
        <button class="btn btn-small" type="button" data-fx="tall">Tall scene</button>
      </div>
    </section>

    <section class="card">
      <h2>Pick any day</h2>
      <div class="row wrap-row">
        <label class="field grow">Puzzle #<input type="number" id="day-num" min="1" step="1" /></label>
        <label class="field grow">Date<input type="date" id="day-date" /></label>
      </div>
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small" type="button" id="prev">‹ Prev</button>
        <button class="btn btn-small" type="button" id="today">Today (#${today})</button>
        <button class="btn btn-small" type="button" id="next">Next ›</button>
      </div>
      <dl class="kv" id="day-info" style="margin:14px 0"></dl>
      <div class="row wrap-row" id="day-actions"></div>
      <div id="accept-box" style="margin-top:16px"></div>
    </section>

    <section class="card">
      <h2>Settings</h2>
      <label class="toggle"><input type="checkbox" id="opt-reveal" /> Show the answer while test playing</label>
      <label class="toggle"><input type="checkbox" id="opt-sample" /> Use a sample crowd for stats (preview only, in this tab)</label>
    </section>

    <section class="card">
      <h2>Sound lab</h2>
      <p class="muted" style="font-size:14px">Pick which part of the recording is played. The game uses the loudest ${CONFIG.CLIP_SECONDS}s automatically unless you paste an override into <code>answers.js</code>.</p>
      <canvas class="wave" id="wave"></canvas>
      <div class="row wrap-row" style="margin:10px 0">
        <label class="field grow">Start: <span id="start-out">0</span>s<input type="range" id="start" min="0" max="10" step="0.05" value="0" /></label>
        <label class="field grow">Length: <span id="len-out">3</span>s<input type="range" id="len" min="1" max="6" step="0.25" value="3" /></label>
      </div>
      <div class="row wrap-row" id="lab-play"></div>
      <pre class="code" id="lab-code"></pre>
      <div class="row wrap-row"><button class="btn btn-small" type="button" id="lab-copy">${icon("copy")} Copy override</button><button class="btn btn-small" type="button" id="lab-auto">${icon("replay")} Back to auto</button></div>
      <p class="credit" id="lab-credit"></p>
    </section>

    <section class="card">
      <h2>Global stats for this day</h2>
      <pre class="code" id="server-stats">…</pre>
    </section>

    <section class="card">
      <h2>Schedule</h2>
      <p class="muted" style="font-size:14px">${SCHEDULE_LENGTH} days are scheduled, then the list repeats. Regenerate it with <code>bun tools/build-schedule.mjs</code>.</p>
      <label class="field" style="margin-bottom:10px">Filter<input type="text" id="sched-filter" placeholder="owl, frog, #40…" /></label>
      <div class="table-wrap"><table class="schedule"><thead><tr><th>#</th><th>Date</th><th>Animal</th><th>Level</th></tr></thead><tbody id="sched-body"></tbody></table></div>
    </section>

    <section class="card">
      <h2>Your local data</h2>
      <dl class="kv"><dt>Player id</dt><dd><code>${esc(store.player)}</code></dd></dl>
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small" type="button" id="export">${icon("copy")} Copy local data</button>
        <button class="btn btn-small" type="button" id="wipe">Reset all local data</button>
      </div>
    </section></div>`;

  let tall = false;
  $("#scene-btns", view).addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const p = puzzleForDay(selected);
    if (b.dataset.t) scene.setTime(Number(b.dataset.t));
    if (b.dataset.fx === "peek") scene.setAnimal(p.animal.emoji, "peek");
    if (b.dataset.fx === "full") scene.setAnimal(p.animal.emoji, "full");
    if (b.dataset.fx === "eyes") {
      scene.setEyes(false);
      requestAnimationFrame(() => scene.setEyes(true));
    }
    if (b.dataset.fx === "lantern") scene.setLantern(!document.querySelector(".lamp-lit"));
    // The result moments, exactly as players get them (see components/celebrate.js).
    if (b.dataset.fx === "win") {
      cheerLanding(b.dataset.level, { x: innerWidth / 2, y: innerHeight * 0.45 });
      setTimeout(() => cheerReveal(b.dataset.level), 1500);
    }
    if (b.dataset.fx === "lose") mournLoss();
    if (b.dataset.fx === "tall") scene.setSceneMode((tall = !tall) ? "tall" : "strip");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const dayNum = $("#day-num", view);
  const dayDate = $("#day-date", view);
  const revealBox = $("#opt-reveal", view);
  const sampleBox = $("#opt-sample", view);
  revealBox.checked = prefs.revealAnswer;
  sampleBox.checked = prefs.sampleCrowd;
  revealBox.addEventListener("change", () => ((prefs.revealAnswer = revealBox.checked), savePrefs()));
  sampleBox.addEventListener("change", () => ((prefs.sampleCrowd = sampleBox.checked), savePrefs()));

  function select(d) {
    if (!Number.isInteger(d) || d < 1) return;
    selected = d;
    history.replaceState(null, "", `#/admin/${d}`);
    renderDay();
    renderSchedule();
    loadLab();
    loadServerStats();
  }

  function renderDay() {
    const p = puzzleForDay(selected);
    dayNum.value = selected;
    dayDate.value = isoFromDay(selected);
    const when = selected === today ? "today" : selected < today ? `${today - selected} days ago` : `in ${selected - today} days`;
    $("#day-info", view).innerHTML = html`
      <dt>Date</dt><dd>${formatDay(selected, { weekday: "long", year: "numeric", month: "long", day: "numeric" })} (${when})</dd>
      <dt>Animal</dt><dd>${p.animal.emoji} ${p.animal.name} <span class="muted">· ${p.sci}</span></dd>
      <dt>Class</dt><dd>${p.animal.cls.label} · ${p.animal.family.label}</dd>
      <dt>Level</dt><dd>${"★".repeat(p.difficulty)}${"☆".repeat(3 - p.difficulty)}</dd>`;
    const real = store.game(selected);
    const playerHref = selected === today ? "#/" : selected < today ? `#/day/${selected}` : null;
    $("#day-actions", view).innerHTML = `
      <a class="btn btn-primary" href="#/admin/play/${selected}">${icon("play")} Test play this day</a>
      ${playerHref ? `<a class="btn" href="${playerHref}">Open as a player</a>` : `<span class="muted" style="font-size:13px">Players can't open future days.</span>`}
      ${real ? `<button class="btn btn-small" type="button" id="reset-real">Reset my real game for #${selected}</button>` : ""}`;
    renderAccept(p);
    $("#reset-real", view)?.addEventListener("click", () => {
      store.deleteGame(selected);
      toast(`Your game for #${selected} was reset`);
      renderDay();
    });
  }

  // "Close enough": lookalikes that count as found outside hard mode. The list lives in answers.js,
  // so this builds the line to paste there.
  function renderAccept(p) {
    const box = $("#accept-box", view);
    const kin = rightKindOf(p.id);
    if (!kin.length) {
      box.innerHTML = `<p class="muted" style="font-size:13px;margin:0">No lookalike species for this animal, so there is nothing to accept as close enough.</p>`;
      return;
    }
    const on = new Set(closeEnoughIds(p.id));
    box.innerHTML = html`<div class="kicker" style="margin-bottom:6px">Close enough (normal mode)</div>
      <p class="muted" style="font-size:13px;margin:0 0 8px">Tick the species that sound the same as this recording. They count as found. The rest still get "right kind", and the first of those is free.</p>
      ${raw(kin.map((a) => `<label class="toggle"><input type="checkbox" value="${a.id}" ${on.has(a.id) ? "checked" : ""}> ${esc(a.name)}</label>`).join(""))}
      <div class="row wrap-row" style="margin-top:8px"><button class="btn btn-small" type="button" id="accept-copy">${raw(icon("copy"))} Copy accept line</button></div>`;
    $("#accept-copy", view).addEventListener("click", async () => {
      const ids = $("#accept-box input:checked", view).map((i) => i.value);
      const line = `"accept": ${JSON.stringify(ids)},`;
      try {
        await navigator.clipboard.writeText(line);
        toast(`Copied. Paste it into answers.js under "${p.id}"`);
      } catch {
        prompt(`Paste this into answers.js under "${p.id}":`, line);
      }
    });
  }

  function renderSchedule() {
    const q = $("#sched-filter", view).value.trim().toLowerCase().replace(/^#/, "");
    const last = Math.max(today + 60, SCHEDULE_LENGTH, selected + 10);
    const rows = [];
    for (let d = 1; d <= last; d++) {
      const p = puzzleForDay(d);
      if (q && !String(d).startsWith(q) && !p.animal.name.toLowerCase().includes(q)) continue;
      rows.push(`<tr data-day="${d}" class="${d === today ? "is-today" : ""} ${d === selected ? "is-selected" : ""}">
        <td>${d}</td><td>${esc(formatDay(d))}</td><td>${esc(p.animal.emoji)} ${esc(p.animal.name)}</td><td>${"★".repeat(p.difficulty)}</td></tr>`);
    }
    $("#sched-body", view).innerHTML = rows.join("");
  }

  async function loadServerStats() {
    const el = $("#server-stats", view);
    if (selected > today + 1) {
      el.textContent = "This day hasn't happened yet, so there are no stats.";
      return;
    }
    el.textContent = "Loading…";
    const s = await fetchStats(selected);
    el.textContent = s ? JSON.stringify(s, null, 1) : "No stats server reachable (or stats are off in config.js).";
  }

  // ----- Sound lab -----
  const wave = $("#wave", view);
  const startIn = $("#start", view);
  const lenIn = $("#len", view);

  function labSettings() {
    return { start: Number(startIn.value), len: Number(lenIn.value) };
  }

  function drawWave() {
    if (!lab) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = wave.getBoundingClientRect();
    wave.width = width * dpr;
    wave.height = height * dpr;
    const g = wave.getContext("2d");
    g.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const env = lab.base.envelope(Math.floor(width));
    const dur = lab.base.buffer.duration;
    const { start, len } = labSettings();
    g.fillStyle = css.getPropertyValue("--yellow-soft");
    g.fillRect((start / dur) * width, 0, (len / dur) * width, height);
    g.fillStyle = css.getPropertyValue("--green");
    const mid = height / 2;
    for (let x = 0; x < env.length; x++) {
      const h = Math.max(1, env[x] * (height - 8));
      g.fillRect(x, mid - h / 2, 1, h);
    }
    g.strokeStyle = css.getPropertyValue("--ink");
    g.lineWidth = 2;
    g.strokeRect((start / dur) * width + 1, 1, (len / dur) * width - 2, height - 2);
  }

  function renderLabCode() {
    const p = puzzleForDay(selected);
    const { start, len } = labSettings();
    $("#start-out", view).textContent = start.toFixed(2);
    $("#len-out", view).textContent = len.toFixed(2);
    $("#lab-code", view).textContent = `// answers.js → "${p.id}" → sound\nstart: ${start.toFixed(2)}, len: ${len.toFixed(2)},`;
    drawWave();
  }

  async function loadLab() {
    lab?.clip?.stop();
    lab = null;
    const p = puzzleForDay(selected);
    $("#lab-credit", view).innerHTML = html`${p.sound.credit} · ${p.sound.license} · <a href="${p.sound.page}" target="_blank" rel="noopener">open on Wikimedia Commons</a>`;
    $("#lab-play", view).innerHTML = `<span class="muted">Loading sound…</span>`;
    try {
      const base = await loadClip(p.sound);
      if (selected !== p.day) return;
      lab = { base, clip: null };
      startIn.max = Math.max(0, base.buffer.duration - 0.5).toFixed(2);
      lenIn.max = Math.min(8, base.buffer.duration).toFixed(2);
      startIn.value = base.start.toFixed(2);
      lenIn.value = base.len.toFixed(2);
      $("#lab-play", view).innerHTML = CONFIG.SPEEDS.slice(0, 4)
        .map((s) => `<button class="btn btn-small" type="button" data-lab-speed="${s}">Play ${speedLabel(s)}</button>`)
        .join("") + `<button class="btn btn-small" type="button" id="lab-stop">Stop</button>
        <span class="muted" style="font-size:13px">Recording is ${base.buffer.duration.toFixed(1)}s long</span>`;
      $$("[data-lab-speed]", view).forEach((b) =>
        b.addEventListener("click", () => {
          lab.clip?.stop();
          const clip = new Clip(base.buffer, { ...p.sound, ...labSettings() });
          lab.clip = clip;
          clip.allReady.then(() => lab?.clip === clip && clip.play(Number(b.dataset.labSpeed)));
        })
      );
      $("#lab-stop", view).addEventListener("click", () => lab?.clip?.stop());
      renderLabCode();
    } catch (err) {
      $("#lab-play", view).innerHTML = `<span class="muted">Couldn't load this sound (${esc(err.message)}).</span>`;
    }
  }

  startIn.addEventListener("input", renderLabCode);
  lenIn.addEventListener("input", renderLabCode);
  $("#lab-copy", view).addEventListener("click", () => navigator.clipboard.writeText($("#lab-code", view).textContent).then(() => toast("Copied")));
  $("#lab-auto", view).addEventListener("click", () => {
    if (!lab) return;
    const auto = new Clip(lab.base.buffer, { ...puzzleForDay(selected).sound, start: undefined, len: undefined });
    startIn.value = auto.start.toFixed(2);
    lenIn.value = auto.len.toFixed(2);
    renderLabCode();
  });
  cleanups.push(() => lab?.clip?.stop());

  // ----- Wiring -----
  dayNum.addEventListener("change", () => select(Number(dayNum.value)));
  dayDate.addEventListener("change", () => dayDate.value && select(dayFromIso(dayDate.value)));
  $("#prev", view).addEventListener("click", () => select(selected - 1));
  $("#next", view).addEventListener("click", () => select(selected + 1));
  $("#today", view).addEventListener("click", () => select(today));
  $("#sched-filter", view).addEventListener("input", renderSchedule);
  $("#sched-body", view).addEventListener("click", (e) => {
    const tr = e.target.closest("tr[data-day]");
    if (tr) {
      select(Number(tr.dataset.day));
      view.scrollIntoView({ behavior: "smooth" });
    }
  });
  $("#lock", view).addEventListener("click", () => {
    admin.lock();
    location.hash = "#/";
  });
  $("#export", view).addEventListener("click", () => navigator.clipboard.writeText(store.exportJson()).then(() => toast("Local data copied")));
  // Tap twice to confirm (native confirm() dialogs are blocked in some embedded browsers).
  let wipeArmed = null;
  $("#wipe", view).addEventListener("click", (e) => {
    const btn = e.currentTarget;
    if (!wipeArmed) {
      btn.textContent = "Tap again to erase everything";
      btn.classList.add("btn-primary");
      wipeArmed = setTimeout(() => {
        wipeArmed = null;
        btn.textContent = "Reset all local data";
        btn.classList.remove("btn-primary");
      }, 3000);
      return;
    }
    clearTimeout(wipeArmed);
    wipeArmed = null;
    btn.textContent = "Reset all local data";
    btn.classList.remove("btn-primary");
    store.reset();
    toast("Local data erased");
    renderDay();
  });

  select(selected);
  return () => cleanups.forEach((fn) => fn());
}

function renderLock(view) {
  view.innerHTML = `
    <div class="wrap"><section class="card" style="max-width:380px;margin:24px auto">
      <h2>Keepers only</h2>
      <p class="muted">Enter the admin passcode.</p>
      <form id="unlock" class="field">
        <input type="password" id="pass" autocomplete="current-password" aria-label="Passcode" required />
        <p id="pass-error" style="color:var(--accent);min-height:1.2em;margin:4px 0;font-size:13px"></p>
        <button class="btn btn-primary btn-block" type="submit">Unlock</button>
      </form>
    </section></div>`;
  const input = $("#pass", view);
  input.focus();
  input.addEventListener("input", () => ($("#pass-error", view).textContent = ""));
  $("#unlock", view).addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!input.value) {
      $("#pass-error", view).textContent = "Enter the passcode first";
      return;
    }
    if (await admin.unlock(input.value)) window.dispatchEvent(new Event("hashchange"));
    else {
      $("#pass-error", view).textContent = "That's not it. Try again";
      input.select();
    }
  });
}
