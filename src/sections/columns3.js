export function renderColumns3(props) {
    const container = document.createElement("div");

    if (props.title) {
        const h2 = document.createElement("h2");
        h2.textContent = props.title;
        container.appendChild(h2);
    }

    const grid = document.createElement("div");
    grid.className = "grid3"; // defined in global css

    const items = props.items || [];
    items.forEach(item => {
        const tile = document.createElement("div");
        tile.className = "tile";

        if (item.icon) {
            const icon = document.createElement("img");
            icon.src = item.icon;
            icon.style.width = "48px";
            icon.style.height = "48px";
            icon.style.marginBottom = "12px";
            tile.appendChild(icon);
        }

        const h3 = document.createElement("h3");
        h3.textContent = item.title || "";
        tile.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = item.text || "";
        tile.appendChild(p);

        grid.appendChild(tile);
    });

    container.appendChild(grid);
    return container;
}
