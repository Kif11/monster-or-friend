import AFRAME from 'aframe';
import { fresnelMaterial } from './FresnelMaterial';
import { getHeadsetType } from './Utils.js'

AFRAME.registerComponent('custom-control', {
  schema: {
    hand: { default: '' },
    modelL: { default: 'assets/quest_controller_l/quest_controller_l.gltf' },
    modelR: { default: 'assets/quest_controller_r/quest_controller_r.gltf' }
  },

  update: async function () {
    const headsetType = await getHeadsetType();

    var hand = this.data.hand;
    var controlConfiguration = {
      hand: hand,
      model: headsetType !== 'Oculus Quest',
    };

    // Build on top of controller components.
    this.el.setAttribute('oculus-go-controls', controlConfiguration);
    this.el.setAttribute('vive-controls', controlConfiguration);
    this.el.setAttribute('oculus-touch-controls', controlConfiguration);
    this.el.setAttribute('daydream-controls', controlConfiguration);
    this.el.setAttribute('gearvr-controls', controlConfiguration);
    this.el.setAttribute('windows-motion-controls', controlConfiguration);

    // Add controller when entering VR
    if (headsetType === 'Oculus Quest') {
      this.el.sceneEl.addEventListener('enter-vr', (ent) => {
        this.el.setAttribute('visible', true);

        console.log('ENTER VR');

        // Set a model.
        if (hand === 'left') {
          this.el.setAttribute('gltf-model', this.data.modelL);
        } else {
          this.el.setAttribute('gltf-model', this.data.modelR);
        }

        const activeMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color("#37ffdd"),
        });

        const buttons = {
          'thumbstick': {
            down: 'thumbsticktouchstart',
            up: 'thumbsticktouchend',
          },
          'a_button': {
            down: 'abuttondown',
            up: 'abuttonup',
          },
          'b_button': {
            down: 'bbuttondown',
            up: 'bbuttonup',
          },
          'x_button': {
            down: 'xbuttondown',
            up: 'xbuttonup',
          },
          'y_button': {
            down: 'ybuttondown',
            up: 'ybuttonup',
          },
          'grip_button': {
            down: 'gripdown',
            up: 'gripup',
          },
          'trigger': {
            down: 'triggerdown',
            up: 'triggerup',
          },
        }

        this.el.addEventListener('model-loaded', (event) => {
          const scene = event.detail.model.children[0].children;

          for (let i = 0; i < scene.length; i += 1) {
            const child = scene[i];
            child.material = fresnelMaterial;

            // Register events for changing buttons material when pressed
            if (child.name in buttons) {
              const btn = buttons[child.name]
              this.el.addEventListener(btn.down, () => {
                child.material = activeMaterial;
              })
              this.el.addEventListener(btn.up, () => {
                child.material = fresnelMaterial;
              })
            }
          }
        });
      });

      // Remove controllers
      this.el.sceneEl.addEventListener('exit-vr', (ent) => {
        this.el.setAttribute('visible', false);
        console.log('VISIBLE FALSE');
      });
    }

  }
});