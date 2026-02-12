// Theme and SEO utilities
function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary || "#7B32FF");
  root.style.setProperty("--bg", theme.bg || "#0a0a0a");
  root.style.setProperty("--text", theme.text || "#ffffff");
}

function setSEO(seo) {
  if (!seo) return;

  // Title
  if (seo.title) {
    document.title = seo.title;
  }

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  if (seo.description) {
    metaDesc.content = seo.description;
  }

  // OG Image
  if (seo.ogImage) {
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.content = seo.ogImage;
  }
}

// Simple markdown helper
export function markdownToHtml(str) {
  if (!str) return "";
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br/>');
}

// Main render function
export async function renderEvent(data, customRoot) {
  applyTheme(data.theme);
  setSEO(data.seo);

  const root = customRoot || document.getElementById("root");
  if (!root) return;

  // Clear previous content
  root.innerHTML = "";

  // 1. Section-based rendering (Preferred)
  if (data.sections && Array.isArray(data.sections)) {
    // Dynamic import to avoid circular dep issues in some bundlers, 
    // but better to import at top if possible. Here we use dynamic for lazy loading logic if needed.
    // For now, let's assume we can import normally or we use the registry we just built.
    const { sectionsRegistry } = await import("./sections/index.js");

    for (const section of data.sections) {
      const renderer = sectionsRegistry[section.type];
      if (renderer) {
        try {
          const el = await renderer(section);
          if (el) root.appendChild(el);
        } catch (err) {
          console.error(`Error rendering section ${section.type}:`, err);
        }
      } else {
        console.warn(`Unknown section type: ${section.type}`);
      }
    }
  }
  // 2. Fallback to HTML injection
  else if (data.html) {
    root.innerHTML = data.html;
  }
  // 3. Fallback if no content
  else {
    root.innerHTML = `
      <div style="
        max-width: 800px;
        margin: 100px auto;
        padding: 40px;
        text-align: center;
        background: rgba(255,255,255,0.05);
        border-radius: 20px;
      ">
        <h1 style="margin: 0 0 20px 0;">Sin Contenido</h1>
        <p style="opacity: 0.7;">Este evento no tiene contenido configurado.</p>
        <p style="opacity: 0.5; margin-top: 20px;">Ve al admin para agregar contenido.</p>
      </div>
    `;
  }

  // Apply custom CSS if provided
  if (data.customCss) {
    const styleId = 'custom-event-styles';
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = data.customCss;
  }

  // Execute inline scripts (if any)
  // Note: This allows dynamic behavior but should be used carefully
  const scripts = root.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}
