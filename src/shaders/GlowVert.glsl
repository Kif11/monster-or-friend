varying vec3 vNormal;
varying float vColor;
varying vec3 vViewPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize( normalMatrix * normal );
  vec3 newPos = position + 0.01*normal;
  vec4 modelViewPosition = modelViewMatrix * vec4( newPos, 1.0 );
  vViewPosition = - normalize(modelViewPosition.xyz);
  gl_Position = projectionMatrix * modelViewPosition;
}
