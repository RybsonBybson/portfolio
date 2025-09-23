import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

let lastTime = 0;
const canvas = document.querySelector("#root");
export const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: false,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
export const fsc = new THREE.Scene();
export const camera = new THREE.OrthographicCamera(
  0,
  window.innerWidth,
  window.innerHeight,
  0,
  -1000,
  1000
);

export const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(fsc, camera);
renderPass.clear = true;
renderPass.camera.layers.set(1);
composer.addPass(renderPass);

/**
 * @type {CallableFunction[]}
 */
export const animationsCallbacks = [];

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.right = window.innerWidth;
  camera.top = window.innerHeight;
  camera.bottom = 0;
  camera.left = 0;
};

const updateUniforms = (time) => {
  fsc.traverse((element) => {
    if (!element.material?.uniforms) return;

    element.material.uniforms.u_time.value = time / 1000;
    element.material.uniforms.u_resolution.value = new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    );
  });
};

const animate = (time) => {
  requestAnimationFrame(animate);
  const dt = (time - lastTime) * 0.001;
  updateUniforms(time);
  animationsCallbacks.forEach((fn) => fn(time, dt));

  camera.layers.set(0);
  renderer.render(fsc, camera);
  // camera.layers.set(1);
  // composer.render();

  lastTime = time;
};

/**EXEC */
camera.position.z = 5;
resize();
animate();
window.addEventListener("resize", resize);
