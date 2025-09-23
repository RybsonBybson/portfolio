import { loadTex, SpriteSheetMaterial, texToMesh } from "./helpers";
import { animationsCallbacks, camera, fsc } from "./setup";
import * as THREE from "three";

export const CURSOR_EVENTS = {
  click: "c_click",
  hover: "c_hover",
  unhover: "c_unhover",
};
const raycaster = new THREE.Raycaster();

/**
 * @type {number} cmesh.tex
 */
export const CURSOR = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  cmesh: new THREE.Mesh(),

  spawnCursor: async () => {
    const cursorsheet = new SpriteSheetMaterial(
      "public/img/cursorsheet.png",
      16
    );
    cursorsheet.transparent = true;
    await cursorsheet.load();
    const cmesh = texToMesh({
      material: cursorsheet,
      scale: 2,
      width: cursorsheet.spriteSize,
      height: cursorsheet.spriteSize,
    });
    cmesh.name = "CURSOR";
    fsc.add(cmesh);
    CURSOR.cmesh = cmesh;
  },
};

/**
 *
 * @param {MouseEvent} e
 */
const updateMousePos = (e) => {
  CURSOR.x = e.clientX;
  CURSOR.y = e.clientY;
};

let previouslyhovered = [];
/**
 *
 * @param {[]} hovered
 */
const checkUnhovered = (hovered) => {
  const filtered = previouslyhovered.filter((item) => !hovered.includes(item));

  filtered.forEach((element) => {
    console.log(element.name);

    document.dispatchEvent(
      new CustomEvent(CURSOR_EVENTS.unhover, { detail: element.object.id })
    );
  });

  previouslyhovered = hovered;
};

/**
 *
 * @param {string} event
 */
const checkIntersections = (event) => {
  const mouse = new THREE.Vector2(
    (CURSOR.x / window.innerWidth) * 2 - 1,
    -(CURSOR.y / window.innerHeight) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(fsc.children, true);

  const filtered = intersects.filter(
    (int) => int.object.name !== "CURSOR" && int.object.type !== "Scene"
  );
  checkUnhovered(filtered);
  if (filtered.length <= 0) return;

  filtered.forEach((element) => {
    document.dispatchEvent(
      new CustomEvent(event, { detail: element.object.id })
    );
  });
};

window.addEventListener("mousemove", updateMousePos);
window.addEventListener("mousemove", () => {
  checkIntersections(CURSOR_EVENTS.hover);
});
window.addEventListener("click", () => {
  checkIntersections(CURSOR_EVENTS.click);
});

animationsCallbacks.push((time, dt) => {
  CURSOR.cmesh.position.set(CURSOR.x, window.innerHeight - CURSOR.y, 0);
  CURSOR.cmesh.rotateZ(dt);
});
