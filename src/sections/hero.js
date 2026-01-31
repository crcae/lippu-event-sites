export function renderHero(props) {
  // Container moves outside normal flow to be full width if possible, 
  // but since #root has max-width, we might need to break out or just be big inside.
  // For this design, we'll keep it inside but make it TALL and immersive.

  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "100%";
  // Default to taller 80vh for "Monumental" feel, unless minHeight override
  const minH = props.minHeight || window.innerHeight * 0.75;
  container.style.minHeight = `${minH}px`;

  // Flex center for content
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.textAlign = "center";
  container.style.padding = "40px 20px";

  // Radius issues: if it's top of page, maybe we want no top radius?
  // Let's stick to the "Card" vibe but BIG.
  container.style.borderRadius = "32px";
  container.style.overflow = "hidden"; // Clip the zoom image
  container.style.isolation = "isolate"; // For z-indexing

  // Background Image with Ken Burns Effect
  if (props.image) {
    const bgWrapper = document.createElement("div");
    bgWrapper.style.position = "absolute";
    bgWrapper.style.inset = "0";
    bgWrapper.style.zIndex = "-2";
    bgWrapper.style.overflow = "hidden"; // double safety

    const bg = document.createElement("div");
    bg.style.width = "100%";
    bg.style.height = "100%";
    bg.style.backgroundImage = `url('${props.image}')`;
    bg.style.backgroundSize = "cover";
    bg.style.backgroundPosition = "center";
    bg.style.animation = "kenBurns 20s ease-out infinite alternate";

    bgWrapper.appendChild(bg);
    container.appendChild(bgWrapper);

    // Gradient Overlay (Darker at bottom for text readability)
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 100%)";
    overlay.style.zIndex = "-1";
    container.appendChild(overlay);
  } else {
    // Fallback gradient if no image
    container.style.background = "linear-gradient(135deg, #1e1e2f 0%, #0b0b10 100%)";
  }

  // Content animate in
  const content = document.createElement("div");
  content.style.maxWidth = "900px";
  content.style.zIndex = "2";
  content.style.animation = "fadeInUp 1s ease-out forwards";

  if (props.kicker) {
    const k = document.createElement("div");
    k.style.fontFamily = "var(--font-body)";
    k.style.textTransform = "uppercase";
    k.style.letterSpacing = "3px";
    k.style.fontSize = "14px";
    k.style.fontWeight = "700";
    k.style.marginBottom = "16px";
    k.style.color = "rgba(255,255,255,0.8)";
    k.textContent = props.kicker;
    content.appendChild(k);
  }

  if (props.title) {
    const h1 = document.createElement("h1");
    // Style is handled by global css h1, which is now clamped and huge
    // Add text shadow for legibility
    h1.textContent = props.title;
    h1.style.textShadow = "0 10px 30px rgba(0,0,0,0.5)";
    content.appendChild(h1);
  }

  if (props.subtitle) {
    const { markdownToHtml } = await import("../render.js");
    const p = document.createElement("p");
    p.className = "muted";
    p.innerHTML = markdownToHtml(props.subtitle);
    p.style.fontSize = "1.2rem";
    p.style.maxWidth = "800px";
    p.style.margin = "0 auto 32px";
    content.appendChild(p);
  }

  // Meta Row (Badge, Date, Location)
  if (props.badge || props.date || props.location) {
    const metaRow = document.createElement("div");
    metaRow.className = "row";
    metaRow.style.justifyContent = "center";

    if (props.badge) {
      const b = document.createElement("span");
      b.className = "badge";
      // Badges often look cool with accent color
      b.style.background = "var(--accent)";
      b.style.color = "#fff";
      b.textContent = props.badge;
      metaRow.appendChild(b);
    }

    if (props.date || props.location) {
      const meta = document.createElement("span");
      meta.style.fontWeight = "600";
      meta.style.fontSize = "15px";
      meta.style.letterSpacing = "0.5px";
      meta.style.textTransform = "uppercase";

      const parts = [];
      if (props.date) parts.push(props.date);
      if (props.location) parts.push(props.location);
      meta.textContent = parts.join(" • ");
      metaRow.appendChild(meta);
    }
    content.appendChild(metaRow);
  }

  container.appendChild(content);

  return container;
}
