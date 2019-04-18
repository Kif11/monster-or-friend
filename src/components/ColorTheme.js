import AFRAME from 'aframe';

const THREE = AFRAME.THREE;

AFRAME.registerComponent('color-theme', {
  init: function () {
    
    this.el.material.uniforms = {
      ...this.el.material.uniforms,
      color1: {
        value: new THREE.Color(0xffff00)
      },
      color2: {
        value: new THREE.Color(0xff00ff)
      }
    };
  },

  tick: function (time, timeDelta) {

  }
});
