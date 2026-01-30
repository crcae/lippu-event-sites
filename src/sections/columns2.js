export function renderColumns2(props) {
    const container = document.createElement("div");
    container.className = "row"; // flex container
    // Custom class for precise control
    container.style.alignItems = "center";
    if (props.reverseMobile) {
        container.classList.add("reverse-mobile");
    }

    function createCol(colData) {
        const div = document.createElement("div");
        // Flex 1
        div.style.flex = "1 1 300px";

        if (colData.type === "image" || colData.image) {
            // Prioritize explicit image field, fallback to content if it's a URL-like string
            const src = colData.image || colData.content;
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100%";
            img.style.borderRadius = "16px";
            img.style.border = "1px solid rgba(255,255,255,0.1)";
            div.appendChild(img);
        } else {
            // Text mode
            // Supports basic HTML parsing or just text? Content is "string" or "text" in CMS.
            // We'll use simple markdown-like or just straight innerHTML if safe, but here textContent with newlines
            const p = document.createElement("div");
            p.style.whiteSpace = "pre-wrap"; // keep newlines
            p.textContent = colData.content || "";
            div.appendChild(p);
        }
        return div;
    }

    if (props.left) container.appendChild(createCol(props.left));
    if (props.right) container.appendChild(createCol(props.right));

    return container;
}
