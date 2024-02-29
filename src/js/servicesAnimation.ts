import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function servicesAnimation() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".services")
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

      tl.from(element.querySelector<HTMLElement>(".services__heading"), {
        autoAlpha: 0,
        duration: 1,
        clearProps: "all",
        ease: "power2.out",
      });

      tl.from(
        element.querySelector<HTMLElement>(".services__tabs-nav"),
        {
          autoAlpha: 0,
          duration: 1,
          clearProps: "all",
          ease: "power2.out",
        },
        "<+=0.4"
      );
      tl.from(
        Array.from(element.querySelectorAll<HTMLElement>(".services__card")),
        {
          autoAlpha: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          clearProps: "all",
        },
        "<+=0.4"
      );
    });
  });
}
