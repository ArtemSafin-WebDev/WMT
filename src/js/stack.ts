import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function stack() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".stack"));

  elements.forEach((element) => {
    const btn = element.querySelector<HTMLElement>(".stack__show-all");
    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      element.classList.toggle("show-all");
      ScrollTrigger.refresh();
    });
  });
}
