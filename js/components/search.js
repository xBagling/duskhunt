// The guess box: a wide, typo-tolerant search over every animal (and a few silly extras).
import { search, groupLabel, normalize } from "../animals.js";
import { esc } from "../util.js";
import { icon } from "../icons.js";

function highlight(text, query) {
  const q = normalize(query);
  if (!q) return esc(text);
  const plain = normalize(text);
  const idx = plain.indexOf(q);
  // Only highlight when the normalized text lines up with the original (no accents/punctuation shifts).
  if (idx < 0 || plain.length !== text.length) return esc(text);
  return esc(text.slice(0, idx)) + "<mark>" + esc(text.slice(idx, idx + q.length)) + "</mark>" + esc(text.slice(idx + q.length));
}

export function createSearch({ onPick, onSubmit, getExclude }) {
  const root = document.createElement("div");
  root.className = "search";
  root.innerHTML = `
    ${icon("search")}
    <input class="search-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
      placeholder="Name that animal…" aria-label="Guess an animal" role="combobox" aria-expanded="false"
      aria-autocomplete="list" aria-controls="search-results" />
    <button class="search-clear" type="button" aria-label="Clear" hidden>${icon("close")}</button>
    <ul class="results" id="search-results" role="listbox" hidden></ul>`;

  const input = root.querySelector("input");
  const list = root.querySelector(".results");
  const clearBtn = root.querySelector(".search-clear");
  let hits = [];
  let active = 0;
  let selected = null;

  function close() {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
  }

  function render() {
    const q = input.value;
    clearBtn.hidden = !q;
    if (!q.trim()) {
      hits = [];
      close();
      return;
    }
    hits = search(q, { limit: 8, exclude: getExclude() });
    active = 0;
    if (!hits.length) {
      list.innerHTML = `<li class="empty">No animal by that name. Try another spelling.</li>`;
    } else {
      list.innerHTML = hits
        .map(
          (h, i) => `<li class="result" role="option" id="opt-${i}" data-i="${i}" aria-selected="${i === active}">
            <span class="r-emoji sil" aria-hidden="true">${esc(h.animal.emoji)}</span>
            <span><span class="r-name">${highlight(h.animal.name, q)}</span>
            <span class="r-meta">${h.alias ? `“${esc(h.alias)}” · ` : ""}${esc(groupLabel(h.animal))}</span></span>
          </li>`
        )
        .join("");
    }
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-activedescendant", hits.length ? "opt-0" : "");
  }

  function setActive(i) {
    if (!hits.length) return;
    active = (i + hits.length) % hits.length;
    list.querySelectorAll(".result").forEach((el, j) => el.setAttribute("aria-selected", String(j === active)));
    list.querySelector(`#opt-${active}`)?.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", `opt-${active}`);
  }

  function pick(i) {
    const hit = hits[i];
    if (!hit) return;
    selected = hit.animal;
    input.value = hit.animal.name;
    clearBtn.hidden = false;
    close();
    onPick?.(selected);
  }

  input.addEventListener("input", () => {
    selected = null;
    onPick?.(null);
    render();
  });
  input.addEventListener("focus", render);
  input.addEventListener("blur", () => setTimeout(close, 150));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (list.hidden) render();
      else setActive(active + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(active - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!list.hidden && hits.length && !selected) pick(active);
      else onSubmit?.();
    } else if (e.key === "Escape") {
      close();
    }
  });
  list.addEventListener("mousedown", (e) => e.preventDefault());
  list.addEventListener("click", (e) => {
    const li = e.target.closest(".result");
    if (li) pick(Number(li.dataset.i));
  });
  clearBtn.addEventListener("click", () => {
    input.value = "";
    selected = null;
    onPick?.(null);
    input.focus();
    render();
  });

  return {
    el: root,
    get selected() {
      return selected;
    },
    /** If nothing is picked but the text exactly names an animal, use it. */
    resolve() {
      if (selected) return selected;
      const top = search(input.value, { limit: 1, exclude: getExclude() })[0];
      if (top && top.score >= 985) return top.animal;
      return null;
    },
    openList() {
      input.focus();
      render();
    },
    clear() {
      input.value = "";
      selected = null;
      clearBtn.hidden = true;
      close();
    },
    focus() {
      input.focus({ preventScroll: true });
    },
    /** True while the text field has the keyboard focus. */
    get focused() {
      return document.activeElement === input;
    },
  };
}
