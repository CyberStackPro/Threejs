import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// OrbitControls = require("three/examples/jsm/controls/OrbitControls");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

//  Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  //   console.log(event);
  //   console.log(event.clientX, event.clientY);
  //   console.log(event.pageX, event.pageY);
  //   console.log(event.offsetX, event.offsetY);
  //   console.log(event.target);
  //   console.log(event.currentTarget);
  //   console.log(event.eventPhase);
  //   console.log(event.bubbles);
  //   console.log(event.cancelable);
  //   console.log(event.isTrusted);
  //   console.log(event.button);
  //   console.log(event.buttons);
  //   console.log(event.relatedTarget);
  //   console.log(event.screenX, event.screenY);
  //   console.log(event.shiftKey);
  //   console.log(event.ctrlKey);
  //   console.log(event.altKey);
  //   console.log(event.metaKey);
  //   console.log(event.which);
  //   console.log(event.keyCode);
  //   console.log(event.key);
  //   console.log(event.code);
  //   console.log(event.repeat);
  //   console.log(event.altKey);
  //   console.log(event.metaKey);
  //   console.log(event.ctrlKey);
  //   console.log(event.key);
  //   console.log(event.code);
  //   console.log(event.repeat);
  //   console.log(event);
});
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  //   Update Camera
  // camera.position.x = Math.cos(elapsedTime);
  // camera.position.y = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position);

  //   camera.position.x = cursor.x * 10;
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);

  //   camera.position.y = cursor.y * 10;
  //   camera.lookAt(new THREE.Vector3());

  //   Update Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
