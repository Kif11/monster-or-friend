precision highp float;
varying vec3 vViewPos;
uniform float time;
varying float vCount;
uniform vec3 particles_c1;

void main() {
  float z = mod(time + vCount, 3000.0);
  float t = 0.0;

  if(z > 300.0 && z < 800.0){
    t = sin(3.0*(z - 300.0)/500.0);
  }

  if(vViewPos.z > 40.0){
    discard;
  }

  vec3 col = particles_c1 + t * vec3(0.05, 0.15, 0.05);
  gl_FragColor = vec4( col, 1.0 );
}
