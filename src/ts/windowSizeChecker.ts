const windowsSizeChecker = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const screenRatio = width / height;
  const isLandscape = screenRatio > 1;

  if (
    screenRatio > 2.3 
    // && document.getElementById("webgl")!.style.display === "block"
  ) {
    document.getElementById("webgl")!.style.display = "none";
  } else if (
    screenRatio < 2.3 
    // && document.getElementById("webgl")!.style.display === "none"
  ) {
    document.getElementById("webgl")!.style.display = "inline";
  }
};

export default windowsSizeChecker;
