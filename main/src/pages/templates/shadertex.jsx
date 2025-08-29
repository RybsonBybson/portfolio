import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";

export default function ShaderTex({ frag, unis = {} }) {
  const shaders = Shaders.create({
    shader: {
      frag: GLSL`${frag}`,
    },
  });

  return (
    <Surface width={window.innerWidth} height={window.innerHeight}>
      <Node shader={shaders.shader} uniforms={unis} />
    </Surface>
  );
}
