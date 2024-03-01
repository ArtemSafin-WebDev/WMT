import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function reviewsAnimation() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".reviews")
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

      tl.from(element.querySelector<HTMLElement>(".reviews__large-text"), {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(element.querySelector(".reviews__thumbs"), {
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
      });
      tl.from(
        Array.from(
          element.querySelectorAll(".reviews__slider-card-image-wrapper")
        ),
        {
          scale: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
        },
        "<"
      );
      tl.from(
        Array.from(element.querySelectorAll(".reviews__slider-card-circle")),
        {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
        },
        "<"
      );
      tl.from(
        Array.from(element.querySelectorAll(".reviews__slider-card-content")),
        {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
        },
        "<"
      );
    });
  });
}
