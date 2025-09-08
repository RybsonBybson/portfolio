import ShaderTex from "./templates/shadertex";
import frag from "../shaders/pixelgradient.frag?raw";
import { useRef } from "react";

export default function Sky() {
  const parent = useRef();

  return (
    <div ref={parent} className="sky">
      <ShaderTex frag={frag} parent={parent} />
    </div>
  );
}
