export function renderMap(props) {
  const container = document.createElement("div");
  container.className = "card";

  // Header
  if (props.title) {
    const h2 = document.createElement("h2");
    h2.textContent = props.title;
    container.appendChild(h2);
  }

  // Address Text
  if (props.address) {
    const p = document.createElement("p");
    p.className = "muted";
    p.style.marginBottom = "20px";
    p.textContent = props.address;
    container.appendChild(p);
  }

  // 1. Try to create an Embed Iframe
  // Priority: 
  // A) If mapUrl has "embed", assume valid iframe src.
  // B) If address exists, generate legacy embed hack.
  let embedSrc = null;

  if (props.mapUrl && (props.mapUrl.includes("embed") || props.mapUrl.includes("output=embed"))) {
    embedSrc = props.mapUrl;
  } else if (props.address) {
    // Generate legacy embed
    const q = encodeURIComponent(props.address);
    embedSrc = `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  if (embedSrc) {
    const wrapper = document.createElement("div");
    wrapper.style.height = "350px";
    wrapper.style.borderRadius = "16px";
    wrapper.style.overflow = "hidden";
    wrapper.style.position = "relative";
    wrapper.style.marginBottom = "24px";
    wrapper.style.background = "#222"; // Placeholder while loading

    const iframe = document.createElement("iframe");
    iframe.src = embedSrc;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "0";
    iframe.loading = "lazy";
    iframe.style.filter = "invert(90%) hue-rotate(180deg)"; // Dark mode hack for standard maps

    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
  }

  // 2. External Link Button (Always useful, especially for directions)
  if (props.mapUrl) {
    const btnRow = document.createElement("div");
    btnRow.className = "row";

    const btn = document.createElement("a");
    btn.href = props.mapUrl;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.className = "btn secondary"; // Secondary style
    btn.textContent = "📍 Abrir en Google Maps";
    btn.style.width = "100%"; // Full width on mobile looks good

    // Icon maybe?

    btnRow.appendChild(btn);
    container.appendChild(btnRow);
  }

  return container;
}
