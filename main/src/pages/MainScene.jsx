import ShaderTex from "./templates/shadertex";
import frag from "../shaders/pixelgradient.frag?raw";
import { useRef } from "react";
import { hexToRgbVec3 } from "../helpers";
import * as THREE from "three";

export default function MainScene() {
  const parent = useRef();

  return (
    <div ref={parent} className="back">
      <ShaderTex
        frag={frag}
        parent={parent}
        uniforms={{
          u_colorA: { value: new THREE.Vector3(...hexToRgbVec3("#2b0c2e")) },
          u_colorB: { value: new THREE.Vector3(...hexToRgbVec3("#181425")) },
        }}
        className="sky"
      />
    </div>
  );
}
