import AFRAME from 'aframe';
import particleShader from '../shaders/ParticleShader';
const THREE = AFRAME.THREE;

const DIM = 10;
const PARTICLE_COUNT = DIM*DIM*DIM;
AFRAME.registerComponent('particles', {
  init: function () {
    const entity = this.el.object3D;
    const camera = document.querySelector('a-camera');
    this.camera = camera.object3D;

    var particleGeo = new THREE.BufferGeometry();
    particleGeo.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( PARTICLE_COUNT * 3 ), 3 ).setDynamic( true ) );

    var positionAttribute = particleGeo.getAttribute( 'position' );

    //fill starting point attributes
    for (var i = 0; i < DIM; i++){
      for (var j = 0; j < DIM; j++){
        for (var k = 0; k < DIM; k++){
          var idx = DIM*DIM*i + DIM*j + k;
          positionAttribute.array[3*idx] = 1.4*(i-5) + Math.random();
          positionAttribute.array[3*idx+1] = 1.4*(j-5) + Math.random();
          positionAttribute.array[3*idx+2] = 1.4*(k-5) + Math.random();
        }
      }
    }

    const spriteTex = new THREE.TextureLoader().load('/assets/particle_sprite.png');
    var particleMat = new THREE.ShaderMaterial({
      uniforms: {
        size: {
          value: 2.2
        },
        scale: {
          value: 150
        },
        diffuse: {
          value: new THREE.Color("#000fff")
        },
        particleSpriteTex: {
          value: spriteTex
        }
      },
      vertexShader: particleShader.vertexShader,
      fragmentShader: particleShader.fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points( particleGeo, particleMat );
    entity.add(this.particleSystem)
  },
  tick: function (time, timeDelta) {
    //TODO: pulse
  }
});
