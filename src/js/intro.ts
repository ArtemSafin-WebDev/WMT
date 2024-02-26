import Swiper from "swiper";
import { Controller, EffectFade, Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  const mql = window.matchMedia("(max-width: 640px)");

  elements.forEach((element) => {
    let bgInstance: Swiper | null = null;
    let mainInstance: Swiper | null = null;
    let headingInstance: Swiper | null = null;
    let numbersInstance: Swiper | null = null;
    let controlsInstance: Swiper | null = null;

    function initializeSlider(element: HTMLElement, mobile = false) {
      const bgContainer =
        element.querySelector<HTMLElement>(".intro__bg .swiper");
      const mainContainer = element.querySelector<HTMLElement>(
        ".intro__main-slider .swiper"
      );
      const headingContainer = element.querySelector<HTMLElement>(
        ".intro__heading-slider .swiper"
      );

      const numbersContainer = element.querySelector<HTMLElement>(
        ".intro__numbers-slider .swiper"
      );
      const links = Array.from(
        document.querySelectorAll<HTMLElement>(".intro__navigation-link")
      );

      const controlsContainer = element.querySelector<HTMLElement>(
        ".intro__controls-slider .swiper"
      );

      // let bgInstance: Swiper | null = null;
      // let mainInstance: Swiper | null = null;
      // let headingInstance: Swiper | null = null;
      // let numbersInstance: Swiper | null = null;

      if (controlsContainer) {
        controlsInstance = new Swiper(controlsContainer, {
          slidesPerView: 1,
          modules: [EffectFade, Controller],
          effect: "fade",
          speed: 600,
          autoHeight: mobile,
          allowTouchMove: false,
          fadeEffect: {
            crossFade: true,
          },
        });
      }

      if (bgContainer) {
        bgInstance = new Swiper(bgContainer, {
          slidesPerView: 1,
          modules: [EffectFade, Controller],
          effect: "fade",
          speed: 600,
          allowTouchMove: false,
          fadeEffect: {
            crossFade: false,
          },
        });
      }

      if (headingContainer) {
        headingInstance = new Swiper(headingContainer, {
          slidesPerView: 1,
          modules: [EffectFade, Controller],
          effect: "fade",
          speed: 600,
          fadeEffect: {
            crossFade: true,
          },
          autoHeight: mobile,
        });
      }

      if (numbersContainer) {
        numbersInstance = new Swiper(numbersContainer, {
          slidesPerView: 1,
          modules: [EffectFade, Controller, Pagination],
          effect: "fade",
          speed: 600,
          pagination: {
            type: "fraction",
            el: element.querySelector<HTMLElement>(
              ".intro__controls-pagination"
            ),
            formatFractionCurrent: (current) =>
              current.toString().padStart(2, "0"),
            formatFractionTotal: (current) =>
              current.toString().padStart(2, "0"),
          },
          // autoHeight: true,
          fadeEffect: {
            crossFade: true,
          },
          autoHeight: mobile,
        });
      }

      if (mainContainer) {
        mainInstance = new Swiper(mainContainer, {
          slidesPerView: 1,
          modules: [EffectFade, Controller, Navigation, Pagination],
          effect: "fade",
          speed: 600,
          autoHeight: mobile,
          fadeEffect: {
            crossFade: true,
          },
          init: false,
          navigation: {
            prevEl: element.querySelector<HTMLButtonElement>(
              ".intro__arrow--prev"
            ),
            nextEl: element.querySelector<HTMLButtonElement>(
              ".intro__arrow--next"
            ),
          },
          pagination: {
            type: "progressbar",
            el: element.querySelector<HTMLElement>(".intro__controls-progress"),
          },
          on: {
            init: (swiper) => {
              autoplay(swiper.activeIndex);
            },
            slideChange: (swiper) => {
              autoplay(swiper.activeIndex);
            },
          },
        });

        mainInstance.init();

        if (
          bgInstance &&
          headingInstance &&
          numbersInstance &&
          controlsInstance
        ) {
          mainInstance.controller.control = [
            bgInstance,
            headingInstance,
            numbersInstance,
            controlsInstance,
          ];
        }

        if (headingInstance) {
          headingInstance.controller.control = mainInstance;
        }

        if (numbersInstance) {
          numbersInstance.controller.control = mainInstance;
        }
      }

      links.forEach((link, linkIndex) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          mainInstance?.slideTo(linkIndex);
        });
      });

      function autoplay(index: number) {
        if (mobile) return;
        links.forEach((link) => {
          gsap.killTweensOf(link);

          link.classList.remove("active");

          const currentLink = links[index];
          currentLink?.classList.add("active");

          gsap.set(link, {
            "--progress": 0,
          });

          gsap.fromTo(
            currentLink,
            {
              "--progress": 0,
            },
            {
              "--progress": 1,
              duration: 5,
              ease: "none",
              onComplete: () => {
                if (index < links.length - 1) {
                  if (mainInstance) {
                    mainInstance.slideNext();
                  }
                } else {
                  mainInstance?.slideTo(0);
                }
              },
            }
          );
        });
      }
    }

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        if (bgInstance) bgInstance.destroy();
        if (headingInstance) headingInstance.destroy();
        if (numbersInstance) numbersInstance.destroy();
        if (mainInstance) mainInstance.destroy();
        initializeSlider(element, true);
      } else {
        if (bgInstance) bgInstance.destroy();
        if (headingInstance) headingInstance.destroy();
        if (numbersInstance) numbersInstance.destroy();
        if (mainInstance) mainInstance.destroy();
        initializeSlider(element, false);
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
