import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, Controller } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

export default function expertise() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".expertise")
  );

  const mql = window.matchMedia("(max-width: 640px)");

  elements.forEach((element) => {
    let mainInstance: Swiper | null = null;
    let navInstance: Swiper | null = null;

    function initializeSlider(element: HTMLElement, mobile = false) {
      const mainContainer = element.querySelector<HTMLElement>(
        ".expertise__slider-content .swiper"
      );

      const navContainer = element.querySelector<HTMLElement>(
        ".expertise__slider-nav .swiper"
      );
      if (!mainContainer) return;

      const bullets = Array.from(
        element.querySelectorAll<HTMLElement>(".expertise__slider-nav-link")
      );

      const setActive = (index: number) => {
        bullets.forEach((bullet) => bullet.classList.remove("active"));
        bullets[index]?.classList.add("active");
      };

      if (mobile && navContainer) {
        navInstance = new Swiper(navContainer, {
          modules: [EffectFade, Pagination, Controller],
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          allowTouchMove: false,
          pagination: {
            type: "fraction",
            el: element.querySelector<HTMLElement>(".expertise__pagination"),
            formatFractionCurrent: (current) =>
              current.toString().padStart(2, "0"),
            formatFractionTotal: (current) =>
              current.toString().padStart(2, "0"),
          },
        });
      }

      mainInstance = new Swiper(mainContainer, {
        slidesPerView: 1,
        modules: [EffectFade, Navigation, Pagination, Controller],
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        autoHeight: true,
        init: false,
        pagination: {
          type: "progressbar",
          el: element.querySelector<HTMLElement>(".expertise__progressbar"),
        },
        navigation: {
          prevEl: element.querySelector<HTMLButtonElement>(
            ".expertise__arrow--prev"
          ),
          nextEl: element.querySelector<HTMLButtonElement>(
            ".expertise__arrow--next"
          ),
        },
        on: {
          init: (swiper) => {
            setActive(swiper.activeIndex);
          },
          slideChange: (swiper) => {
            setActive(swiper.activeIndex);
          },
          slideChangeTransitionEnd: () => {
            ScrollTrigger.refresh();
          },
        },
      });

      mainInstance.init();

      if (navInstance) {
      }

      bullets.forEach((bullet, bulletIndex) => {
        bullet.addEventListener("click", (event) => {
          event.preventDefault();
          if (mainInstance) {
            mainInstance.slideTo(bulletIndex);
          }
        });
      });
    }

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        if (mainInstance) mainInstance.destroy();
        if (navInstance) navInstance.destroy();
        mainInstance = null;
        navInstance = null;
        initializeSlider(element, true);
      } else {
        if (mainInstance) mainInstance.destroy();
        if (navInstance) navInstance.destroy();
        mainInstance = null;
        navInstance = null;
        initializeSlider(element, false);
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
