import ShaderTex from "./templates/shadertex";
import frag from "../shaders/test/circle.frag?raw";

export default function Sky() {
  return (
    <div className="sky">
      <ShaderTex frag={frag} />
    </div>
  );
}
