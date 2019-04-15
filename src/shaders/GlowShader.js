const rotationY= `mat3 rotation3dZ(float angle) {
	float s = sin(angle);
	float c = cos(angle);

	return mat3(
		c, s, 0.0,
		-s, c, 0.0,
		0.0, 0.0, 1.0
	);
}`;
const GlowShader = {
	vertexShaderGlow: `
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
	}`
	,
	fragmentShaderGlow: `
	varying vec3 vNormal;
	varying vec3 vViewPosition;
	varying float vColor;
	uniform float time;
	varying vec2 vUv;

	uniform sampler2D noise;

	void main() {
		vec4 noiseCol = texture2D(noise, vUv);
		gl_FragColor = vec4( (1.0 - vUv.y)*2.0, 0.9 + 0.05*sin(0.015*time), sin(0.0006*time), noiseCol.x*(1.0 - vUv.y)*1.0 ) ;
	}`,

};

export default GlowShader;
