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
  }, 1000);
}
