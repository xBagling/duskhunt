// The hard mode switch, on the start screen and in "How it works". The choice is saved in the
// browser; each game keeps the mode it was started in.
import { store } from "../store.js";
import { sfx } from "../sfx.js";

const note = (on) => (on ? "Exact species only. Every guess costs a try." : "Off: lookalike species get a little help.");

export function modeSwitch() {
  const on = store.hardMode;
  return `<button class="mode-switch" type="button" role="switch" aria-checked="${on}" data-mode-switch>
    <span class="ms-track" aria-hidden="true"><span class="ms-knob"></span></span>
    <span class="ms-text"><b>Hard mode</b><small>${note(on)}</small></span>
  </button>`;
}

// One listener for every switch on the page, so the start screen and the help modal agree.
document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-mode-switch]")) return;
  sfx.tap();
  store.hardMode = !store.hardMode;
  document.querySelectorAll("[data-mode-switch]").forEach((el) => {
    el.setAttribute("aria-checked", String(store.hardMode));
    el.querySelector("small").textContent = note(store.hardMode);
  });
});
