import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function clientsAnimation() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".clients")
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top+=300 bottom",
          end: "bottom top",
        },
      });

      tl.from(element.querySelector<HTMLElement>(".clients__large-heading"), {
        autoAlpha: 0,
        duration: 1,
        y: 40,
        ease: "power2.out",
      });
    });
  });
}
