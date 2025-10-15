import * as THREE from "three";
import { animationsCallbacks, camera, fsc } from "./setup";
import { loadTex, Settings, texToMesh } from "./helpers";
import { CURSOR, CURSOR_EVENTS, CURSOR_SKINS } from "./cursor";
import * as TWEEN from "@tweenjs/tween.js";

// PARAMETERS

// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-

const nav = new THREE.Group();
nav.position.sub(
  new THREE.Vector3(window.innerWidth / 2, window.innerHeight / 2)
);
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
  const arrow = texToMesh({ tex: tex, scale: Settings.navigation_arrow_scale });
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
    CURSOR.changeSkin(CURSOR_SKINS.pointer);
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
    CURSOR.changeSkin(CURSOR_SKINS.default);
  });

  document.addEventListener(CURSOR_EVENTS.click, (id) => {
    if (id.detail !== btn.id || btn.hover) return;
    clickaction();
  });

  nav.add(btn);
};

/**
 *
 * @param {{x: number, y: number, z: number}} newPos
 */
const cameraMove = (
  newPos,
  duration = Settings.navigation_camera_move_duration,
  easing = TWEEN.Easing.Quadratic.InOut
) => {
  const tween = new TWEEN.Tween(camera.position)
    .to(newPos)
    .duration(duration)
    .easing(easing)
    .start();

  animationsCallbacks.push((time, dt) => tween.update(time));
};

// -=-=-=-=-=-=-=-=-=-

//top
createNavBtn(
  window.innerWidth - Settings.navigation_thickness * 2,
  Settings.navigation_thickness,
  0,
  new THREE.Vector3(
    window.innerWidth / 2,
    window.innerHeight - Settings.navigation_thickness / 2
  ),
  () => cameraMove({ y: window.innerHeight })
);
// bottom
createNavBtn(
  window.innerWidth - Settings.navigation_thickness * 2,
  Settings.navigation_thickness,
  Math.PI,
  new THREE.Vector3(
    window.innerWidth / 2,
    window.innerHeight + Settings.navigation_thickness / 2
  ),
  () => cameraMove({ y: 0 })
);

//left
// createNavBtn(
//   Settings.navigation_thickness,
//   window.innerHeight,
//   Math.PI / 2,
//   new THREE.Vector3(Settings.navigation_thickness / 2, window.innerHeight / 2)
// );
//right
// createNavBtn(
//   Settings.navigation_thickness,
//   window.innerHeight,
//   -Math.PI / 2,
//   new THREE.Vector3(window.innerWidth - Settings.navigation_thickness / 2, window.innerHeight / 2)
// );
