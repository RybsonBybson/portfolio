precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.);
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv *= aspect;
    float pixelSize = 16.0;

    uv = floor(uv * pixelSize) / pixelSize;
    float ast = abs(sin(u_time));
    float t = (uv.x + uv.y) * ast;
    vec3 color = 0.5 + 0.5 * vec3(
        sin(t + 0.0),
        sin(t + 2.0 * 3.1415926 / 3.0),
        sin(t + 4.0 * 3.1415926 / 3.0)
    );

gl_FragColor = vec4(color, 1.0);

}
