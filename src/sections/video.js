export function renderVideo(props) {
    if (!props.url) return null;

    const container = document.createElement("div");

    if (props.title) {
        const h2 = document.createElement("h2");
        h2.textContent = props.title;
        container.appendChild(h2);
    }

    // Wrapper for 16:9 aspect ratio
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.paddingBottom = "56.25%"; // 16:9
    wrapper.style.height = "0";
    wrapper.style.overflow = "hidden";
    wrapper.style.borderRadius = "16px";
    wrapper.style.background = "#000";

    // Simple parser for YouTube/Vimeo ID or just use URL if it's already embed format
    // For simplicity, we assume user pastes the EMBED format or we try to detect.
    // BUT CMS instruction said "URL Embed", so we trust the user pastes a valid src or we do basic iframe.

    let src = props.url;
    // Basic helper to convert standard youtube watch url to embed (optional convenience)
    if (src.includes("youtube.com/watch?v=")) {
        src = src.replace("watch?v=", "embed/");
    } else if (src.includes("youtu.be/")) {
        src = src.replace("youtu.be/", "youtube.com/embed/");
    }

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    wrapper.appendChild(iframe);
    container.appendChild(wrapper);

    return container;
}
