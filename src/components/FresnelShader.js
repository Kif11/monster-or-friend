import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
import fresnelVert from '../shaders/FresnelVert.glsl';
import fresnelFrag from '../shaders/FresnelFrag.glsl';

AFRAME.registerShader('fresnel', {
  schema: {
    color: {type: 'color', is: 'uniform', default: 'white'},
    mRefractionRatio: { is: 'uniform', default: 1.02 },
    mFresnelBias: { is: 'uniform', default: 0.1 },
    mFresnelPower: { is: 'uniform', default: 2.0 },
    mFresnelScale: { is: 'uniform', default: 1.0 }
  },
  raw: false,
  vertexShader: fresnelVert,
  fragmentShader: fresnelFrag
});
