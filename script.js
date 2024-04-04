import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(3, 5, 3); // width, height, depth
const material = new THREE.MeshLambertMaterial({ color: 191919 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // Optional, 0,0,0 is the default

scene.add(mesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 0); // x, y, z, shining at 0,0 coords
scene.add(dirLight);

// Perspective camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  45, // field of view in degrees
  aspect, // aspect ratio
  1, // near plane
  100 // far plane
);

camera.position.set(9, 4, 4);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Render function
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function rotate(x,y,old_x,old_y) {
  const f_x = x - old_x;
  const f_y = y - old_y;
  if (f_x != 0){
    mesh.rotation.y += (f_x)*(Math.PI/180);
  }
  if (f_y != 0){
    mesh.rotation.x += (f_y)*(Math.PI/180);
  }
}
let old_x = 0
let old_y = 0
document.onmousemove = event => {
  const { clientX, clientY } = event;
  rotate(clientX, clientY, old_x, old_y);
  old_x = clientX;
  old_y = clientY;
}

document.onmousedown = function() {
  render();
};

window.render = render;