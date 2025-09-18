/**
 *
 * @param {string} hex
 */
export function hexToRgbVec3(hex) {
  let bigint = parseInt(hex.replace("#", ""), 16);
  let r = ((bigint >> 16) & 255) / 255;
  let g = ((bigint >> 8) & 255) / 255;
  let b = (bigint & 255) / 255;
  return [r, g, b];
}
