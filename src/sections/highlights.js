export function renderHighlights(props) {
  const el = document.createElement("section");
  el.className = "card";

  const title = props.title || "Highlights";
  const items = Array.isArray(props.items) ? props.items : [];

  el.innerHTML = `
    <h2>${escapeHtml(title)}</h2>
    <div class="grid3">
      ${items.map(it => `
        <div class="tile">
          <h3>${escapeHtml(it.title || "")}</h3>
          <p>${escapeHtml(it.text || "")}</p>
        </div>
      `).join("")}
    </div>
  `;

  return el;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}
