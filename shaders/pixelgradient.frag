precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float speed = .4;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
float pixelSize = 8.0;
float brightness = 1.;

void main() {
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.);
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv *= aspect;

    uv = floor(uv * pixelSize) / pixelSize;
    float t = (uv.x * uv.y) + u_time * speed;
    vec3 color = mix(u_colorA * brightness, u_colorB * brightness, 0.5 + 0.5 * sin(t));

    gl_FragColor = vec4(color, 1.0);
}
