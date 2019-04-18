@import ./PerlinNoise;

uniform float time;
uniform vec3 color1;
uniform vec3 color2;

varying vec3 vPos;

void main() {
  vec4 c1 = vec4(0.592, 0.701, 0.847, 1.0);
  vec4 c2 = vec4(0.286, 0.145, 0.356, 1.0);
  float freq = 0.00012;

  vec3 scrollingPos = vec3(vPos.x, vPos.y, vPos.z + time);
  float noise = cnoise(scrollingPos * freq) + 0.2;

  // gl_FragColor = (noise * color1) + ((1.0 - noise) * color2);
  gl_FragColor = vec4(mix(color1, color2, noise), 1.0);
}
