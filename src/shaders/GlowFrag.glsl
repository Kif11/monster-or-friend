varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vColor;
uniform float time;
varying vec2 vUv;

uniform sampler2D noise;
uniform vec3 c1;
uniform vec3 c2;
uniform vec3 c3;
uniform vec3 c4;

void main() {

  float periodicMix = abs(sin(0.015 * time/40.0));
  vec3 col1 = mix(c1, c3, periodicMix);
  vec3 col2 = mix(c2, c4, periodicMix);

  vec3 uvColor = mix(col1, col2, vUv.y);

  vec4 noiseCol = texture2D(noise, vUv);

  gl_FragColor = vec4(uvColor, noiseCol.x * (1.0 - vUv.y) * 2.0);
}
