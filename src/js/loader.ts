import gsap from "gsap";

export default function loader() {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(".loader", {
          display: "none",
        });
      },
    });

    tl.fromTo(
      ".loader__gradient-layer",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 0.6,
        ease: "power2.out",
      }
    )
      .to(
        ".loader__inner",
        {
          autoAlpha: 0,
        },
        "<"
      )
      .fromTo(
        ".loader__white-layer",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
          duration: 0.6,
          ease: "power2.out",
        }
      );

    if (window.matchMedia("(max-width: 640px)").matches) return;
    tl.fromTo(
      ".page-header",
      {
        yPercent: -100,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "linear",
        clearProps: "all",
      },
      "<+=0.3"
    )
      .fromTo(
        ".intro__heading-slider",
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          clearProps: "all",
        },
        ">+=0.4"
      )
      .fromTo(
        ".intro__main-slider",
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "all",
        },
        "<+=0.3"
      )
      .fromTo(
        ".intro__numbers-slider",
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "all",
        },
        "<+=0.3"
      )
      .fromTo(
        ".intro__navigation",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,

          duration: 1,
          ease: "power3.out",
          clearProps: "all",
        },
        "<"
      );
  }, 1000);
}
