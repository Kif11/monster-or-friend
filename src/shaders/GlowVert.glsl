varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 newPos = position + 0.01*normal;
  vec4 modelViewPosition = modelViewMatrix * vec4( newPos, 1.0 );
  gl_Position = projectionMatrix * modelViewPosition;
}
