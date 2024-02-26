import Swiper from "swiper";
import "swiper/css";
import { EffectFade } from "swiper/modules";

export default function reviews() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".reviews")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    const bullets = Array.from(
      element.querySelectorAll<HTMLElement>(".reviews__thumbs-link")
    );

    const setActiveBullet = (index: number) => {
      bullets.forEach((bullet) => bullet.classList.remove("active"));
      bullets[index].classList.add("active");
    };
    const instance = new Swiper(container, {
      slidesPerView: 1,
      modules: [EffectFade],
      speed: 600,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      init: false,
      on: {
        init: (swiper) => {
          setActiveBullet(swiper.activeIndex);
        },
        slideChange: (swiper) => {
          setActiveBullet(swiper.activeIndex);
        },
      },
    });

    instance.init();

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event) => {
        event.preventDefault();
        instance.slideTo(bulletIndex);
      });
    });
  });
}
