import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('color-theme', {
  init: function () {
    this.el.material.uniforms = {
      ...this.el.material.uniforms,
      env_c1: {
        value: new THREE.Color(0xffff00)
      },
      env_c2: {
        value: new THREE.Color(0xff00ff)
      },
      particles_c1: {
        value: new THREE.Color(0x21ff00)
      },
      monster_c1: {
        value: new THREE.Color(0xff0000)
      },
      monster_c2: {
        value: new THREE.Color(0xff0000)
      },
      monster_c3: {
        value: new THREE.Color(0xff0000)
      },
      monster_c4: {
        value: new THREE.Color(0xff0000)
      },
    };
  },

  tick: function (time, timeDelta) {
  }
});
