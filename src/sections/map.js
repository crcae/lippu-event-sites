export function renderMap(props) {
  const el = document.createElement("section");
  el.className = "card";

  const title = props.title || "Ubicación";
  const address = props.address || "";
  const url = props.googleMapsUrl || "";

  el.innerHTML = `
    <h2>${escapeHtml(title)}</h2>
    ${address ? `<p class="muted" style="margin:0 0 12px;">${escapeHtml(address)}</p>` : ""}
    ${url ? `<a class="btn secondary" href="${escapeAttr(url)}" rel="noopener">Abrir en Google Maps</a>` : ""}
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
