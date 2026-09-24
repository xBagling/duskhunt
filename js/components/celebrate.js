// How a result feels. The quicker the find, the bigger the kick; a late find is a relieved "phew";
// a miss is gentle and a little wistful, never a punishment. Used by the game and the admin preview.
import { sfx } from "../sfx.js";
import * as scene from "../scene.js";
import { confettiBurst, confettiRain, confettiCannons } from "./confetti.js";

// By the number of counted tries: 1 → legend, 2–3 → great, 4 → good, 5–6 → phew.
export const WIN_LEVELS = {
  legend: { title: "Incredible ears!", power: 1, burst: 1, rain: 1, cannons: true, flash: 1, hops: 3, buzz: [40, 60, 40, 60, 140] },
  great: { title: "Brilliant!", power: 0.75, burst: 0.75, rain: 0.55, cannons: false, flash: 0.8, hops: 3, buzz: [30, 50, 80] },
  good: { title: "Got it!", power: 0.45, burst: 0.45, rain: 0, cannons: false, flash: 0.55, hops: 2, buzz: [50] },
  phew: { title: "Phew, got it!", power: 0.15, burst: 0.08, rain: 0, cannons: false, flash: 0.3, hops: 1, buzz: [25] },
};
const GREAT_TITLES = { 2: "Brilliant!", 3: "Nailed it!" };
const PHEW_TITLES = { 5: "Phew, got it!", 6: "Just in time!" };

export function winLevel(tries) {
  if (tries <= 1) return "legend";
  if (tries <= 3) return "great";
  if (tries === 4) return "good";
  return "phew";
}

export const winTitle = (tries) => GREAT_TITLES[tries] || PHEW_TITLES[tries] || WIN_LEVELS[winLevel(tries)].title;

/** The moment the tag lands on "match". origin: where the confetti comes from (page coords). */
export function cheerLanding(level, origin) {
  const L = WIN_LEVELS[level];
  if (level === "phew") sfx.phew();
  else {
    if (level === "legend") sfx.fanfare();
    // The fanfare leads, then the chord and applause come in on its last note.
    setTimeout(() => sfx.win(L.power), level === "legend" ? 420 : 0);
  }
  confettiBurst(origin.x, origin.y, L.burst);
  if (L.cannons) setTimeout(() => confettiCannons(1), 250);
  scene.flash(L.flash);
  navigator.vibrate?.(L.buzz);
}

/** The reveal: the animal climbs onto the ridge and the scene joins in. */
export function cheerReveal(level) {
  const L = WIN_LEVELS[level];
  if (level !== "phew") scene.celebrate();
  setTimeout(() => scene.hop(L.hops), 700);
  if (L.rain) confettiRain(L.rain);
}

/** It got away: the owl, the wind, and paw prints heading off into the dark. */
export function mournLoss() {
  sfx.lose();
  setTimeout(scene.pawTrail, 900);
  navigator.vibrate?.([90]);
}
