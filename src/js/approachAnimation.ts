import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function approachAnimation() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".approach")
  );
  let mm = gsap.matchMedia();

  const pinWrapper = document.querySelector<HTMLElement>(".pin-wrapper");
  if (!pinWrapper) return;

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    const wrapper = element.querySelector<HTMLElement>(".swiper-wrapper");
    const slides = Array.from(
      element.querySelectorAll<HTMLElement>(".swiper-slide")
    );
    if (!slides.length || !container) return;
    mm.add("(min-width: 641px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          pin: pinWrapper,
          start: "bottom bottom",
          end: () =>
            `bottom+=${window.innerHeight * 0.75 * slides.length} bottom`,
          pinSpacing: true,
          scrub: true,
        },
      });

      tl.to(wrapper, {
        x: () => {
          let slidesLength = 0;
          slides.forEach(
            (slide) =>
              (slidesLength +=
                slide.offsetWidth +
                parseFloat(
                  window
                    .getComputedStyle(slide)
                    .getPropertyValue("margin-right")
                ))
          );
          console.log("Slides length", slidesLength);
          if (container.offsetWidth >= slidesLength) {
            return 0;
          } else {
            return -1 * Math.abs(slidesLength - container.offsetWidth);
          }
        },
        duration: 1,
        ease: "none",
      });
    });
  });
}
