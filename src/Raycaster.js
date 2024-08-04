import * as THREE from "three";
import { FloatingCount } from "./FloatingCount.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export class Raycaster extends THREE.Raycaster {
  constructor(renderer, camera, intersectGroup, counter, floatingCountGroup) {
    super();
    this.renderer = renderer;
    this.camera = camera;
    this.intersectGroup = intersectGroup;
    this.counter = counter;
    this.floatingCountGroup = floatingCountGroup;
  }

  onMouseDown(event) {
    const coords = new THREE.Vector2(
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
      -((event.clientY / this.renderer.domElement.clientHeight) * 2 - 1)
    );
    this.setFromCamera(coords, this.camera);

    const intersections = this.intersectObjects(
      this.intersectGroup.children,
      true
    );
    if (intersections.length > 0) {
      const selectedObject = intersections[0].object;
      const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      selectedObject.material.color = color;
      this.counter++;

      // Rough implementation for floating text spawner
      let params;

      const loader = new FontLoader();
      loader.load(
        "../public/fonts/helvetiker_regular.typeface.json",
        function (font) {
          params = {
            font: font,
            size: 1,
            depth: 1,
            curveSegments: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1,
          };
        }
      );
      const floatingCount = new FloatingCount(
        this.counter,
        params,
        this.floatingCountGroup
      );
      console.log(this.counter);
    }
  }
}
