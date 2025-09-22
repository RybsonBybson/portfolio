precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;

const float scale = 1.;

float wobble_strength = 4.;
float wooble_frequency = .8;


void main() {
   vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.);
   vec2 uv = gl_FragCoord.xy / u_resolution.xy;
   uv *= aspect;
   uv /= scale;
   uv.x -= 1. * scale;

   float fps = 12.0;
   float frame = floor(u_time * fps);

   uv.x -= (1.0 - uv.y) / cos(cos(frame / 10.)) * .2;
   uv.x += (sin(frame) / fps) / wobble_strength * cos(uv.y * fps * wooble_frequency);


   if(uv.x < 0. || uv.x >= 1. || uv.y < 0. || uv.y >= 1.){
    gl_FragColor = vec4(0, 0, 0, 0);
    return;
   }

   vec4 texColor = texture2D(u_texture, uv);
   gl_FragColor = texColor;
}
