import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function cases() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".cases"));

  elements.forEach((element) => {
    const showAllBtns = Array.from(
      element.querySelectorAll<HTMLElement>(".cases__show-all")
    );

    showAllBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        btn.closest(".js-tabs-item")?.classList.toggle("show-all");
        ScrollTrigger.refresh();
      });
    });
  });
}
