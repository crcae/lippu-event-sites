
import { renderHero } from "./hero.js";
import { renderHighlights } from "./highlights.js";
import { renderColumns2 } from "./columns2.js";
import { renderColumns3 } from "./columns3.js";
import { renderVideo } from "./video.js";
import { renderSchedule } from "./schedule.js";
import { renderMap } from "./map.js";
import { renderCta } from "./cta.js";
import { renderCarousel } from "./carousel.js";
import { renderCheckout } from "./checkout.js";
import { renderCountdown } from "./countdown.js";
import { renderMedia1 } from "./media1.js";
import { renderTitle } from "./title.js";

export const sectionsRegistry = {
    hero: renderHero,
    highlights: renderHighlights,
    columns2: renderColumns2,
    columns3: renderColumns3,
    video: renderVideo,
    schedule: renderSchedule,
    map: renderMap,
    cta: renderCta,
    carousel: renderCarousel,
    checkout: renderCheckout,
    countdown: renderCountdown,
    media1: renderMedia1,
    title: renderTitle,
};
