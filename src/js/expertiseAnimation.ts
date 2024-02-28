import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function expertiseAnimation() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".expertise")
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const bg = element.querySelector<HTMLDivElement>(".intro__bg-parallax");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: false,
        },
      });

      tl.to(bg, {
        duration: 1,
        y: () => element.offsetHeight * 0.3,
      });
    });
  });
}
