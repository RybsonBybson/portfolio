precision mediump float;

uniform vec2 u_resolution;
uniform vec3 u_colorA; // kolor 0
uniform vec3 u_colorB; // kolor 1

float pixelSize = 16.;

// 4x4 Bayer matrix normalizowana do 0..1
float bayer4x4(vec2 pos) {
    int x = int(mod(pos.x, 4.0));
    int y = int(mod(pos.y, 4.0));
    
    int idx = y * 4 + x;
    float[16] matrix = float[16](
        0.0, 8.0, 2.0,10.0,
       12.0, 4.0,14.0, 6.0,
        3.0,11.0, 1.0, 9.0,
       15.0, 7.0,13.0, 5.0
    );
    
    return matrix[idx] / 16.0;
}

void main() {
    vec2 uv = gl_FragCoord.xy; // pikselowe współrzędne

    uv = floor(uv * pixelSize) / pixelSize;
   
    // prosty test: jasność zależna od pozycji
    float brightness = gl_FragCoord.x / u_resolution.x;

    float threshold = bayer4x4(uv);

    vec3 color = (brightness > threshold) ? u_colorB : u_colorA;

    gl_FragColor = vec4(color, 1.0);
}
