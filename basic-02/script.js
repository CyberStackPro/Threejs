const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 1;
scene.add(camera);

// const animate = function () {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// };

const canvas = document.querySelector(".webgl");
// canvas.classList.add("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
console.log(canvas);

renderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
