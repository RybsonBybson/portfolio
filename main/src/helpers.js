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
  tex.colorSpace = THREE.SRGBColorSpace;

  if (pixel) {
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
  }

  return tex;
};

/**
 *
 * @param {{tex: THREE.Texture, pos: THREE.Vector3, scale: number, material: THREE.Material, width: number, height: number}} options
 */
export const texToMesh = (options) => {
  if (!options.pos) options.pos = new THREE.Vector3(0, 0, 0);
  if (!options.scale) options.scale = 1;
  if (!options.width) options.width = options.tex.width;
  if (!options.height) options.height = options.tex.height;

  const m = options.material
    ? options.material
    : new THREE.MeshBasicMaterial({
        map: options.tex,
        transparent: true,
      });

  const w = options.width * options.scale;
  const h = options.height * options.scale;

  const geometry = new THREE.PlaneGeometry(w, h);
  const mesh = new THREE.Mesh(geometry, m);
  mesh.position.set(...options.pos);

  return mesh;
};

export class SpriteSheetMaterial extends THREE.MeshBasicMaterial {
  constructor(path, spriteSize = 64, pixel = true) {
    super();

    this.path = path;
    this.spriteSize = spriteSize;
    this.pixel = pixel;
    this.frame = 0;
  }

  async load() {
    this.tex = await loadTex(this.path, this.pixel);

    this.tilesHoriz = Math.floor(this.tex.width / this.spriteSize);
    this.tilesVert = Math.floor(this.tex.height / this.spriteSize);
    this.maxFrames = this.tilesHoriz * this.tilesVert;

    this.tex.wrapS = THREE.RepeatWrapping;
    this.tex.wrapT = THREE.RepeatWrapping;
    this.tex.repeat.set(1 / this.tilesHoriz, 1 / this.tilesVert);

    this.changeToFrame(0);
  }

  changeToFrame(frame = 0) {
    this.frame = frame % this.maxFrames;

    const column = this.frame % this.tilesHoriz;
    const row = Math.floor(this.frame / this.tilesHoriz);

    this.tex.offset.x = column / this.tilesHoriz;
    this.tex.offset.y = 1 - (row + 1) / this.tilesVert;

    this.map = this.tex;
  }
}
