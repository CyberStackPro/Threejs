import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

// First Solution
// const positionsArray = new Float32Array(9)

// positionsArray[0] = 0;
// positionsArray[1] = 0;
// positionsArray[2] = 0;

// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;

// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

// Second Solution
const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionsAttribute);
// geometry.setAttribute("position", positionsAttribute);

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
console.log("#######", positionsArray);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

// const positionsArray = new Float32Array([0, 0, 1, 0, 1, 0, 1, 0, 0]);

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //   Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  //   console.log("double click");

  //   if in some browser this didn't work  there is option 2
  //   if (!document.fullscreenElement) {
  //     canvas.requestFullscreen();
  //     console.log("go Fullscreen");
  //   } else {
  //     document.exitFullscreen();
  //     console.log("leave fullscreen");
  //   }

  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.exitFullscreen();
    }
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// const screenshotTarget = document.body;

// const capture = async () => {
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");
//   const video = document.createElement("video");

//   try {
//     const captureStream = await navigator.mediaDevices.getDisplayMedia();
//     video.srcObject = captureStream;
//     context.drawImage(video, 0, 0, window.width, window.height);
//     const frame = canvas.toDataURL("image/png");
//     captureStream.getTracks().forEach((track) => track.stop());
//     window.location.href = frame;
//   } catch (err) {
//     console.error("Error: " + err);
//   }
// };

// capture();
