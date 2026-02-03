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

// Main render function - simplified for HTML injection
export async function renderEvent(data, customRoot) {
  applyTheme(data.theme);
  setSEO(data.seo);

  const root = customRoot || document.getElementById("root");
  if (!root) return;

  // Clear previous content
  root.innerHTML = "";

  // Inject HTML directly
  if (data.html) {
    root.innerHTML = data.html;
  } else {
    // Fallback if no HTML provided
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
        <p style="opacity: 0.7;">Este evento no tiene contenido HTML configurado.</p>
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
