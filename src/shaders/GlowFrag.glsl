varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vColor;
uniform float time;
varying vec2 vUv;

uniform sampler2D noise;

void main() {
  vec4 noiseCol = texture2D(noise, vUv);
  gl_FragColor = vec4(
    (1.0 - vUv.y) * 1.0,
    sin(0.015 * time/400.0) * 0.05,
    sin(0.0006 * time/5.0) * 0.7,
    noiseCol.x * (1.0 - vUv.y) * 2.0
  );
}
