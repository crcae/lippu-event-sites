import { renderHero } from "./sections/hero.js";
import { renderHighlights } from "./sections/highlights.js";
import { renderCTA } from "./sections/cta.js";
import { renderSchedule } from "./sections/schedule.js";
import { renderMap } from "./sections/map.js";

const registry = {
  hero: renderHero,
  highlights: renderHighlights,
  cta: renderCTA,
  schedule: renderSchedule,
  map: renderMap
};

function applyTheme(theme) {
  const t = theme || {};
  document.documentElement.style.setProperty("--bg", t.bg || "#0B0B10");
  document.documentElement.style.setProperty("--card", t.card || "#12121A");
  document.documentElement.style.setProperty("--text", t.text || "#FFFFFF");
  document.documentElement.style.setProperty("--muted", t.muted || "#B5B5C0");
  document.documentElement.style.setProperty("--accent", t.accent || "#7B32FF");
}

function setSEO(seo) {
  if (seo?.title) document.title = seo.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && seo?.description) meta.setAttribute("content", seo.description);
}

export function renderEvent(data) {
  applyTheme(data.theme);
  setSEO(data.seo);

  const root = document.getElementById("root");
  root.innerHTML = "";

  const sections = Array.isArray(data.sections) ? data.sections : [];
  for (const s of sections) {
    const fn = registry[s.type];
    if (!fn) continue;
    const node = fn(s.props || {}, data);
    if (node) root.appendChild(node);
  }
}
