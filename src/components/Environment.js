import AFRAME from 'aframe';
import EnvFrag from '../shaders/EnvironmentFrag.glsl';
import EnvVert from '../shaders/EnvironmentVert.glsl';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('environment', {
  init: function () {
    const sphereGeometry = new THREE.SphereGeometry(8000, 32, 32);

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true, 
      side: THREE.DoubleSide 
    });

    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff8bff'),
      side: THREE.DoubleSide
    });

    this.el.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        env_c1: {
          value: new THREE.Color(0xff0000)
        },
        env_c2: {
          value: new THREE.Color(0x0008ff)
        }
      },
      vertexShader: EnvVert,
      fragmentShader: EnvFrag,
      side: THREE.DoubleSide 
    });

    const sphere = new THREE.Mesh(sphereGeometry, this.el.material);
    sphere.frustumCulled = false;

    this.el.object3D.add(sphere)
  },

  tick: function (time, timeDelta) {
    this.el.material.uniforms.time.value = time;
  }
});
