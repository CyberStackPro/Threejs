import * as THREE from "three";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0;
// mesh.position.y = 0;
// mesh.position.z = 0;
// mesh.position.set(1, 1, 1);
// scene.add(mesh);

const group = new THREE.Group();
// group.position.y = 1;
group.scale.y = 1.5;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;

group.add(cube3);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// console.log(mesh.position.length());

// Scale
mesh.scale.x = 2;
mesh.scale.y = 1;
mesh.scale.z = 1;

// Rotate
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(
  75,
  //   window.innerWidth / window.innerHeight,
  sizes.width / sizes.height
  //   0.1,
  //   1000
);
camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;

// camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.lookAt(mesh.position);
scene.add(camera);

const animate = function () {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

const canvas = document.querySelector(".webgl");
// canvas.classList.add("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
console.log(canvas);

renderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
