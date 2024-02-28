import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function introParallax() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  elements.forEach((element) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const bg = element.querySelector<HTMLDivElement>(".intro__bg-parallax");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bg, {
        duration: 1,
        y: () => element.offsetHeight * 0.3,
      });
    });
  });
}
