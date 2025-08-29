precision mediump float;

uniform vec2 u_resolution;

void main() {
    // Normalizowane współrzędne od -1 do 1
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y; // zachowanie proporcji

    float radius = 0.5; // promień okręgu
    float dist = length(uv);

    if (dist < radius) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // biały
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // czarny
    }
}
