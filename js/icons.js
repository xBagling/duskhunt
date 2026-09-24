// Hand-drawn icon set. UI icons are 24×24 line icons; tier creatures are 32×32 filled pictograms
// in the style of zoo wayfinding signs. Everything uses currentColor.

const UI = {
  "sound-on": `<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6"/><path d="M18.2 6.3a8 8 0 0 1 0 11.4"/>`,
  "sound-off": `<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>`,
  journal: `<path d="M6 3.5h11.5a1.5 1.5 0 0 1 1.5 1.5v15.5H8a2 2 0 0 1-2-2z"/><path d="M6 18.5a2 2 0 0 1 2-2h11"/><path d="M10.5 3.5v6l2-1.4 2 1.4v-6"/>`,
  chart: `<path d="M3.5 20.5h17"/><path d="M6.5 20.5v-7M12 20.5V5M17.5 20.5v-10"/>`,
  help: `<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.7.3-1 .9-1 1.7v.3"/><circle cx="12" cy="17" r=".4" fill="currentColor"/>`,
  close: `<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>`,
  back: `<path d="M14.5 5.5L8 12l6.5 6.5"/>`,
  arrow: `<path d="M5 12h13.5M13 6.5l5.5 5.5-5.5 5.5"/>`,
  share: `<path d="M12 3.5v11M7.5 8L12 3.5 16.5 8"/><path d="M5.5 13v5.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V13"/>`,
  copy: `<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>`,
  search: `<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>`,
  ffwd: `<path d="M4 6.5l7 5.5-7 5.5zM12.5 6.5l7 5.5-7 5.5z" fill="currentColor"/>`,
  flag: `<path d="M5.5 21V4"/><path d="M5.5 4.5h11l-2.2 4 2.2 4h-11"/>`,
  play: `<path d="M8 5.7v12.6a1 1 0 0 0 1.5.86l10-6.3a1 1 0 0 0 0-1.72l-10-6.3A1 1 0 0 0 8 5.7z" fill="currentColor" stroke="none"/>`,
  stop: `<rect x="6.5" y="6.5" width="11" height="11" rx="2.2" fill="currentColor" stroke="none"/>`,
  replay: `<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>`,
  lock: `<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>`,
  branch: `<path d="M12 20.5v-9"/><path d="M12 11.5 7 6.5M12 11.5l5-5"/><path d="M7 6.5V4M17 6.5V4M12 15.5l-3.5-3"/>`,
  pin: `<path d="M12 20.5s-6.5-6-6.5-10.5a6.5 6.5 0 0 1 13 0c0 4.5-6.5 10.5-6.5 10.5z"/><circle cx="12" cy="10" r="2.3"/>`,
  eye: `<path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>`,
  letters: `<path d="M3.5 18L8 6l4.5 12M5.2 14h5.6"/><path d="M15 12.5c.6-1 1.6-1.5 2.8-1.5 1.8 0 2.7 1 2.7 2.8V18M20.5 15.2c-3.4-.3-5.7.3-5.7 1.7 0 .9.7 1.4 1.9 1.4 2 0 3.8-1.1 3.8-3.1"/>`,
  lantern: `<path d="M10 4.6a2 2 0 0 1 4 0"/><path d="M6.8 8.6 12 5.2l5.2 3.4z"/><rect x="7.5" y="8.6" width="9" height="9.4" rx="1.6"/><path d="M6 20.5h12"/><path d="M12 11c1.3 1.5 1.7 2.4 1.7 3.2a1.7 1.7 0 0 1-3.4 0c0-.8.4-1.7 1.7-3.2z" fill="currentColor"/>`,
  dice: `<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`,
  globe: `<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.3 3.6 5.2 3.6 8.5S14.5 18.2 12 20.5M12 3.5C9.5 5.8 8.4 8.7 8.4 12s1.1 6.2 3.6 8.5"/>`,
  sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>`,
  moon: `<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>`,
  flame: `<path d="M12 21c3.6 0 6-2.5 6-6 0-3.8-3.2-5.6-3.8-9.5-2.8 1.8-4.2 4.3-4.2 6.8-1-.6-1.6-1.6-1.8-2.8C6.9 11 6 12.8 6 15c0 3.5 2.4 6 6 6z"/>`,
  check: `<path d="M5 12.5l4.5 4.5L19 7.5"/>`,
  shuffle: `<path d="M3.5 7.5h3.2c2.1 0 3.3 1 4.4 2.8l1.8 3.4c1 1.8 2.3 2.8 4.4 2.8h3.2M17.5 5l3 2.5-3 2.5M17.5 14l3 2.5-3 2.5M3.5 16.5h3.2c1.2 0 2.1-.3 2.9-1M20.5 7.5h-3.2c-1.2 0-2.1.3-2.9 1"/>`,
};

// Tier creatures and scene pictograms (filled, 32×32).
const CREATURES = {
  snail: `<path fill-rule="evenodd" d="M12.5 7a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zm.6 5.3a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z"/><circle cx="13.2" cy="15.7" r="1.3"/><path d="M3 25.4c0-1.6 1.2-2.4 2.8-2.4h15.6c1.9 0 2.9-1.1 3.2-3l.8-5.7c.2-1.3 1-2 2.1-2s1.9 1 1.7 2.3l-.9 6.3c-.6 3.9-3 5.5-6.5 5.5H3.9c-.5 0-.9-.4-.9-1z"/><path d="M25.9 13.2 24.6 8.4M28.4 13l.9-4.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="24.5" cy="7.8" r="1.4"/><circle cx="29.4" cy="7.7" r="1.4"/>`,
  tortoise: `<path fill-rule="evenodd" d="M4.8 21.2C4.8 14.6 9.7 10 16 10s11.2 4.6 11.2 11.2zm8.5-7.1-2 3.5 2 3.5h5.4l2-3.5-2-3.5z"/><rect x="3" y="20.6" width="26" height="3" rx="1.5"/><rect x="7" y="22" width="3.6" height="5.2" rx="1.6"/><rect x="21.4" y="22" width="3.6" height="5.2" rx="1.6"/><path d="M26.4 16.9c2-1 4.2-.3 4.5 1.5.3 1.7-1 3.2-2.9 3.2h-2.4z"/><path d="M4.6 22.1 1.6 23.8l3.2.4z"/>`,
  hare: `<ellipse cx="13" cy="21.5" rx="8.8" ry="6"/><circle cx="22.6" cy="15.2" r="4.6"/><ellipse cx="20" cy="7.4" rx="1.9" ry="6.2" transform="rotate(-16 20 7.4)"/><ellipse cx="23.9" cy="7.6" rx="1.9" ry="6.2" transform="rotate(9 23.9 7.6)"/><ellipse cx="20.6" cy="26.6" rx="4" ry="1.6"/><circle cx="4.2" cy="19.6" r="2.4"/><path d="M26.6 16.2l2.2.6-.4 1.2-2.1-.2z"/>`,
  cheetah: `<ellipse cx="15" cy="15.6" rx="9.6" ry="3.9" transform="rotate(-4 15 15.6)"/><circle cx="26.4" cy="12.6" r="3.3"/><path d="M24.2 10.2l.4-2.6 1.8 2zM27.4 9.6l1.2-2.2 1 2.4z"/><path d="M29.4 13.4l1.8.8-1.9 1.1z"/><path d="M21.5 16.8 30.2 21" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" fill="none"/><path d="M20 17.2l6.4 5.7" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" fill="none"/><path d="M8.5 17.4 1.8 21.6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" fill="none"/><path d="M10 17.6l-4.6 6.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" fill="none"/><path d="M5.8 14.2C2.8 13.6 1.4 11.4 1 8.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  owl: `<path fill-rule="evenodd" d="M9 11.5c0-2.6 1-4.8 2.6-6.3l1.6 3.1c.9-.4 1.8-.6 2.8-.6s1.9.2 2.8.6l1.6-3.1c1.6 1.5 2.6 3.7 2.6 6.3v9c0 4.6-3.2 7.5-7 7.5s-7-2.9-7-7.5zm6.3 1.9a2.7 2.7 0 1 0-5.4 0 2.7 2.7 0 0 0 5.4 0zm6.8 0a2.7 2.7 0 1 0-5.4 0 2.7 2.7 0 0 0 5.4 0zM16 16.2l-1.3 2.4h2.6z"/><circle cx="12.6" cy="13.4" r="1.1"/><circle cx="19.4" cy="13.4" r="1.1"/><rect x="11.8" y="27" width="2.6" height="2.4" rx=".8"/><rect x="17.6" y="27" width="2.6" height="2.4" rx=".8"/>`,
  bat: `<path d="M16 12.2c1.1 0 1.9.7 2.1 1.7l.9-2.4 1 2.6c3-1.9 6.9-2.6 10.5-1.7-1.8 1.3-2.6 3.1-2.6 5.2-2-.9-3.9-.6-5.1.7-1.1-.9-2.7-1.1-4-.3-.9.6-1.5 1.7-1.6 3.2h-2.4c-.1-1.5-.7-2.6-1.6-3.2-1.3-.8-2.9-.6-4 .3-1.2-1.3-3.1-1.6-5.1-.7 0-2.1-.8-3.9-2.6-5.2 3.6-.9 7.5-.2 10.5 1.7l1-2.6.9 2.4c.2-1 1-1.7 2.1-1.7z"/>`,
  gone: `<g opacity=".35"><ellipse cx="7" cy="26" rx="2.4" ry="2"/><circle cx="4.6" cy="22.7" r=".95"/><circle cx="6.6" cy="21.8" r=".95"/><circle cx="8.8" cy="22.2" r=".95"/></g><g opacity=".65"><ellipse cx="15.6" cy="18.4" rx="2.4" ry="2"/><circle cx="13.2" cy="15.1" r=".95"/><circle cx="15.2" cy="14.2" r=".95"/><circle cx="17.4" cy="14.6" r=".95"/></g><ellipse cx="24.4" cy="10.6" rx="2.4" ry="2"/><circle cx="22" cy="7.3" r=".95"/><circle cx="24" cy="6.4" r=".95"/><circle cx="26.2" cy="6.8" r=".95"/>`,
};

export function injectSprite() {
  const ui = Object.entries(UI)
    .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`)
    .join("");
  const cr = Object.entries(CREATURES)
    .map(([k, v]) => `<symbol id="c-${k}" viewBox="0 0 32 32" fill="currentColor">${v}</symbol>`)
    .join("");
  const holder = document.createElement("div");
  holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${ui}${cr}</svg>`;
  document.body.prepend(holder.firstChild);
}

/** <svg> markup for a UI icon. */
export const icon = (name, cls = "") => `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

/** <svg> markup for a tier creature pictogram. */
export const creature = (name, cls = "") => `<svg class="cr ${cls}" aria-hidden="true"><use href="#c-${name}"/></svg>`;
