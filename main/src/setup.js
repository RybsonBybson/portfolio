import * as THREE from "three";

let lastTime = 0;
const canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
export const fsc = new THREE.Scene();
export const camera = new THREE.OrthographicCamera(
  0,
  window.innerWidth,
  window.innerHeight,
  0,
  -1000,
  1000
);

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

    element.material.uniforms.u_time.value = time * 0.001;
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
  renderer.render(fsc, camera);

  lastTime = time;
};

/**EXEC */
camera.position.z = 5;
resize();
animate();
window.addEventListener("resize", resize);
