
import FresnelFrag from '../shaders/FresnelFrag.glsl'
import FresnelVert from '../shaders/FresnelVert.glsl'

export const fresnelMaterial = new THREE.ShaderMaterial({
  uniforms: {
    mRefractionRatio: { value: 1.02 },
    mFresnelBias: { value: 0.1 },
    mFresnelPower: { value: 2.0 },
    mFresnelScale: { value: 1.0 }
  },
  vertexShader: FresnelVert,
  fragmentShader: FresnelFrag,
});
