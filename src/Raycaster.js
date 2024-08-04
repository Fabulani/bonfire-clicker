import * as THREE from "three";

export class Raycaster extends THREE.Raycaster {
  constructor(renderer, camera, intersectGroup) {
    super();
    this.renderer = renderer;
    this.camera = camera;
    this.intersectGroup = intersectGroup;
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
    }
  }
}
