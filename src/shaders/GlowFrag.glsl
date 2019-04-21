uniform float time;
varying vec2 vUv;

uniform sampler2D noise;
uniform vec3 monster_c1;
uniform vec3 monster_c2;
uniform vec3 monster_c3;
uniform vec3 monster_c4;

void main() {
  float periodicMix = abs(sin(0.015 * time/40.0));
  vec3 c1 = mix(monster_c1, monster_c3, periodicMix);
  vec3 c2 = mix(monster_c2, monster_c4, periodicMix);

  vec3 uvColor = mix(c1, c2, vUv.y);

  vec4 noiseCol = texture2D(noise, vUv);

  gl_FragColor = vec4(uvColor, noiseCol.x * (1.0 - vUv.y) * 2.0);
}
