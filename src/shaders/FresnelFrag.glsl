varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {

  // vec4 reflectedColor = vec4( -vReflect.x, vReflect.yz, 1.0 );
  // vec4 refractedColor = vec4( -vRefract[0].x, vRefract[0].yz, 1.0 );

  vec4 refractedColor = vec4(1.0, 0.1, 1.0, 1.0 );
  vec4 reflectedColor = vec4( 1.0, 1.1, 0.1, 1.0 );

  // refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  // refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  // refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;

  gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );

}