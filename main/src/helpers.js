import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

/**
 *
 * @param {string} hex
 */
export const hexToRgbVec3 = (hex) => {
  let bigint = parseInt(hex.replace("#", ""), 16);
  let r = ((bigint >> 16) & 255) / 255;
  let g = ((bigint >> 8) & 255) / 255;
  let b = (bigint & 255) / 255;
  return [r, g, b];
};

export const loadTex = async (path, pixel = true) => {
  const tex = await textureLoader.loadAsync(path);
  if (pixel) {
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
  }

  return tex;
};

/**
 *
 * @param {THREE.Texture} tex
 */
export const texToMesh = (tex, pos = new THREE.Vector3(0, 0, 0), scale = 1) => {
  const material = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
  });

  const w = tex.width * scale;
  const h = tex.height * scale;

  const geometry = new THREE.PlaneGeometry(w, h);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...pos);

  return mesh;
};
