import { renderHero } from "./sections/hero.js";
import { renderTitle } from "./sections/title.js";
import { renderCarousel } from "./sections/carousel.js";
import { renderColumns3 } from "./sections/columns3.js";
import { renderColumns2 } from "./sections/columns2.js";
import { renderMedia1 } from "./sections/media1.js";
import { renderVideo } from "./sections/video.js";
import { renderCheckout } from "./sections/checkout.js";
import { renderMap } from "./sections/map.js";

// Registry mapping CMS keys to render functions
const registry = {
  hero: renderHero,
  title: renderTitle,
  carousel: renderCarousel,
  columns3: renderColumns3,
  columns2: renderColumns2,
  media1: renderMedia1,
  video: renderVideo,
  checkout: renderCheckout,
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
    if (!fn) {
      console.warn(`Section type "${s.type}" not found in registry.`);
      continue;
    }
    try {
      // Pass props and also full data context (useful for checkoutUrl etc)
      const node = fn(s.props || {}, data);
      if (node) root.appendChild(node);
    } catch (e) {
      console.error(`Error rendering section ${s.type}:`, e);
    }
  }
}
