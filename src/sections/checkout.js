export function renderCheckout(props, context) {
    const container = document.createElement("div");

    // Make it pop! Breaking the visual flow.
    // We'll use a gradient background and centering.
    container.style.background = "linear-gradient(135deg, var(--card) 0%, #1a1a24 100%)";
    container.style.border = "1px solid rgba(255,255,255,0.1)";
    container.style.borderRadius = "32px";
    container.style.padding = "60px 20px";
    container.style.textAlign = "center";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "24px";
    container.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";

    if (props.title) {
        const h2 = document.createElement("h2");
        h2.textContent = props.title;
        h2.style.fontSize = "36px";
        h2.style.marginBottom = "0";
        container.appendChild(h2);
    }

    if (props.text) {
        const p = document.createElement("p");
        p.className = "muted";
        import("../render.js").then(({ markdownToHtml }) => {
            p.innerHTML = markdownToHtml(props.text);
        });
        container.appendChild(p);
    }

    const btn = document.createElement("a");
    btn.className = "btn";
    // Override simple button style to be MASSIVE
    btn.style.padding = "20px 48px";
    btn.style.fontSize = "20px";
    btn.style.letterSpacing = "2px";

    const url = props.customUrl || context.checkoutUrl || "#";
    btn.href = url;
    btn.textContent = props.buttonText || "COMPRAR BOLETOS";

    container.appendChild(btn);
    return container;
}
