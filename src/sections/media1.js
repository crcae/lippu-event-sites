export function renderMedia1(props) {
    const container = document.createElement("div");
    container.className = "heroimg"; // Reuse existing class for full width radius
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.minHeight = "200px";

    // If there's an image
    if (props.image) {
        container.style.backgroundImage = `url('${props.image}')`;
        container.style.backgroundSize = "cover";
        container.style.backgroundPosition = "center";
    }

    if (props.overlayText) {
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.inset = "0";
        overlay.style.background = "rgba(0,0,0,0.4)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.padding = "20px";

        const h2 = document.createElement("h2");
        h2.textContent = props.overlayText;
        h2.style.color = "#fff";
        h2.style.textAlign = "center";
        h2.style.textShadow = "0 2px 10px rgba(0,0,0,0.5)";

        overlay.appendChild(h2);
        container.appendChild(overlay);
    } else {
        // If no text, ensure height via aspect ratio or min-height? 
        // We already set minHeight 200px.
        // If it's a pure image, maybe better to use <img> tag to respect aspect ratio?
        // Let's stick to bg image for consistency with "hero-like" feel, but maybe add a spacer if empty.
        if (!props.overlayText) {
            container.style.height = "300px";
        }
    }

    return container;
}
