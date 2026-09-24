import { BY_ID, withArticle } from "../animals.js";
import { store, personalStats } from "../store.js";
import { puzzleForDay, shareText, squares, TIERS, tierIndex, tierOf, verdictFor, judge, timeline } from "../puzzle.js";
import { submitResult, fetchStats, sampleCrowd, beatPercent, resultStep } from "../stats.js";
import { admin } from "./admin.js";
import { CONFIG } from "../config.js";
import { skyChart } from "../components/skychart.js";
import { icon, creature } from "../icons.js";
import { $, $$, esc, html, raw, toast, pct, msUntilMidnight, formatCountdown, todayDay } from "../util.js";

// ---------- Wikipedia photo + blurb, with a proper photo credit from Commons ----------

const wikiCache = new Map();
const OK_LICENSE = /^(cc0|public domain|pd|cc[- ]by(-sa)?)/i;
const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export function wikiSummary(title) {
  if (!wikiCache.has(title)) {
    const p = (async () => {
      const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
      if (!r.ok) return null;
      const j = await r.json();
      const fallback = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
      const page = j.content_urls?.desktop?.page;
      const out = { extract: j.extract || "", url: /^https:\/\/[a-z]+\.wikipedia\.org\//.test(page || "") ? page : fallback, img: null };
      const small = j.thumbnail?.source;
      // Only free images hosted on Commons (skips non-free "fair use" files, which can't be reused).
      const m = small && small.match(/\/wikipedia\/commons\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\//);
      if (!m) return out;
      const file = decodeURIComponent(m[1]);
      try {
        const q = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=imageinfo&iiprop=extmetadata&iiextmetadatafilter=Artist|LicenseShortName&titles=${encodeURIComponent("File:" + file)}`
        );
        const meta = (await q.json()).query?.pages?.[0]?.imageinfo?.[0]?.extmetadata || {};
        const license = meta.LicenseShortName?.value || "";
        if (!OK_LICENSE.test(license)) return out;
        out.img = {
          src: (j.thumbnail.width || 0) < 500 ? small.replace(/\/(\d+)px-/, "/500px-") : small,
          small,
          artist: stripHtml(meta.Artist?.value).slice(0, 70),
          license,
          page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
        };
      } catch {}
      return out;
    })().catch(() => null);
    wikiCache.set(title, p);
  }
  return wikiCache.get(title);
}

// ---------- Stats ----------

async function loadStats(puzzle, game, mode) {
  if (admin.useSampleCrowd) return sampleCrowd(puzzle.day, puzzle.id);
  if (mode === "test") return null;
  if (mode === "today" && game.live && !game.submitted) await submitResult(game);
  return fetchStats(puzzle.day);
}

// dist index: 0 = got away, 1..6 = solved on that try. Tier index 0..5 = try 1..6, 6 = got away.
const distForTier = (stats, t) => stats.dist[t === 6 ? 0 : t + 1] || 0;
function trail(game, answerId) {
  const steps = timeline(game);
  const n = steps.length;
  const rows = game.hard ? ["none", "class", "order", "family", "correct"] : ["none", "class", "order", "family", "kind", "correct"];
  const W = 320, x0 = 70, x1 = 304, yTop = 14, rowGap = game.hard ? 26 : 22;
  const H = yTop + (rows.length - 1) * rowGap + 32;
  const rowY = (i) => yTop + i * rowGap;
  const colX = (i) => (n === 1 ? (x0 + x1) / 2 : x0 + (i / Math.max(5, n - 1)) * (x1 - x0));
  const COLORS = { none: "var(--lv-none)", class: "var(--lv-class)", order: "var(--lv-order)", family: "var(--lv-family)", kind: "var(--lv-kind)", correct: "var(--lv-match)", skip: "var(--lv-skip)" };
  const LABELS = { none: "other", class: "class", order: "order", family: "family", kind: "kind", correct: "match" };
  const grid = rows.map((r, i) => `<line x1="${x0 - 14}" x2="${x1 + 10}" y1="${rowY(i)}" y2="${rowY(i)}" stroke="currentColor" stroke-opacity=".12" stroke-dasharray="3 4"/>`).join("");
  const labels = rows.map((r, i) => `<text class="lvl-label" x="${x0 - 16}" y="${rowY(i) + 3.5}" text-anchor="end">${LABELS[r]}</text>`).join("");
  let counted = 0;
  const cols = steps
    .map(({ id: g, free }, i) => {
      const lv = judge(game, g, answerId).level;
      const colLabel = free ? "free" : ++counted;
      const x = colX(i);
      const c = COLORS[lv];
      // A skip never reached the tree of life: a short dotted stub above the lines, not a drop.
      if (lv === "skip")
        return `<line x1="${x}" x2="${x}" y1="0" y2="4" stroke="${c}" stroke-width="2" stroke-dasharray="2 2"/><circle cx="${x}" cy="4" r="2.5" fill="${c}"/>
        <text x="${x}" y="${H - 10}" text-anchor="middle">${colLabel}</text>`;
      const y = rowY(rows.indexOf(lv));
      return `<line x1="${x}" x2="${x}" y1="0" y2="${y}" stroke="${c}" stroke-width="2"/>
        <circle cx="${x}" cy="${y}" r="${lv === "correct" ? 7 : 5.5}" fill="${c}" stroke="${c}" stroke-width="2"/>
        <text x="${x}" y="${H - 10}" text-anchor="middle">${colLabel}</text>`;
    })
    .join("");
  return `<svg class="trail" viewBox="0 0 ${W} ${H}" role="img" aria-label="How close each of your guesses got">${grid}${labels}${cols}</svg>`;
}

// Explains only the symbols that are actually in this share row.
const SHARE_KEY = [["none", "🥚 far off"], ["class", "🐣 same class"], ["order", "🐤 same order"], ["family", "🐔 same family"], ["kind", "🪺 right kind"], ["skip", "💨 skipped"]];
function shareKey(game, answerId) {
  const used = new Set(timeline(game).map(({ id }) => judge(game, id, answerId).level));
  const parts = SHARE_KEY.filter(([lv]) => used.has(lv)).map(([, label]) => `<span>${label}</span>`);
  return parts.length ? `<span class="share-key">${parts.join(" ")}</span>` : "";
}

// ---------- Results ----------

export function renderResults({ hero, view, puzzle, game, mode, listen, banner = "" }) {
  const a = puzzle.animal;
  const won = game.status === "won";
  const t = tierOf(game);
  const ti = tierIndex(game);

  const log = personalStats();
  // Logbook in tier order (found on try 1…6, then got away).
  // Past days, replays and test games aren't in the logbook, so add this one for the picture.
  const values = [...log.dist.slice(1), log.dist[0]];
  if (!game.live) values[ti]++;
  const logTotal = values.reduce((x, y) => x + y, 0);
  hero.innerHTML = html`
    ${raw(banner)}
    <div class="result-hero">
      <h1>${won ? "Found it!" : "Got away"}</h1>
      <p>${won ? t.when : "Gone into the night"}${won && judge(game, game.guesses.at(-1), puzzle.id).near ? " · close enough" : ""}${game.hard ? " · hard mode" : ""} · Day ${String(puzzle.day).padStart(3, "0")}${mode === "replay" ? " · replay" : ""}</p>
    </div>
    <section class="hero-log" aria-label="Your logbook">
      <div class="kicker"><span>How you usually find them</span><span>found ${Math.round(((logTotal - values[6]) / logTotal) * 100)}%</span></div>
      ${raw(skyChart(values, { mark: ti, markLabel: mode === "today" ? "today" : "this game", label: "Your logbook" }))}
    </section>`;

  view.innerHTML = html`<div class="wrap">
    <section class="card field-card" aria-label="Today's animal">
      <figure class="polaroid" id="polaroid"><div class="photo" id="photo"><span class="sil" aria-hidden="true">${a.emoji}</span></div><figcaption>Day ${puzzle.day} · ${a.name.toLowerCase()}</figcaption></figure>
      <h2>${a.name}</h2>
      <div class="sci">${puzzle.sci}</div>
      <div class="listen">
        <button class="btn" type="button" data-listen="slow">${raw(creature("snail"))} Slow</button>
        <button class="btn" type="button" data-listen="slide">${raw(icon("ffwd"))} Slide</button>
        <button class="btn" type="button" data-listen="real">${raw(creature("cheetah"))} Real</button>
      </div>
      <div class="fact-box"><span class="kicker">Field note</span>${puzzle.fact}</div>
      <p class="extract" id="extract"></p>
      <div class="credit" id="credit">
        Recording: ${puzzle.sound.credit} · ${puzzle.sound.license} · <a href="${puzzle.sound.page}" target="_blank" rel="noopener">source</a>
      </div>
    </section>

    <section class="card share-card">
      <p class="muted" style="margin:0;text-align:center">${t.line}</p>
      <div class="share-preview" aria-label="Your share"><span class="row-emoji">${squares(game, puzzle.id)}</span>
        ${raw(shareKey(game, puzzle.id))}</div>
      <button class="btn btn-dark btn-block" type="button" id="share">${raw(icon("share"))} Share your day</button>
      ${raw(mode === "replay" ? `<p class="muted" style="margin:0;text-align:center;font-size:13px">Just for fun. Your first try is the one that counts.</p>` : "")}
      <a class="btn btn-block" href="#/replay/${puzzle.day}">${raw(icon("replay"))} Play again</a>
      ${raw(mode === "today" ? `<div class="countdown">Next animal wakes up in<b id="countdown">--:--:--</b></div>` : `<a class="btn btn-block" href="#/">Go to today's animal ${icon("arrow")}</a>`)}
    </section>

    ${raw(
      // A static host has no stats server; then there's no crowd to show at all.
      CONFIG.STATS_API || admin.useSampleCrowd
        ? `<div class="section-title"><div class="kicker">${puzzle.day === todayDay() ? "Everyone, today" : `Everyone, on day ${puzzle.day}`}</div><h2>How the zoo did</h2></div>
    <section class="card" id="global"><div class="loading-block">Counting keepers…</div></section>`
        : ""
    )}

    <section class="card">
      <div class="kicker">Your trail</div>
      <h3 style="margin-top:6px">${won ? `${game.guesses.length} ${game.guesses.length === 1 ? "try" : "tries"}` : "Six tries, no luck"}</h3>
      ${raw(trail(game, puzzle.id))}
      <ol class="guide" style="list-style:none;padding:0;margin:4px 0 0">${raw(
        timeline(game)
          .map(({ id: g, free }, i, all) => {
            const v = verdictFor(g, puzzle.id, game);
            const an = g ? BY_ID.get(g) : null;
            const n = all.slice(0, i + 1).filter((x) => !x.free).length;
            return `<li class="g-row"><span class="mono muted">${free ? "free" : n}</span><div><b>${esc(an ? an.name : "Skipped")}</b><span>${esc(v.level === "skip" ? "Sped it up" : v.detail)}</span></div><span class="closeness" data-lv="${v.level}"><i></i><i></i><i></i><i></i></span></li>`;
          })
          .join("")
      )}</ol>
    </section>

    <div id="more"></div>
    <p class="logline" id="logline"></p>
    <div class="row" style="justify-content:center;gap:10px;margin-bottom:24px">
      <a class="btn btn-small" href="#/archive">${raw(icon("journal"))} Past days</a>
      <button class="btn btn-small" type="button" data-action="stats">${raw(icon("chart"))} Logbook</button>
    </div>
  </div>`;

  $$("[data-listen]", view).forEach((b) => b.addEventListener("click", () => listen?.(b.dataset.listen)));
  // Already on a replay? Same address, so restart it by hand.
  $(`a[href="#/replay/${puzzle.day}"]`, view)?.addEventListener("click", (e) => {
    if (location.hash === `#/replay/${puzzle.day}`) {
      e.preventDefault();
      window.dispatchEvent(new Event("hashchange"));
    }
  });

  const s = personalStats();
  $("#logline", view).innerHTML = `Streak <b>${s.current}</b> · Played <b>${s.played}</b> · Solved <b>${s.winRate}%</b> · Best <b>${s.max}</b>`;

  wikiSummary(puzzle.wiki).then((w) => {
    if (!w) return;
    const ex = $("#extract", view);
    if (ex && w.extract) ex.textContent = w.extract.length > 240 ? w.extract.slice(0, 237).replace(/\s+\S*$/, "") + "…" : w.extract;
    const credit = $("#credit", view);
    if (w.img) {
      const img = new Image();
      img.decoding = "async";
      img.alt = `Photo of ${withArticle(a.name.toLowerCase())}`;
      img.onload = () => $("#photo", view)?.replaceChildren(img);
      img.onerror = () => {
        if (img.src !== w.img.small) img.src = w.img.small;
      };
      img.src = w.img.src;
      credit?.insertAdjacentHTML("beforeend", `<br>Photo: ${w.img.artist ? `${esc(w.img.artist)} · ` : ""}${esc(w.img.license)} · <a href="${esc(w.img.page)}" target="_blank" rel="noopener">source</a>`);
    }
    credit?.insertAdjacentHTML("beforeend", `<br>Text: Wikipedia (CC BY-SA 4.0) · <a href="${esc(w.url)}" target="_blank" rel="noopener">article</a>`);
  });

  let beat = null;
  $("#share", view).addEventListener("click", async () => {
    const text = shareText(puzzle, game, beat);
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      toast("Copied. Paste it in the group chat");
    } catch (err) {
      if (err?.name !== "AbortError") prompt("Copy your result:", text);
    }
  });

  if (mode === "today") {
    const el = $("#countdown", view);
    const tick = () => {
      if (!el.isConnected) return clearInterval(timer);
      const ms = msUntilMidnight();
      el.textContent = formatCountdown(ms);
      if (ms < 1000) {
        clearInterval(timer);
        el.parentElement.innerHTML = `A new animal is awake. <a class="btn btn-small btn-primary" href="#/" id="play-new">Play it</a>`;
        $("#play-new", view)?.addEventListener("click", () => location.reload());
      }
    };
    const timer = setInterval(tick, 1000);
    tick();
  }

  loadStats(puzzle, game, mode).then((stats) => {
    const el = $("#global", view);
    if (!el) return;
    if (stats) beat = beatPercent(stats, resultStep(game));
    renderGlobal(el, $("#more", view), stats, game, mode, ti, beat);
  });
}

function renderGlobal(el, more, stats, game, mode, ti, beat) {
  if (!stats) {
    el.innerHTML = `<p class="muted" style="margin:0">${
      mode === "test" ? "Stats are off in test mode. Turn on the sample crowd in admin to preview them." : "The stats keeper is napping. Your result is saved and will count once the zoo is back online."
    }</p>`;
    return;
  }
  const total = stats.total;
  const isToday = game.day === todayDay();
  if (total <= 1 && !stats.sample) {
    el.innerHTML = `<div class="callout">${
      isToday
        ? "You're the first keeper here today. Check back later to see how everyone else does."
        : total
          ? "Only one keeper played this day while it was live, so there's no crowd to compare with."
          : "Nobody played this day while it was live, so there's no crowd to compare with."
    }</div>`;
    return;
  }
  const mine = mode === "today" || mode === "replay" || stats.sample ? ti : null;
  const solved = total - stats.dist[0];
  el.innerHTML = `
    <div class="big-line"><span class="num">${total.toLocaleString()}</span><span class="muted">keepers listened ${isToday ? "today" : "that day"}${stats.sample ? '<span class="sample-badge">sample</span>' : ""}</span></div>
    <div style="margin-top:10px">${skyChart(TIERS.map((_, t) => distForTier(stats, t)), { mark: mine, markLabel: "you", label: "How the zoo found it" })}</div>
    <div class="pct-line">${beat != null && game.status === "won" ? `Better than ${beat}% of ${isToday ? "today's" : "that day's"} keepers` : `${pct(solved, total)}% found it before dark`}</div>
`;

  const steps = [1, 2, 3, 4, 5, 6].filter((s) => stats.wrong[s]?.length);
  const speedName = ["", "1/8×", "1/4×", "1/2×", "1×", "dusk", "night"];
  let block = "";
  if (steps.length) {
    block += `<div class="section-title"><div class="kicker">The crowd</div><h2>What the zoo guessed</h2></div><section class="card">
      ${steps
        .map((s, i) => {
          const rows = stats.wrong[s];
          const topName = BY_ID.get(rows[0][0])?.name || rows[0][0];
          return `<details class="speed" ${i === 0 ? "open" : ""}><summary><span class="sp">${speedName[s]}</span><span class="top">${esc(topName)}</span>${icon("arrow")}</summary>
            <ol>${rows.map(([id, n]) => `<li><span>${esc(BY_ID.get(id)?.name || id)}</span><em>${pct(n, total)}%</em></li>`).join("")}</ol></details>`;
        })
        .join("")}
      <p class="muted" style="font-size:13px;margin:8px 0 0">Share of all keepers who made that wrong guess at that speed.</p>
    </section>`;
  }
  if (stats.regions?.length) {
    block += `<section class="card"><div class="kicker">Region league</div><h3 style="margin-top:6px">Sharpest ears by region</h3><div class="leagues">${stats.regions
      .slice(0, 7)
      .map((r, i) => `<div class="l-row"><span class="rank">${i + 1}</span><span>${esc(r.region)} <span class="muted" style="font-size:12px">· ${r.n.toLocaleString()} keepers</span></span><em>${r.avg} ${r.avg === 1 ? "pt" : "pts"}</em></div>`)
      .join("")}</div><p class="muted" style="font-size:12px;margin:10px 0 0">Points: 6 for snail ears, down to 1 for lantern light, 0 if it got away.</p></section>`;
  }
  more.innerHTML = block;
}

// ---------- Yesterday, on the start screen ----------

export function renderRecap(el, day) {
  if (!el) return;
  const puzzle = puzzleForDay(day);
  const game = store.game(day);
  const done = game && game.status !== "playing";
  if (done) {
    const t = tierOf(game);
    el.innerHTML = html`<div class="recap"><span class="sil" aria-hidden="true">${puzzle.animal.emoji}</span>
      <div><div class="kicker">Yesterday</div><div><b>${puzzle.animal.name}.</b> ${game.status === "won" ? `You got it ${t.when}.` : "It got away from you."} <span id="recap-crowd"></span></div></div></div>`;
  } else {
    el.innerHTML = `<div class="recap">${icon("journal")}<div><div class="kicker">Yesterday</div><div>Missed day ${day}? It's waiting in <a href="#/day/${day}">past days</a>. <span id="recap-crowd"></span></div></div></div>`;
  }
  const statsPromise = admin.useSampleCrowd ? Promise.resolve(sampleCrowd(day, puzzle.id)) : fetchStats(day);
  statsPromise.then((s) => {
    const slot = $("#recap-crowd", el);
    if (!slot || !s || s.total < 2) return;
    slot.textContent = `${pct(s.total - s.dist[0], s.total)}% of keepers found it before dark.`;
  });
}
