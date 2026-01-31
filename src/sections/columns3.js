export function renderColumns3(props) {
    const container = document.createElement("div");

    if (props.title) {
        const h2 = document.createElement("h2");
        h2.textContent = props.title;
        h2.style.marginBottom = "32px";
        h2.style.textAlign = "center";
        container.appendChild(h2);
    }

    const grid = document.createElement("div");
    grid.className = "grid3";

    // Grid styling is handled by global CSS .grid3 and .tile (which now has glass effecs)

    const items = props.items || [];
    items.forEach(item => {
        const tile = document.createElement("div");
        tile.className = "tile"; // uses .glass via css

        if (item.icon) {
            const icon = document.createElement("img");
            // Use object-contain
            icon.src = item.icon;
            icon.style.width = "64px"; // Bigger icons
            icon.style.height = "64px";
            icon.style.marginBottom = "24px";
            icon.style.objectFit = "contain";
            tile.appendChild(icon);
        }

        const h3 = document.createElement("h3");
        h3.textContent = item.title || "";
        tile.appendChild(h3);

        const p = document.createElement("p");
        import("../render.js").then(({ markdownToHtml }) => {
            p.innerHTML = markdownToHtml(item.text);
        });
        tile.appendChild(p);

        grid.appendChild(tile);
    });

    container.appendChild(grid);
    return container;
}
