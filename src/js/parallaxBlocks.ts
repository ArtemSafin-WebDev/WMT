import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function parallaxBlocks() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-parallax-block")
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const bg = element.querySelector<HTMLDivElement>(
        ".js-parallax-block-wrapper"
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bg, {
        duration: 1,
        yPercent: 20,
      });
    });
  });
}
