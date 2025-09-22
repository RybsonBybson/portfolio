import { loadTex, texToMesh } from "./helpers";
import { animationsCallbacks, camera, fsc } from "./setup";
import * as THREE from "three";

const raycaster = new THREE.Raycaster();

export const CURSOR = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  cmesh: new THREE.Mesh(),
};

export const spawnCursor = async () => {
  const cursorTex = await loadTex("public/img/cursor.png");
  const cmesh = texToMesh(cursorTex, undefined, 2);
  cmesh.name = "CURSOR";
  fsc.add(cmesh);

  CURSOR.cmesh = cmesh;
};

/**
 *
 * @param {MouseEvent} e
 */
const updateMousePos = (e) => {
  CURSOR.x = e.clientX;
  CURSOR.y = e.clientY;
};

const checkIntersections = () => {
  const mouse = new THREE.Vector2(
    (CURSOR.x / window.innerWidth) * 2 - 1,
    -(CURSOR.y / window.innerHeight) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(fsc.children, true);

  const filtered = intersects.filter(
    (int) => int.object.name !== "CURSOR" && int.object.type !== "Scene"
  );
  console.log(filtered);

  if (filtered.length > 0) {
    filtered.forEach((element) => {
      console.log(element.name);

      element?.material?.opacity?.set(0.0);
    });
  }
};

window.addEventListener("mousemove", updateMousePos);
window.addEventListener("click", checkIntersections);

animationsCallbacks.push((time, dt) => {
  CURSOR.cmesh.position.set(CURSOR.x, window.innerHeight - CURSOR.y, 0);
  CURSOR.cmesh.rotateZ(dt);
});
