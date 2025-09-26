import * as THREE from "three";
import { animationsCallbacks, camera, composer, fsc, renderer } from "./setup";
import pixelgradient from "/shaders/pixelgradient.frag?url&raw";
import waving from "/shaders/waving.frag?url&raw";
import { hexToRgbVec3, loadTex, texToMesh } from "./helpers";
import { CURSOR, CURSOR_EVENTS } from "./cursor";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

CURSOR.spawnCursor();

const mainScene = new THREE.Scene();
mainScene.name = "MAIN SCENE";
mainScene.position.sub(
  new THREE.Vector3(window.innerWidth / 2, window.innerHeight / 2)
);

const geometry = new THREE.PlaneGeometry(
  window.innerWidth * 2,
  window.innerHeight * 2
);
const material = new THREE.ShaderMaterial({
  fragmentShader: pixelgradient,
  uniforms: {
    u_time: { value: 0.0 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_colorA: { value: new THREE.Vector3(...hexToRgbVec3("#2b0c2e")) },
    u_colorB: { value: new THREE.Vector3(...hexToRgbVec3("#181425")) },
  },
});

const bg = new THREE.Mesh(geometry, material);
bg.position.z = -5;

fsc.add(mainScene);
mainScene.add(bg);

const sign = new THREE.Group();
sign.position.z = -1;

const scale = 8;

const texbase = await loadTex("public/img/slup.png");
const base = texToMesh({
  tex: texbase,
  pos: new THREE.Vector3(window.innerWidth / 2, (texbase.height * scale) / 2),
  scale: scale,
});

sign.add(base);

const fullpaper = new THREE.Group();
const texpaper = await loadTex("public/img/paper.png");
const paper = texToMesh({
  tex: texpaper,
  pos: new THREE.Vector3(0, 20 * scale),
  scale: scale,
});
const texav = await loadTex("public/img/RybsonBybson pixel.png");
const av = texToMesh({
  tex: texav,
  pos: new THREE.Vector3(0, -5 * scale),
  scale: scale / (texav.width / 16),
});

fullpaper.add(paper);
paper.add(av);
base.add(fullpaper);
mainScene.add(sign);

// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-
// -=-=-=-=-=-=-=-=-=-=-=-=-

const groupLayer = 1;
// fullpaper.layers.set(groupLayer);

const shaderPass = new ShaderPass({
  uniforms: {
    u_time: { value: 0 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
  },
  fragmentShader: waving,
});

shaderPass.material.transparent = true;
composer.addPass(shaderPass);

animationsCallbacks.push((time, dt) => {
  shaderPass.uniforms.u_time.value = time / 1000;
  shaderPass.uniforms.u_resolution.value = new THREE.Vector2(
    window.innerWidth,
    window.innerHeight
  );
});

// fullpaper.traverse((obj) => {
//   obj.layers.set(1);
// });

// TEST

// document.addEventListener(CURSOR_EVENTS.hover, (id) => {
//   if (id.detail !== av.id || av.hover) return;
//   av.hover = true;
//   av.scale.add(new THREE.Vector3(0.1, 0.1));
//   CURSOR.cmesh.material.changeToFrame(CURSOR.cmesh.material.maxFrames - 1);
// });
