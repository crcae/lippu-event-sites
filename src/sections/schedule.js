export function renderSchedule(props) {
  const el = document.createElement("section");
  el.className = "card";

  const title = props.title || "Agenda";
  const items = Array.isArray(props.items) ? props.items : [];

  el.innerHTML = `
    <h2>${escapeHtml(title)}</h2>
    <div class="list">
      ${items.map(it => `
        <div class="li">
          <div class="time">${escapeHtml(it.time || "")}</div>
          <div>
            <div style="font-weight:800;">${escapeHtml(it.title || "")}</div>
            ${it.text ? `<div class="muted">${escapeHtml(it.text)}</div>` : ""}
          </div>
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
