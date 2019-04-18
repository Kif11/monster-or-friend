const ParticleShader = {
	vertexShader: `
    precision highp float;
    uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
    uniform float imgCount;
		attribute vec3 position;
    attribute vec3 offset;
    attribute vec3 normal;
    varying vec3 vNormal;
    varying vec3 vViewPos;
    varying float vCount;
    attribute float count;

    void main() {
      vCount = count;
      vec4 modelViewPos = modelViewMatrix * vec4( offset + position, 1.0 );
      vViewPos = -modelViewPos.xyz;
      vNormal = normal;

    	gl_Position = projectionMatrix * modelViewPos;
    }
  `,
  fragmentShader: `
		// #extension GL_OES_standard_derivatives : enable

    precision highp float;
    varying vec3 vNormal;
    varying vec3 vViewPos;
    uniform float time;
    varying float vCount;

    void main() {
			// vec3 fdx = vec3( dFdx( vViewPos.x ), dFdx( vViewPos.y ), dFdx( vViewPos.z ) );
			// vec3 fdy = vec3( dFdy( vViewPos.x ), dFdy( vViewPos.y ), dFdy( vViewPos.z ) );
			// vec3 normal = normalize( cross( fdx, fdy ) );

			float z = mod(time + vCount, 3000.0);
			float t = 0.0;

			if(z > 300.0 && z < 800.0){
				t = sin(3.0*(z - 300.0)/500.0);
			}

      vec3 col = vec3( 1.0, 0.4, 1.0) + t * vec3(0.05, 0.15, 0.05);
    	gl_FragColor = vec4( col, 1.0 );
    }
  `
}
export default ParticleShader;
