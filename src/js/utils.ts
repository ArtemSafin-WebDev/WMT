import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
Returns a FUNCTION that you can feed an element to get its scroll position.
- targets: selector text, element, or Array of elements
- config: an object with any of the following optional properties:
- start: defaults to "top top" but can be anything like "center center", "100px 80%", etc. Same format as "start" and "end" ScrollTrigger values.
- containerAnimation: the horizontal scrolling tween/timeline. Must have an ease of "none"/"linear".
- pinnedContainer: if you're pinning a container of the element(s), you must define it so that ScrollTrigger can make the proper accommodations.
*/
export function getScrollLookup(
  targets: string | Element | Element[],
  {
    start,
    pinnedContainer,
    containerAnimation,
  }: {
    start?: string | number | ScrollTrigger.StartEndFunc | undefined;
    pinnedContainer?: gsap.DOMTarget | undefined;
    containerAnimation?: gsap.core.Animation | undefined;
  }
) {
  let triggers = gsap.utils.toArray(targets).map((el) =>
      ScrollTrigger.create({
        trigger: el as gsap.DOMTarget,
        start: start || "top top",
        pinnedContainer: pinnedContainer,
        refreshPriority: -10,
        containerAnimation: containerAnimation,
      })
    ),
    st = (containerAnimation && containerAnimation.scrollTrigger)!;
  return (target: Element) => {
    let t = gsap.utils.toArray(target)[0],
      i = triggers.length;
    while (i-- && triggers[i].trigger !== t) {}
    if (i < 0) {
      return console.warn("target not found", target);
    }
    return containerAnimation
      ? st.start +
          (triggers[i].start / containerAnimation.duration()) *
            (st.end - st.start)
      : triggers[i].start;
  };
}

// Is touch devide
export const isTouch = () => !window.matchMedia("(hover: hover)").matches;
