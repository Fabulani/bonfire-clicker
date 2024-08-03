import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import Stats from "three/addons/libs/stats.module.js";
import { Bonfire } from "./src/Bonfire.js";

if (WebGL.isWebGL2Available()) {
  init();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}

function init() {
  // FPS counter
  const stats = new Stats();
  container.appendChild(stats.dom);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const bonfire = new Bonfire();
  scene.add(bonfire.mesh);

  camera.position.z = 5;

  function animate() {
    bonfire.mesh.rotation.x += 0.01;
    bonfire.mesh.rotation.y += 0.01;
    stats.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}
