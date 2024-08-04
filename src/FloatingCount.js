import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// TODO: change text parameters
export class FloatingCount {
  constructor(text, parameters, floatingCountGroup) {
    const geometry = new TextGeometry(text, parameters);
    const material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    floatingCountGroup.add(this.mesh);
  }

  animation() {
    this.mesh.position.y += 0.1;
  }
}
