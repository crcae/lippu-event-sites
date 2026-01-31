import { renderHero } from "./sections/hero.js";
import { renderTitle } from "./sections/title.js";
import { renderCarousel } from "./sections/carousel.js";
import { renderColumns3 } from "./sections/columns3.js";
import { renderColumns2 } from "./sections/columns2.js";
import { renderMedia1 } from "./sections/media1.js";
import { renderVideo } from "./sections/video.js";
import { renderCheckout } from "./sections/checkout.js";
import { renderMap } from "./sections/map.js";
import { renderCountdown } from "./sections/countdown.js";

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
  map: renderMap,
  countdown: renderCountdown
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

const markdownToHtml = (text) => {
  if (!text) return "";
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
    .replace(/\n/g, '<br>');
};

// Exports helper for sections
export { markdownToHtml };

// Accepts optional root element (for CMS preview)
export function renderEvent(data, customRoot) {
  applyTheme(data.theme);
  setSEO(data.seo);

  const root = customRoot || document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const sections = Array.isArray(data.sections) ? data.sections : [];
  for (const s of sections) {
    const fn = registry[s.type];
    if (!fn) {
      console.warn(`Section type "${s.type}" not found in registry.`);
      continue;
    }
    try {
      const props = s.props ? s.props : s;
      const style = props.style || {};

      // 1. Create outer container
      const container = document.createElement("div");
      container.className = `section-container padding-${style.padding || 'normal'}`;
      if (style.fullWidth) container.classList.add("full-width");

      // Apply style overrides
      if (style.bg) container.style.backgroundColor = style.bg;
      if (style.text) container.style.color = style.text;

      // 2. Create inner content wrapper
      const content = document.createElement("div");
      content.className = "section-content";

      // 3. Render section
      const node = fn(props, data);
      if (node) {
        content.appendChild(node);
        container.appendChild(content);
        root.appendChild(container);
      }
    } catch (e) {
      console.error(`Error rendering section ${s.type}:`, e);
    }
  }
}
