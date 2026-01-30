export function renderHero(props) {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "center"; // Center text vertically
  container.style.padding = "40px 20px";
  container.style.borderRadius = "18px";
  container.style.border = "1px solid rgba(255,255,255,0.1)";
  container.style.position = "relative";
  container.style.overflow = "hidden"; // Clip background

  // Minimum height config
  const minH = props.minHeight || 400;
  container.style.minHeight = `${minH}px`;

  // Background Image
  if (props.image) {
    // Overlay for readability
    const bg = document.createElement("div");
    bg.style.position = "absolute";
    bg.style.inset = "0";
    bg.style.backgroundImage = `url('${props.image}')`;
    bg.style.backgroundSize = "cover";
    bg.style.backgroundPosition = "center";
    bg.style.zIndex = "0";
    container.appendChild(bg);

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.background = "linear-gradient(to top, #0B0B10 0%, rgba(11,11,16,0.4) 100%)";
    overlay.style.zIndex = "1";
    container.appendChild(overlay);
  }

  // Content wrapper
  const content = document.createElement("div");
  content.style.position = "relative";
  content.style.zIndex = "2";
  content.style.textAlign = "center"; // Default center for hero? Or configurable? 
  // Let's assume center for Hero unless complex.

  if (props.kicker) {
    const k = document.createElement("div");
    k.className = "muted";
    k.style.textTransform = "uppercase";
    k.style.letterSpacing = "1px";
    k.style.fontSize = "13px";
    k.style.marginBottom = "8px";
    k.textContent = props.kicker;
    content.appendChild(k);
  }

  if (props.title) {
    const h1 = document.createElement("h1");
    // Make it big
    h1.style.fontSize = "42px";
    h1.style.marginTop = "0";
    h1.textContent = props.title;
    content.appendChild(h1);
  }

  if (props.subtitle) {
    const sub = document.createElement("p");
    sub.style.fontSize = "18px";
    sub.style.opacity = "0.9";
    sub.style.maxWidth = "600px";
    sub.style.margin = "0 auto 20px";
    sub.textContent = props.subtitle;
    content.appendChild(sub);
  }

  // Badge / Date / Location Row
  const metaRow = document.createElement("div");
  metaRow.className = "row";
  metaRow.style.justifyContent = "center"; // center row

  if (props.badge) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = props.badge;
    metaRow.appendChild(b);
  }

  if (props.date || props.location) {
    const meta = document.createElement("span");
    meta.style.fontWeight = "600";
    const parts = [];
    if (props.date) parts.push(props.date);
    if (props.location) parts.push(props.location);
    meta.textContent = parts.join(" • ");
    metaRow.appendChild(meta);
  }

  content.appendChild(metaRow);
  container.appendChild(content);

  return container;
}
