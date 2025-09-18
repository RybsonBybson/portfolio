precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;



void void main(){
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.);
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv *= aspect;
}