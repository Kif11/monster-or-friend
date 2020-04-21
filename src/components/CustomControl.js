import AFRAME from 'aframe';
import { fresnelMaterial } from './FresnelMaterial';
import { getHeadsetType } from './Utils.js'

AFRAME.registerComponent('custom-control', {
  schema: {
    hand: { default: '' },
    modelL: { default: 'assets/quest_controller_l/quest_controller_l.gltf' },
    modelR: { default: 'assets/quest_controller_r/quest_controller_r.gltf' }
  },

  init: function () {
    this.el.sceneEl.addEventListener('enter-vr', (ent) => {
      this.el.setAttribute('visible', true);
      
      var hand = this.data.hand;

      // Set a model.
        // if (hand === 'left') {
        //   this.el.setAttribute('gltf-model', this.data.modelL);
        // } else {
        //   this.el.setAttribute('gltf-model', this.data.modelR);
        // }
      fresnelMaterial.color = new THREE.Color();
      this.el.addEventListener('model-loaded', (event) => {
        const scene = event.detail.model.children;
        for (let i = 2; i < scene.length; i += 1) {
          const child = scene[i];
          child.material = fresnelMaterial;
        }
      });
    });

    // Remove controllers
    this.el.sceneEl.addEventListener('exit-vr', (ent) => {
      this.el.setAttribute('visible', false);
    });
  }
});