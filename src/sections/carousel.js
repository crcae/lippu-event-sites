export function renderCarousel(props) {
    if (!props.images || !props.images.length) return null;

    const container = document.createElement("div");
    container.className = "carousel-container";

    // Inline styles for simplicity, can be moved to CSS
    container.style.display = "flex";
    container.style.gap = "16px";
    container.style.overflowX = "auto";
    container.style.padding = "10px 0";
    container.style.scrollSnapType = "x mandatory";

    const height = props.height || 250;

    props.images.forEach(img => {
        // CMS often wraps image in object { src: "path" }
        const src = img.src || img;
        if (!src) return;

        const imgEl = document.createElement("img");
        imgEl.src = src;
        imgEl.style.height = `${height}px`;
        imgEl.style.borderRadius = "12px";
        imgEl.style.scrollSnapAlign = "start";
        imgEl.style.flexShrink = "0";
        imgEl.alt = "Carousel image";

        container.appendChild(imgEl);
    });

    return container;
}
