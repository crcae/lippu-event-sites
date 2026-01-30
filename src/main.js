export function getSlug() {
  const host = window.location.hostname.toLowerCase();
  const qp = new URLSearchParams(window.location.search);

  // Para pruebas en netlify.app: ?event=evento1
  const override = qp.get("event");
  if (override) return override.toLowerCase();

  // Producción: evento1.lippu.app => "evento1"
  const parts = host.split(".");
  if (parts.length >= 3 && parts[parts.length - 2] === "lippu" && parts[parts.length - 1] === "app") {
    return parts[0];
  }

  // fallback
  return "demo";
}

export async function loadEvent(slug) {
  const safe = String(slug || "").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const res = await fetch(`/events/${safe}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`No existe /events/${safe}.json (HTTP ${res.status})`);
  return await res.json();
}
