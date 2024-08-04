import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import Stats from "three/addons/libs/stats.module.js";
import { Bonfire } from "./src/Bonfire.js";
import { Raycaster } from "./src/Raycaster.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Check if WebGL2 is available
if (WebGL.isWebGL2Available()) {
  init();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}

function init() {
  /* Initialize */

  // Setup renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // Setup scene
  const scene = new THREE.Scene();

  // Setup camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.x = 5;
  camera.position.y = 5;
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // Setup controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // controls.maxDistance = 20;
  // controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enablePan = false;

  // Setup lights
  const light = new THREE.PointLight(0xffffff, 5, 100);
  light.position.set(0, 1.5, 0);
  light.castShadow = true;
  const helper = new THREE.AxesHelper();
  light.add(helper);
  const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(shadowHelper);
  scene.add(light);

  // Add bonfire
  const clickables = new THREE.Group();
  const bonfire = new Bonfire();
  clickables.add(bonfire.mesh);
  scene.add(clickables);

  // Add placeholder cubes
  for (let x = -6; x <= 6; x += 3) {
    for (let z = -6; z <= 6; z += 3) {
      if (x == 0 && z == 0) {
        continue;
      }
      const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshLambertMaterial({ color: color });
      const newObj = new THREE.Mesh(geometry, material);
      newObj.position.x = x;
      newObj.position.z = z;
      newObj.castShadow = true;
      newObj.receiveShadow = true;
      scene.add(newObj);
    }
  }

  // Floor
  const geometry = new THREE.PlaneGeometry(20, 20).rotateX(-Math.PI / 2);
  const material = new THREE.MeshLambertMaterial({ color: 0x808080 });
  const floor = new THREE.Mesh(geometry, material);
  floor.receiveShadow = true;
  floor.position.y = -0.5;
  scene.add(floor);

  // Game stats
  let counter = 0;

  // FPS counter
  const stats = new Stats();
  container.appendChild(stats.dom);

  // Groups
  const floatingCountGroup = new THREE.Group();
  scene.add(floatingCountGroup);

  // Raycaster
  const raycaster = new Raycaster(
    renderer,
    camera,
    clickables,
    counter,
    floatingCountGroup
  );
  document.addEventListener("mousedown", raycaster.onMouseDown.bind(raycaster));

  // Animation loop
  function animate() {
    stats.update();
    controls.update();
    //TODO: add floating text animation
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}
