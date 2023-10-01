/**
 * This file calulates the scroll value and the window height to calculate the progress bar
 */

import childrenNumberCalculator from "../../ts/sectionNumberCalculator";

let scrollValue = window.scrollY;
let windowHeight = window.innerHeight;

const sectionCount = childrenNumberCalculator("section-wrapper");

window.addEventListener("scroll", () => {
  scrollValue = window.scrollY;
  let currentScroll = (scrollValue / windowHeight) * 100;
  document
    .getElementById("progress")!
    .setAttribute("style", `height: ${currentScroll}%`);
});

window.addEventListener("resize", () => {
  windowHeight = window.innerHeight;
});
