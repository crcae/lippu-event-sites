export function renderCountdown(props) {
    const container = document.createElement("div");
    container.style.textAlign = "center";
    container.className = "countdown-section";

    if (props.title) {
        const h2 = document.createElement("h2");
        h2.textContent = props.title;
        container.appendChild(h2);
    }

    const timerDisplay = document.createElement("div");
    timerDisplay.style.display = "flex";
    timerDisplay.style.justifyContent = "center";
    timerDisplay.style.gap = "20px";
    timerDisplay.style.marginTop = "24px";

    const createUnit = (label) => {
        const box = document.createElement("div");
        box.style.background = "rgba(255,255,255,0.05)";
        box.style.padding = "20px";
        box.style.borderRadius = "16px";
        box.style.minWidth = "100px";
        box.style.border = "1px solid rgba(255,255,255,0.1)";

        const val = document.createElement("div");
        val.style.fontSize = "40px";
        val.style.fontWeight = "900";
        val.style.fontFamily = "var(--font-display)";
        val.style.color = props.style?.accent || "var(--accent)";
        val.textContent = "00";

        const lbl = document.createElement("div");
        lbl.style.fontSize = "12px";
        lbl.style.textTransform = "uppercase";
        lbl.style.letterSpacing = "1px";
        lbl.style.opacity = "0.7";
        lbl.textContent = label;

        box.appendChild(val);
        box.appendChild(lbl);
        return { box, val };
    };

    const d = createUnit("Días");
    const h = createUnit("Hrs");
    const m = createUnit("Min");
    const s = createUnit("Seg");

    timerDisplay.appendChild(d.box);
    timerDisplay.appendChild(h.box);
    timerDisplay.appendChild(m.box);
    timerDisplay.appendChild(s.box);
    container.appendChild(timerDisplay);

    const update = () => {
        const target = new Date(props.targetDate).getTime();
        if (isNaN(target)) return;

        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            [d, h, m, s].forEach(u => u.val.textContent = "00");
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        d.val.textContent = String(days).padStart(2, '0');
        h.val.textContent = String(hours).padStart(2, '0');
        m.val.textContent = String(mins).padStart(2, '0');
        s.val.textContent = String(secs).padStart(2, '0');
    };

    setInterval(update, 1000);
    update();

    return container;
}
