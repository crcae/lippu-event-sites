export function renderCTA(props, data) {
  const el = document.createElement("section");
  el.className = "card";

  const title = props.title || "Comprar";
  const text = props.text || "";
  const buttonText = props.buttonText || (data?.cta?.primaryText || "Comprar boleto");
  const buttonUrl = props.buttonUrl || data?.checkoutUrl || data?.cta?.primaryUrl || "https://lippu.app";

  el.innerHTML = `
    <h2>${escapeHtml(title)}</h2>
    ${text ? `<p class="muted" style="margin:0 0 12px;">${escapeHtml(text)}</p>` : ""}
    <div class="row">
      <a class="btn" href="${escapeAttr(buttonUrl)}" rel="noopener">${escapeHtml(buttonText)}</a>
      ${data?.cta?.secondaryUrl ? `<a class="btn secondary" href="${escapeAttr(data.cta.secondaryUrl)}" rel="noopener">${escapeHtml(data.cta.secondaryText || "Más info")}</a>` : ""}
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
function escapeAttr(str) { return escapeHtml(str); }
