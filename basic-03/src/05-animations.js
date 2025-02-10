import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object (Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1); // Shape: Cube with dimensions 1x1x1
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Material: Basic red color (not affected by lights)
const mesh = new THREE.Mesh(geometry, material); // Combine geometry and material into a mesh
scene.add(mesh); // Add the cube to the scene

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // Perspective camera (like human eye)
camera.position.z = 3; // Move camera back on the Z axis
scene.add(camera); // Add camera to the scene (good practice)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // Create WebGL renderer to draw the scene on the canvas
renderer.setSize(sizes.width, sizes.height); // Set renderer size to canvas size
renderer.render(scene, camera); // Initial render of the scene

// Time (Manual Time Tracking - you can also use THREE.Clock)
let time = Date.now();

// Using THREE.Clock for time (alternative to manual time tracking)
const clock = new THREE.Clock();

// GSAP Animations (move the cube)
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 }); // Move to x:2 after 1s delay, over 1s
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 }); // Move back to x:0 after 2s delay, over 1s

// Animation Loop (Tick function)
const tick = () => {
  // console.log("tick"); // For debugging - see how often tick is called

  // Update objects (animations can be placed here if not using GSAP)
  // mesh.position.x += 0.01; // Example of frame-rate dependent animation

  // Manual Time Tracking (if not using THREE.Clock)
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // Using THREE.Clock for Elapsed Time (frame-rate independent)
  const elapsedTime = clock.getElapsedTime();
  // console.log(deltaTime); // If using manual time, you can log deltaTime

  // Example Animations based on time (elapsedTime or deltaTime)
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.001 * deltaTime; // Frame-rate independent rotation using deltaTime
  // mesh.rotation.y = elapsedTime;
  // mesh.rotation.y = elapsedTime * Math.PI * 1; // Continuous rotation
  // mesh.position.y = Math.sin(elapsedTime); // Oscillating Y position
  // mesh.position.x = Math.cos(elapsedTime); // Circular X position with Y position
  // mesh.scale.z = Math.sin(elapsedTime) * 3; // Oscillating scale on Z axis

  // Render the scene with the updated objects and camera
  renderer.render(scene, camera);

  // Call tick again on the next frame to create a loop
  window.requestAnimationFrame(tick);
};

tick(); // Start the animation loop by calling tick for the first time
