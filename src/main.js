/**
 * Extrae el slug del evento de la URL.
 * Prioridad:
 * 1. Parámetro ?event=slug (o ?e=slug)
 * 2. Subdominio (ej: exfr.lippu.app -> exfr)
 * 3. Fallback a "demo"
 */
export function getSlug() {
  const host = window.location.hostname.toLowerCase();
  const qp = new URLSearchParams(window.location.search);

  // 1. Parámetro de URL (útil para desarrollo y pruebas rápidas)
  const override = qp.get("event") || qp.get("e");
  if (override) return override.toLowerCase();

  // 2. Detección por Subdominio
  const parts = host.split(".");

  // Caso: LOCALHOST
  if (host === "localhost" || host === "127.0.0.1") {
    return qp.get("e") || qp.get("event") || "landing-general";
  }

  // Caso: lippu.app (y sus subdominios) o dominios de Vercel/Netlify
  const isLippu = host.endsWith(".lippu.app");
  const isVercel = host.endsWith(".vercel.app");
  const isNetlify = host.endsWith(".netlify.app");

  if (isLippu || isVercel || isNetlify) {
    const suffix = isLippu ? ".lippu.app" : (isVercel ? ".vercel.app" : ".netlify.app");
    const subdomains = host.replace(suffix, "").split(".");
    const slug = subdomains[subdomains.length - 1];

    // Si no hay subdominio (ej: lippu.app) o es www, usamos la landing general
    if (!slug || slug === "www" || slug === "lippu-event-sites") {
      return "landing-general";
    }

    return slug;
  }

  // Fallback final
  return "landing-general";
}

/**
 * Carga el JSON de configuración para un slug específico.
 */
export async function loadEvent(slug) {
  const safe = String(slug || "demo").toLowerCase().replace(/[^a-z0-9_-]/g, "");

  // Intentamos cargar el archivo .json
  const res = await fetch(`/events/${safe}.json`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`No se encontró la configuración para "${safe}" (Error ${res.status})`);
  }

  return await res.json();
}
