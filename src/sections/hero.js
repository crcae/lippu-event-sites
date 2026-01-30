export function renderHero(props, data) {
  const el = document.createElement("section");
  el.className = "card";

  const kicker = props.kicker ? `<div class="muted">${escapeHtml(props.kicker)}</div>` : `<div class="muted">Lippu</div>`;
  const badge = props.badge ? `<span class="badge">${escapeHtml(props.badge)}</span>` : "";
  const subtitle = props.subtitle ? `<p class="muted" style="margin:8px 0 0;">${escapeHtml(props.subtitle)}</p>` : "";
  const img = props.image ? `<img class="heroimg" src="${escapeAttr(props.image)}" alt="" />` : "";

  el.innerHTML = `
    ${kicker}
    <h1>${escapeHtml(props.title || data?.seo?.title || "Evento")}</h1>
    ${subtitle}
    <div class="row" style="margin-top:12px;">
      ${badge}
      ${props.date ? `<span class="muted">📅 ${escapeHtml(props.date)}</span>` : ""}
      ${props.location ? `<span class="muted">📍 ${escapeHtml(props.location)}</span>` : ""}
    </div>
    ${img}
  `;

  return el;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}
function escapeAttr(str) { return escapeHtml(str); }
