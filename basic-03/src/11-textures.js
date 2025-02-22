import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const imageSource = "/textures/door/color.jpg";
const imageTexture1 = "/textures/door/alpha.jpg";
const imageTexture2 = "/textures/door/ambientOcclusion.jpg";
const imageTexture3 = "/textures/door/height.jpg";
const imageTexture4 = "/textures/door/metalness.jpg";
const imageTexture5 = "/textures/door/normal.jpg";
const imageTexture6 = "/textures/minecraft.png";
const imageTexture7 = "/textures/checkerboard-8x8.png";
const imageTexture8 = "/textures/checkerboard-1024x1024.png";

/**
 * Textures
 */

// but instead of creating like this image loader we can use THREE texture loaders
const loaderManager = new THREE.LoadingManager();

//  List of loaders manager
loaderManager.onStart = () => {
  console.log("Start");
};
loaderManager.onProgress = () => {
  console.log("Progress");
};
loaderManager.onError = () => {
  console.log("Error");
};
loaderManager.onLoad = () => {
  console.log("Load");
};
const textureLoader = new THREE.TextureLoader(loaderManager);
const texture = textureLoader.load(
  imageTexture7
  // but instead od doing like this we can use loaderManager
  // () => {
  //   console.log("load");
  // },

  // () => {
  //   console.log("Progress");
  // },

  // () => {
  //   console.log("Error");
  // }
);

// texture.repeat.x = 2;
// texture.repeat.y = 3;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;
// texture.rotation = Math.PI / 4;
// texture.center.x = 0.5;
// texture.center.y = 0.5;
// texture.minFilter = THREE.NearestFilter;
texture.generateMipmaps = false;
texture.magFilter = THREE.NearestFilter;
// #2
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   texture.needsUpdate = true;

//   // console.log("Image loaded");
// };

// or using add even  listener
// texture.addEventListener('load', ()=>{
//   texture.needsUpdate = true
// })

// in this way it will not going to work
// image.onload = () => {
//   const texture = new THREE.Texture(image);
//   console.log(texture);

//   // console.log("Image loaded");
// };
// image.src = imageSource;

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
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material = new THREE.MeshBasicMaterial({ map: texture });

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

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
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
