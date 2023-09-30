import * as THREE from "three";
// import gsap from "gsap";
// import GUI from "lil-gui";

console.log("Three.js");


// Reload to top of page
window.onload = function() {
  document.location.hash = "";
}

// Setup
THREE.ColorManagement.enabled = false;

// // Debug
// const projectParameters = {
//   primaryColor: "#ffeded",
// };
// const gui = new GUI();
// gui.addColor(projectParameters, "primaryColor").onChange(() => {
//   // cube.material.color.set(projectParameters.primaryColor);
// });

// Loaders
const textureLoader = new THREE.TextureLoader();
// const texture1 = textureLoader.load("textures/1.jpg");
// const texture2 = textureLoader.load("textures/2.jpg");
// const texture3 = textureLoader.load("textures/3.jpg");
const texture4 = textureLoader.load("textures/4.jpg");
// const texture5 = textureLoader.load("textures/5.jpg");
const texture6 = textureLoader.load("textures/6.jpg");
// const texture7 = textureLoader.load("textures/7.jpg");
// const texture8 = textureLoader.load("textures/8.jpg");
// const texture9 = textureLoader.load("textures/9.jpg");
// const texture10 = textureLoader.load("textures/10.jpg");
// const texture11 = textureLoader.load("textures/11.jpg");
const texture12 = textureLoader.load("textures/12.jpg");
// const texture13 = textureLoader.load("textures/13.jpg");

const aplhaTexture = textureLoader.load("textures/alpha/1.png");

// Canvas
const canvas = document.querySelector("canvas.three");
//Scene
const scene = new THREE.Scene();

// Window size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Update Widnow Size
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  10,
  0xfff
);
directionalLight.position.set(0, 6, 6);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight, directionalLightHelper);

// Slides
const slide1 = new THREE.Mesh(
  new THREE.PlaneGeometry(25, 25, 10, 10),
  new THREE.MeshBasicMaterial({
    map: texture12,
    alphaMap: aplhaTexture,
    transparent: true,
  })
);

scene.add(slide1);
slide1.name = "slide1";

const slide2 = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5, 10, 10),
  new THREE.MeshBasicMaterial({
    map: texture6,
    alphaMap: aplhaTexture,
    transparent: true,
  })
);
slide2.position.z = -5;
slide2.name = "slide2";

const slide3 = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 5, 10, 10),
  new THREE.MeshBasicMaterial({
    map: texture4,
  })
);
slide3.position.z = -20;
slide3.position.x = 15;
slide3.position.y = 15;
slide3.scale.set(2, 2, 2);
slide3.name = "slide3";
scene.add(slide3);

// Camera
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 6);
cameraGroup.add(camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
  // console.log(cursor.x, cursor.y);

  // // Update Tilt
  // slide1.rotation.x += cursor.y / 1000;
  // slide1.rotation.y += cursor.x / 1000;
});

/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

// let removeAllSlides: boolean = true;

var docHeight = sizes.height * 10;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas!,
  alpha: true,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
let prevTime: number = 0;

const tickFunction = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - prevTime;
  prevTime = elapsedTime;

  // Animate Camera
  // camera.position.y = (-scrollY / sizes.height) * 2;
  const parallaxX = cursor.x / 2;
  const parallaxY = -cursor.y / 2;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 10 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 10 * deltaTime;

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickFunction);

  // Slide 2 Movement
  slide2.rotation.x = Math.sin(elapsedTime) / 100;
  slide2.rotation.y = Math.sin(elapsedTime) / 100;

  // // Slide 3 Movement
  // slide3.rotation.x = cursor.y / 8;
  // slide3.rotation.y = cursor.x / 8;

  // // Camera Movement
  // cameraGroup.rotation.x = cursor.y / 10;
  // cameraGroup.rotation.y = cursor.x / 10;

  scrollY = window.scrollY;

  var currentScroll = (scrollY / docHeight) * 100;

  if (document.getElementById("progress") != null) {
    document
      .getElementById("progress")!
      .setAttribute("style", `height: ${currentScroll}%`);
  }

  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;
    console.log(`Section ${currentSection}`);
  }

  // console.log(`Scroll Y: ${scrollY}`);

  // Remove Slide 1, 2, 3
  if (scrollY >= 1800) {
    slide1.position.x = -(-8.39) + (scrollY - 1800) / 20;

    // slide2.position.x = -7.3428571428571425;
    slide2.position.y = 0 - (scrollY - 1800) / 60;
    // slide2.position.z = -5.86;

    slide3.position.y = (scrollY - 900) / 80;
  } else if (scrollY < 1800) {
    // Slide 1 Movement
    if (currentSection > 1) {
      // scene.remove(slide1);
    } else {
      if (scrollY > 0 && scrollY < 515) {
        slide1.position.z = -scrollY / 20;
        slide1.position.y = -scrollY / 60;
        slide1.position.x = scrollY / 50;
        slide1.rotation.y = -scrollY / 5000;
      }
      scene.add(slide1);
    }

    // Slide 2 Movement
    if (scrollY > 500) {
      if (!scene.getObjectByName("slide2")) {
        scene.add(slide2);
        console.log("Slide 2 added");
      }
      if (scrollY < 1100) {
        slide2.position.z = -(scrollY - 500) / 100;
        slide2.position.x = (scrollY - 1600) / 70;
        // slide2.rotation.y = (scrollY - 800) / 5000;
        slide2.rotation.x = (scrollY - 800) / 5000;
      }
    } else {
      if (scene.getObjectByName("slide2")) {
        scene.remove(slide2);
        console.log("Slide 2 removed");
      }
    }
  }
  if (scrollY > 3000 && scene.getObjectByName("slide1")) {
    scene.remove(slide1);
    scene.remove(slide2);
    scene.remove(slide3);
    console.log("Slide 1, 2, 3 removed");
  } else if (scrollY < 3000 && !scene.getObjectByName("slide1")) {
    scene.add(slide1);
    scene.add(slide2);
    scene.add(slide3);
    console.log("Slide 1, 2, 3 added");
  }
};

tickFunction();
