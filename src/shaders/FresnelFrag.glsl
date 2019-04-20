varying float vReflectionFactor;

void main() {
  vec4 refractedColor = vec4( 0.019, 0.192, 0.231, 1.0 );
  vec4 reflectedColor = vec4( 0.847, 0.925, 0.933, 1.0 );

  gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
}
