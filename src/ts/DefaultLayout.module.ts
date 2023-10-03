import windowsSizeChecker from "./windowSizeChecker";

console.log("DefaultLayout.module.ts");

window.addEventListener("resize", () => {
  windowsSizeChecker();
});

alert(
  "The website is still under development. Will be available soon with more features."
);
