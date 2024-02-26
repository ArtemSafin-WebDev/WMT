import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { isTouch } from "./utils";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { getScrollLookup } from "./utils";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function smoothScrolling() {
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  let lenis: Lenis | null = null;

  if (!isTouch()) {
    lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    });

    gsap.ticker.lagSmoothing(0);
  }

  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  const pinWrapper = document.querySelector<HTMLElement>(".pin-wrapper");

  let getPosition = getScrollLookup("section", {
    pinnedContainer: pinWrapper ? pinWrapper : undefined,
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.matches("a") || target.closest("a")) {
      const link = target.matches("a")
        ? (target as HTMLAnchorElement)
        : target.closest<HTMLAnchorElement>("a");
      if (!link) return;

      const hash = link.hash;

      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        if (element.matches(".js-modal")) return;
        event.preventDefault();
        document.body.classList.remove("menu-open");

        history.replaceState({}, "", hash);

        gsap.to(window, {
          duration: 1.5,
          ease: "power2.out",
          scrollTo: {
            y: getPosition(element) as number,
            autoKill: false,
            offsetY: pageHeader ? pageHeader.offsetHeight : 0,
          },
        });
      }
    }
  });

  if (window.location.hash) {
    window.addEventListener("load", () => {
      const hash = window.location.hash;

      if (!hash) return;
      const element = document.querySelector(hash);
      if (element) {
        console.log("Start element", element);
        if (element.matches(".js-modal")) return;
        document.body.classList.remove("menu-open");
        gsap.to(window, {
          duration: 0.4,
          ease: "none",
          scrollTo: {
            y: getPosition(element) as number,
            autoKill: false,
            offsetY: pageHeader ? pageHeader.offsetHeight : 0,
          },
        });
      }
    });
  }
}
