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

  // Caso 1: *.lippu.app
  if (host.endsWith(".lippu.app")) {
    // Quitamos el sufijo .lippu.app
    const subdomains = host.replace(".lippu.app", "").split(".");
    // El slug es la parte inmediatamente anterior (ej: exfr.lippu.app -> exfr)
    // Si hay www (ej: www.exfr.lippu.app), tomamos la parte correcta.
    const slug = subdomains[subdomains.length - 1];
    if (slug !== "www") return slug;
  }

  // Caso 2: *.netlify.app (Para pruebas en Netlify)
  // Pero evitamos que el dominio principal del proyecto (lippu-event-sites) se tome como slug
  if (host.endsWith(".netlify.app") && !host.includes("lippu-event-sites")) {
    const subdomains = host.replace(".netlify.app", "").split(".");
    const slug = subdomains[subdomains.length - 1];
    if (slug !== "www") return slug;
  }

  // Fallback para localhost o dominios no reconocidos
  return "demo";
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
