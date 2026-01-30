export function renderCheckout(props, context) {
    // context is the full event data, needed for default checkoutUrl
    const container = document.createElement("div");
    container.className = "card";
    container.style.textAlign = "center";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "12px";

    if (props.title) {
        const h2 = document.createElement("h2");
        h2.textContent = props.title;
        h2.style.marginBottom = "0";
        container.appendChild(h2);
    }

    if (props.text) {
        const p = document.createElement("p");
        p.className = "muted";
        p.textContent = props.text;
        container.appendChild(p);
    }

    const btn = document.createElement("a");
    btn.className = "btn";
    // Use custom URL if provided, else event global checkoutUrl, else #
    const url = props.customUrl || context.checkoutUrl || "#";
    btn.href = url;
    btn.textContent = props.buttonText || "Comprar ahora";

    // Open in new tab? Usually lippu checkout stays in same tab or new? 
    // Requirement says format https://lippu.app/eventwa/..., likely external navigation.
    // Standard anchor behavior.

    container.appendChild(btn);
    return container;
}
