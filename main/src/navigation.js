import * as THREE from "three";
import { fsc } from "./setup";
import { loadTex, texToMesh } from "./helpers";

const nav = new THREE.Group();
nav.name = "NAVIGATION";
fsc.add(nav);

const createNavBtn = async (width, height, direction, pos) => {
  const tex = await loadTex("public/img/arrow.png");
  const arrow = texToMesh(tex, undefined, 4);
  arrow.material.opacity = 0.1;
  arrow.rotateZ(direction);

  const gb = new THREE.PlaneGeometry(width, height);
  const mb = new THREE.MeshBasicMaterial({
    opacity: 0,
    transparent: true,
  });
  const btn = new THREE.Mesh(gb, mb);

  btn.add(arrow);
  btn.position.set(...pos);

  nav.add(btn);
};

const thickness = 70;

//top
createNavBtn(
  window.innerWidth,
  70,
  0,
  new THREE.Vector3(window.innerWidth / 2, window.innerHeight - thickness / 2)
);
//bottom
createNavBtn(
  window.innerWidth,
  70,
  Math.PI,
  new THREE.Vector3(window.innerWidth / 2, thickness / 2)
);
//left
createNavBtn(
  70,
  window.innerHeight,
  Math.PI / 2,
  new THREE.Vector3(thickness / 2, window.innerHeight / 2)
);
//right
createNavBtn(
  70,
  window.innerHeight,
  -Math.PI / 2,
  new THREE.Vector3(window.innerWidth - thickness / 2, window.innerHeight / 2)
);
