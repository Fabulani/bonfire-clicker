import * as THREE from "three";

export class Bonfire {
  mesh = null;

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    this.mesh = cube;
    console.log(this.mesh);
  }
}
