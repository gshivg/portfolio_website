/**
 * This file calulates the scroll value and the window height to calculate the progress bar
 */

import childrenNumberCalculator from "../../ts/sectionNumberCalculator";

let scrollValue = window.scrollY;
let windowHeight = window.innerHeight;

const sectionCount = childrenNumberCalculator("section-wrapper")! - 1;
console.log("sectionCount", sectionCount);

window.addEventListener("scroll", () => {
  scrollValue = window.scrollY;

  let currentScroll = (scrollValue / (windowHeight * sectionCount)) * 100;
  if (currentScroll > 100) {
    currentScroll = 100;
  }
  document
    .getElementById("progress")!
    .setAttribute("style", `height: ${currentScroll}%`);
});

window.addEventListener("resize", () => {
  windowHeight = window.innerHeight;
});
