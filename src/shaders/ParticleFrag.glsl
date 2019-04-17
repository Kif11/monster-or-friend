#extension GL_OES_standard_derivatives : enable

precision highp float;
varying vec3 vNormal;
varying vec3 vViewPos;
uniform float time;
varying float vCount;

void main() {
  // vec3 fdx = vec3( dFdx( vViewPos.x ), dFdx( vViewPos.y ), dFdx( vViewPos.z ) );
  // vec3 fdy = vec3( dFdy( vViewPos.x ), dFdy( vViewPos.y ), dFdy( vViewPos.z ) );
  // vec3 normal = normalize( cross( fdx, fdy ) );

  vec3 col = vec3( 1.0, 0.4, 1.0) + sin(vCount + time/10000.0) * vec3(0.1, 0.3, 0.1);
  gl_FragColor = vec4( col, 1.0 );
}