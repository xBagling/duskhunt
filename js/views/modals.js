import { store, personalStats } from "../store.js";
import { demoPuzzle } from "../puzzle.js";
import { loadClip } from "../audio.js";
import { icon, creature } from "../icons.js";
import { skyChart } from "../components/skychart.js";
import { modeSwitch } from "../components/modeswitch.js";
import { $, $$ } from "../util.js";

let closeCurrent = null;

/** Closes whatever modal is open, e.g. when the page changes underneath it. */
export function closeModal() {
  closeCurrent?.();
}

export function openModal(title, bodyHtml, { onClose, onMount } = {}) {
  closeCurrent?.();
  const root = $("#modal-root");
  const opener = document.activeElement;
  root.innerHTML = `<div class="modal-backdrop" role="presentation">
    <section class="card modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-head"><h2 id="modal-title">${title}</h2><button class="icon-btn" type="button" data-close aria-label="Close">${icon("close")}</button></div>
      ${bodyHtml}
    </section></div>`;
  const backdrop = $(".modal-backdrop", root);
  const extra = [];
  function close() {
    document.removeEventListener("keydown", onKey);
    extra.forEach((fn) => fn());
    root.innerHTML = "";
    closeCurrent = null;
    onClose?.();
    opener?.focus?.();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }
  document.addEventListener("keydown", onKey);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop || e.target.closest("[data-close]")) close();
  });
  $("[data-close]", root).focus();
  const cleanup = onMount?.(root, close);
  if (cleanup) extra.push(cleanup);
  closeCurrent = close;
  return close;
}

const bars = (lv) => `<span class="closeness" data-lv="${lv}"><i></i><i></i><i></i><i></i></span>`;

export function showHelp() {
  const demo = demoPuzzle();
  let clip = null;
  openModal(
    "How it works",
    `<ol class="steps">
      <li>${icon("sun")}<span><b>One animal a day.</b> Same for everyone. You hear its call at <b>1/8 speed</b>, so it sounds deep and strange.</span></li>
      <li>${icon("search")}<span>Type any animal to guess. Breeds, nicknames and even a few silly things work.</span></li>
      <li>${icon("ffwd")}<span>Every miss speeds the sound up: 1/8× → 1/4× → 1/2× → 1×. And the sun goes down.</span></li>
      <li>${icon("moon")}<span>At dusk you'll see its shape on the ridge. At night the keeper lights a lantern. After six tries, it gets away.</span></li>
    </ol>
    <div class="kicker" style="margin-bottom:8px">How close was your guess?</div>
    <div class="legend">
      <div>${bars("kind")}<span><b>Right kind.</b> Arctic fox vs. red fox. Your first one each game is free.</span></div>
      <div>${bars("family")}<span><b>Same family.</b> Wolf vs. fox.</span></div>
      <div>${bars("order")}<span><b>Same order.</b> Both carnivores.</span></div>
      <div>${bars("class")}<span><b>Same class.</b> Both mammals.</span></div>
      <div>${bars("none")}<span><b>Not even close.</b></span></div>
    </div>
    <div class="callout" style="margin-bottom:14px"><b>Try it:</b> this is a cat.
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small grow" type="button" data-demo="0.125">${creature("snail")} At 1/8 speed</button>
        <button class="btn btn-small grow" type="button" data-demo="1">${creature("cheetah")} Real speed</button>
      </div>
    </div>
    <div class="mode-row">${modeSwitch()}<p class="muted">A game you have already started keeps its mode.</p></div>
    <p class="muted" style="font-size:13px;margin:0 0 14px">Headphones are best. Slowed sounds get deep, so keep the volume comfortable. A new animal wakes up every midnight.</p>
    <button class="btn btn-dark btn-block" type="button" data-close>Got it</button>`,
    {
      onClose: () => (store.seenHelp = true),
      onMount: (root) => {
        $$("[data-demo]", root).forEach((b) =>
          b.addEventListener("click", async () => {
            try {
              clip = clip || (await loadClip(demo.sound));
              clip.play(Number(b.dataset.demo));
            } catch {
              b.textContent = "Couldn't load";
            }
          })
        );
        $$(".btn .cr", root).forEach((c) => (c.style.cssText = "width:20px;height:20px"));
        return () => clip?.stop();
      },
    }
  );
}

export function showStats() {
  const s = personalStats();
  // dist: [got away, try1..try6] → found on try 1…6, then got away.
  const counts = [...s.dist.slice(1), s.dist[0]];
  openModal(
    "Keeper's logbook",
    `<div class="stats-grid">
      <div class="stat"><b>${s.played}</b><span>played</span></div>
      <div class="stat"><b>${s.winRate}%</b><span>found</span></div>
      <div class="stat"><b>${s.current}</b><span>streak</span></div>
      <div class="stat"><b>${s.max}</b><span>best</span></div>
    </div>
    ${s.played ? `<div class="kicker" style="margin-bottom:10px">How you usually find them</div>
    <div class="logbook-chart">${skyChart(counts, { label: "Your logbook" })}</div>` : ""}
    <p class="muted" style="font-size:13px;margin:14px 0 0">${s.played ? "Counts games played on their own day." : "Play today's animal to start your logbook."}${s.archivePlayed ? ` You've also finished ${s.archivePlayed} from the archive.` : ""}</p>`
  );
}
