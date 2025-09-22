import * as THREE from "three";
import { fsc } from "./setup";
import pixelgradient from "/shaders/pixelgradient.frag?url&raw";
import waving from "/shaders/waving.frag?url&raw";
import { hexToRgbVec3, loadTex, texToMesh } from "./helpers";
import { spawnCursor } from "./cursor";

spawnCursor();

const mainScene = new THREE.Scene();
mainScene.name = "MAIN SCENE";

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
sign.name = "sign";
sign.position.z = -1;

const scale = 8;

const texbase = await loadTex("public/img/slup.png");
const base = texToMesh(
  texbase,
  new THREE.Vector3(window.innerWidth / 2, (texbase.height * scale) / 2),
  scale
);

sign.add(base);

const texpaper = await loadTex("public/img/paper.png");
const paper = texToMesh(texpaper, new THREE.Vector3(0, 20 * scale), scale);

const texav = await loadTex("public/img/RybsonBybson pixel.png");
const av = texToMesh(texav, new THREE.Vector3(0, -5 * scale), scale / 32);

paper.add(av);
base.add(paper);
mainScene.add(sign);
