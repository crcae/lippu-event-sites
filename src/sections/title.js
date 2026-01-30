export function renderTitle(props) {
  const container = document.createElement("div");
  // Supports align: left, center, right
  container.style.textAlign = props.align || "left";
  
  // Supports level: h1, h2, h3. Default h2.
  const tag = props.level || "h2";
  const el = document.createElement(tag);
  el.textContent = props.title || "";
  
  // Basic styling adjustment if needed
  if (tag === "h1") el.style.margin = "32px 0 16px";
  if (tag === "h2") el.style.margin = "24px 0 12px";
  
  container.appendChild(el);
  return container;
}
