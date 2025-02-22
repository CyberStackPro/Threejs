import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const imageSource = "/textures/door/color.jpg";
const doorColor = "/textures/door/color.jpg";
const doorAlpha = "/textures/door/alpha.jpg";
const doorAmbientOcclusion = "/textures/door/ambientOcclusion.jpg";
const doorHeight = "/textures/door/height.jpg";
const doorNormal = "/textures/door/normal.jpg";
const doorMinecraft = "/textures/minecraft.png";
const doorMetalness = "/textures/door/metalness.png";
const doorRoughness = "/textures/door/roughness.jpg";
const matcapTexture = "/textures/matcaps/6.png";
const gradient = "/textures/gradients/3.jpg";
import * as dat from "dat.gui";

/**
 *  Texture
 */

const gui = new dat.GUI();

/**
 *  Texture
 */
const loaderManager = new THREE.LoadingManager();

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
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load(doorColor);
const doorMetalnessTexture = textureLoader.load(doorMetalness);
const roughnessTexture = textureLoader.load(doorRoughness);
const normalTexture = textureLoader.load(doorNormal);
const doorAlphaTexture = textureLoader.load(doorAlpha);
const gradientTexture = textureLoader.load(gradient);
const doorHeightTexture = textureLoader.load(doorHeight);
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusion);

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/3/px.jpg",
  "/textures/environmentMaps/3/nx.jpg",
  "/textures/environmentMaps/3/py.jpg",
  "/textures/environmentMaps/3/ny.jpg",
  "/textures/environmentMaps/3/pz.jpg",
  "/textures/environmentMaps/3/nz.jpg",
]);
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// matcap
// const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color(0xff00ff)

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
// // material.roughness = 0.65;
// // material.metalness = 0.45;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.metalnessMap = doorMetalnessTexture;
// material.roughness = roughnessTexture;

// material.displacementScale = 0.05;

// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2;
material.metalness = 0.7;

material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.01);

gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

// material.matcap = textureLoader.load(matcapTexture);
// material.map = doorColorTexture;
// material.color = new THREE.Color("red");
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// material.color = new THREE.Color("rgb");

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);
sphere.position.x = -1.5;

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material
);
// sphere.position.x = -1.5;

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const point = new THREE.PointLight(0xffffff, 0.5);
point.position.set(2, 3, 4);
scene.add(point);
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
camera.position.z = 2;
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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
