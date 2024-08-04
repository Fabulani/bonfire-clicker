import * as THREE from "three";

export class Bonfire {
  #mesh = null;

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = false;
    this.#mesh = cube;
  }

  get mesh() {
    return this.#mesh;
  }
}
