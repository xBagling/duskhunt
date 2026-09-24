// The sky chart: one column per moment of the day (1/8 speed … night, then "got away"). Each column
// is a little window of that moment's sky, capped with its sun or moon, and only percentages are
// shown. Used for your logbook, the results screen and the crowd.

// Same palettes as the scene (see :root[data-time] in style.css), plus the dark after "night".
const SKIES = [
  ["#6fb8e6", "#d3eef8"],
  ["#83b6dd", "#e8e8d4"],
  ["#d6a26b", "#f8dea4"],
  ["#b95a6d", "#f3a66d"],
  ["#2c2a5e", "#8b5a7e"],
  ["#070b24", "#1d2458"],
  ["#05071a", "#0f1436"],
];
const CAPS = ["sun", "sun", "sun", "sun", "moon", "moon", "paws"];
const CAP_COLORS = ["#ffe39a", "#ffd873", "#ffc65e", "#ff8b58", "#f4e9c8", "#f4e9c8", ""];
export const SKY_LABELS = ["1/8×", "1/4×", "1/2×", "1×", "dusk", "night", "got away"];
const SPOKEN = ["at 1/8 speed", "at 1/4 speed", "at 1/2 speed", "at full speed", "at dusk", "in the dark", "got away"];

const PAWS = `<svg viewBox="0 0 16 12" aria-hidden="true"><circle cx="3" cy="8.5" r="1.9"/><circle cx="7" cy="5" r="1.6"/><circle cx="11.5" cy="7" r="1.9"/><circle cx="14" cy="3" r="1.4"/></svg>`;

/**
 * values: 7 counts in tier order (found on try 1…6, then got away).
 * mark: index of the column to highlight (this game), or null.
 */
export function skyChart(values, { mark = null, markLabel = "this game", label = "How often" } = {}) {
  const total = values.reduce((a, b) => a + b, 0);
  const pcts = values.map((v) => (total ? Math.round((v / total) * 100) : 0));
  const top = Math.max(...pcts, 1);
  const spoken = pcts.map((p, i) => `${p}% ${SPOKEN[i]}`).join(", ");
  const cols = pcts
    .map((p, i) => {
      const [a, b] = SKIES[i];
      const h = p ? Math.max(8, (p / top) * 100) : 0;
      const cap = CAPS[i] === "paws" ? `<span class="sc-cap paws">${PAWS}</span>` : `<span class="sc-cap ${CAPS[i]}" style="--c:${CAP_COLORS[i]}"></span>`;
      return `<div class="sc-col${i === mark ? " is-mark" : ""}${p ? "" : " is-empty"}" style="--h:${h.toFixed(1)};--a:${a};--b:${b}">
        <span class="sc-track">${i === mark ? `<span class="sc-tag">${markLabel}</span>` : ""}<span class="sc-pct">${p}%</span>${cap}<span class="sc-bar"></span></span>
        <span class="sc-lab">${SKY_LABELS[i]}</span>
      </div>`;
    })
    .join("");
  return `<div class="skychart" role="img" aria-label="${label}: ${spoken}">${cols}</div>`;
}
