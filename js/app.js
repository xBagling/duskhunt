import { flushPending } from "./stats.js";
import { injectSprite, icon } from "./icons.js";
import { mountScene, setSceneMode, setTime } from "./scene.js";
import { sfx } from "./sfx.js";
import { renderGame } from "./views/play.js";
import { renderArchive } from "./views/archive.js";
import { renderAdmin, admin } from "./views/admin.js";
import { showHelp, showStats, closeModal } from "./views/modals.js";
import { $, todayDay } from "./util.js";

injectSprite();
mountScene($("#scene"));
loadEmojiFallback();

/**
 * Some systems (Windows 10, older Android) lack newer animal emoji like 🪿 or 🪺. Only then load
 * Google's Noto Color Emoji (up to ~700 KB). Everyone else keeps their built-in emoji and skips
 * the download, and the stylesheet no longer blocks the first paint.
 */
function loadEmojiFallback() {
  let missing = true;
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 24;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.font = '20px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    g.textBaseline = "top";
    g.fillText("\u{1FABF}", 0, 0); // 🪿 goose (Emoji 15)
    const d = g.getImageData(0, 0, 24, 24).data;
    // A real emoji is in colour; a missing glyph is a grey box or nothing.
    for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 0 && (Math.abs(d[i] - d[i + 1]) > 30 || Math.abs(d[i + 1] - d[i + 2]) > 30)) { missing = false; break; }
  } catch {}
  if (!missing) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap";
  document.head.append(link);
  // Put Noto first for emoji: Windows 10's Segoe UI Emoji claims newer emoji it can't draw and shows
  // an empty box instead of letting the next font take over.
  document.documentElement.classList.add("emoji-fallback");
  // Text drawn before its glyph arrived stays a blank box, so redraw each emoji silhouette once
  // its piece of the font has loaded, now and whenever a screen adds new ones.
  const redraw = (el) => {
    const text = el.textContent;
    if (!text || el.dataset.emojiFixed === text) return;
    el.dataset.emojiFixed = text;
    document.fonts.load('24px "Noto Color Emoji"', text).then(() => (el.textContent = text)).catch(() => {});
  };
  const scan = (root) => root.querySelectorAll?.(".sil").forEach(redraw);
  link.addEventListener("load", () => scan(document));
  new MutationObserver((changes) => {
    for (const c of changes) for (const n of c.addedNodes) if (n.nodeType === 1) (n.matches(".sil") ? redraw(n) : scan(n));
  }).observe(document.body, { childList: true, subtree: true });
}

const hero = $("#hero");
const view = $("#view");
let cleanup = null;

// Routes:
//   #/               today's animal (start screen → game → results)
//   #/day/N          a past day from the archive
//   #/replay/N       play a day again just for fun (first result still counts)
//   #/archive        every day so far
//   #/admin[/N]      admin (passcode), optionally with day N selected
//   #/admin/play/N   admin test play of any day, even future ones
function route() {
  closeModal();
  cleanup?.();
  cleanup = null;
  window.scrollTo(0, 0);
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const today = todayDay();
  const num = (s) => (/^\d+$/.test(s || "") ? Number(s) : NaN);
  const ctx = { hero, view };

  if (today < 1) {
    setSceneMode("tall");
    setTime(0);
    hero.innerHTML = `<div class="intro"><h1>Dusk Hunt</h1><p class="tag-line">The zoo hasn't opened yet. Come back on launch day.</p></div>`;
    view.innerHTML = "";
    return;
  }

  switch (parts[0]) {
    case undefined:
      cleanup = renderGame({ ...ctx, day: today, mode: "today" });
      break;
    case "day": {
      const day = num(parts[1]);
      if (!(day >= 1)) return (location.hash = "#/archive");
      if (day >= today) return (location.hash = "#/");
      cleanup = renderGame({ ...ctx, day, mode: "archive" });
      break;
    }
    case "replay": {
      const day = num(parts[1]);
      if (!(day >= 1) || day > today) return (location.hash = "#/");
      cleanup = renderGame({ ...ctx, day, mode: "replay" });
      break;
    }
    case "archive":
      renderArchive(ctx);
      break;
    case "admin":
      if (parts[1] === "play") {
        const day = num(parts[2]);
        if (!admin.unlocked || !(day >= 1)) return (location.hash = "#/admin");
        cleanup = renderGame({ ...ctx, day, mode: "test" });
      } else {
        cleanup = renderAdmin({ ...ctx, day: num(parts[1]) });
      }
      break;
    default:
      location.hash = "#/";
  }
}

function paintSfx() {
  const b = document.querySelector('[data-action="sfx"]');
  b.innerHTML = icon(sfx.muted ? "sound-off" : "sound-on");
  b.setAttribute("aria-label", sfx.muted ? "Sound effects off" : "Sound effects on");
}

document.addEventListener("click", (e) => {
  const action = e.target.closest("[data-action]")?.dataset.action;
  if (action === "help") showHelp();
  if (action === "stats") showStats();
  if (action === "sfx") {
    sfx.toggle();
    paintSfx();
    sfx.tap();
  }
  const adminAction = e.target.closest("[data-admin-action]");
  if (adminAction?.dataset.adminAction === "restart") {
    admin.resetTestGame(Number(adminAction.dataset.day));
    route();
  }
});

window.addEventListener("duskhunt:help", () => showHelp());
window.addEventListener("hashchange", route);

paintSfx();
flushPending();
route();
