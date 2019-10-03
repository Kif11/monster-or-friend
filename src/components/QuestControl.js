import AFRAME from 'aframe';
import { fresnelMaterial } from './FresnelMaterial';

AFRAME.registerComponent('quest-control', {
  schema: {
    hand: { default: '' },
    modelL: { default: 'assets/quest_controller_l/quest_controller_l.gltf' },
    modelR: { default: 'assets/quest_controller_r/quest_controller_r.gltf' }
  },

  update: function () {
    var hand = this.data.hand;
    var controlConfiguration = {
      hand: hand,
      model: false,
      // orientationOffset: { x: 0, y: 0, z: hand === 'left' ? -90 : 90 }
    };

    // Build on top of controller components.
    this.el.setAttribute('vive-controls', controlConfiguration);
    this.el.setAttribute('oculus-touch-controls', controlConfiguration);
    this.el.setAttribute('daydream-controls', controlConfiguration);
    this.el.setAttribute('gearvr-controls', controlConfiguration);
    this.el.setAttribute('windows-motion-controls', controlConfiguration);

    // Add controller when entering VR
    this.el.sceneEl.addEventListener('enter-vr', (ent) => {
      // Set a model.
      if (hand === 'left') {
        this.el.setAttribute('gltf-model', this.data.modelL);
      } else {
        this.el.setAttribute('gltf-model', this.data.modelR);
      }

      this.el.addEventListener('model-loaded', (event) => {
        const scene = event.detail.model.children[0].children;

        for (let i = 0; i < scene.length; i += 1) {
          const child = scene[i];
          child.material = fresnelMaterial;
        }
      })
    });

    // Remove controllers
    this.el.sceneEl.addEventListener('exit-vr', (ent) => {
      this.el.removeAttribute('gltf-model');
    });

  }
});