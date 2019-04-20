precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float imgCount;
attribute vec3 position;
attribute vec3 offset;
attribute vec3 normal;
varying vec3 vViewPos;
varying float vCount;
attribute float count;

void main() {
  vCount = count;
  vec4 modelViewPos = modelViewMatrix * vec4( offset + position, 1.0 );
  vViewPos = -modelViewPos.xyz;

  gl_Position = projectionMatrix * modelViewPos;
}