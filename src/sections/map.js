export function renderMap(props) {
  const container = document.createElement("div");
  container.className = "card"; // Optional: wrap in card or not?
  // Let's make it look like part of location info

  if (props.title) {
    const h2 = document.createElement("h2");
    h2.textContent = props.title;
    container.appendChild(h2);
  }

  if (props.address) {
    const p = document.createElement("p");
    p.className = "muted";
    p.style.marginBottom = "16px";
    p.textContent = props.address;
    container.appendChild(p);
  }

  if (props.mapUrl) {
    // If it's an embed URL (has /embed in it), use iframe
    // If it's a normal maps link, maybe just a button?
    // Requirement says "embed/link". We'll try to embed if possible or link.

    // Simplest: just an iframe that expects the user to paste the "Embed HTML" source src? 
    // Or we try to be smart. 
    // Let's assume user pastes the src from the embed code.

    const wrapper = document.createElement("div");
    wrapper.style.height = "300px";
    wrapper.style.borderRadius = "12px";
    wrapper.style.overflow = "hidden";

    const iframe = document.createElement("iframe");
    iframe.src = props.mapUrl;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "0";
    iframe.loading = "lazy";

    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
  }

  return container;
}
