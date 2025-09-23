import * as THREE from "three";
import { fsc } from "./setup";
import { loadTex, texToMesh } from "./helpers";
import { CURSOR, CURSOR_EVENTS } from "./cursor";

const nav = new THREE.Group();
nav.name = "NAVIGATION";
fsc.add(nav);

const createNavBtn = async (
  width,
  height,
  direction,
  pos,
  clickaction = () => {}
) => {
  const tex = await loadTex("public/img/arrow.png");
  const arrow = texToMesh({ tex: tex, scale: 4 });
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

  const moveStrength = 10;
  direction -= Math.PI / 2;
  document.addEventListener(CURSOR_EVENTS.hover, (id) => {
    if (id.detail !== btn.id || btn.hover) return;
    btn.hover = true;
    arrow.material.opacity = 0.7;
    arrow.position.add(
      new THREE.Vector3(
        Math.cos(direction) * moveStrength,
        Math.sin(direction) * moveStrength
      )
    );
    CURSOR.cmesh.material.changeToFrame(CURSOR.cmesh.material.maxFrames - 1);
  });

  document.addEventListener(CURSOR_EVENTS.unhover, (id) => {
    if (id.detail !== btn.id || !btn.hover) return;
    btn.hover = false;
    arrow.material.opacity = 0.1;
    arrow.position.sub(
      new THREE.Vector3(
        Math.cos(direction) * moveStrength,
        Math.sin(direction) * moveStrength
      )
    );
    CURSOR.cmesh.material.changeToFrame(0);
  });

  nav.add(btn);
};

const thickness = 70;

//top
createNavBtn(
  window.innerWidth - thickness * 2,
  thickness,
  0,
  new THREE.Vector3(window.innerWidth / 2, window.innerHeight - thickness / 2)
);
//bottom
// createNavBtn(
//   window.innerWidth - thickness * 2,
//   thickness,
//   Math.PI,
//   new THREE.Vector3(window.innerWidth / 2, thickness / 2)
// );
//left
createNavBtn(
  thickness,
  window.innerHeight,
  Math.PI / 2,
  new THREE.Vector3(thickness / 2, window.innerHeight / 2)
);
//right
createNavBtn(
  thickness,
  window.innerHeight,
  -Math.PI / 2,
  new THREE.Vector3(window.innerWidth - thickness / 2, window.innerHeight / 2)
);
