export function renderTitle(props) {
  const container = document.createElement("div");
  container.style.textAlign = props.align || "left";
  container.style.padding = "20px 0"; // spacing

  const tag = props.level || "h2";
  const el = document.createElement(tag);
  el.textContent = props.title || "";

  // Specific tweaks for "Monumental" headers
  if (props.align === "center") {
    el.style.margin = "0 auto 16px";
    el.style.maxWidth = "800px";
  }

  // Add decorative line if it's a section title?
  // Akamba style often uses just big text. Let's keep it clean.

  container.appendChild(el);
  return container;
}
