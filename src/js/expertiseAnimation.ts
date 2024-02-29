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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top+=150 bottom",
          end: "bottom top",
        },
      });

      tl.from(
        element.querySelector<HTMLElement>(".expertise__heading"),
        {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
          markers: true,
        },
        0
      );

      tl.from(
        element.querySelector<HTMLElement>(".expertise__slider-nav"),
        {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      tl.fromTo(
        element.querySelector(".expertise__slider-card-title"),
        {
          y: 50,
          autoAlpha: 0,
        },
        {
          duration: 0.6,
          clearProps: "all",
          y: 0,
          autoAlpha: 1,
        },
        ">-=0.4"
      );

      tl.fromTo(
        element.querySelector(".expertise__card-btn"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.4,
        },
        "<"
      );
      tl.fromTo(
        element.querySelector(".expertise__slider-card-illustration"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.4,
        },
        "<"
      );

      tl.fromTo(
        element.querySelector(".expertise__slider-card-features"),
        {
          autoAlpha: 0,
        },
        {
          duration: 0.6,
          clearProps: "all",
          autoAlpha: 1,
        },
        ">"
      );

      tl.fromTo(
        Array.from(
          element.querySelectorAll(".expertise__slider-card-numbers-list-item")
        ),
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          clearProps: "all",
          ease: "power3.out",
        },
        "<-=0.2"
      );
    });
  });
}
