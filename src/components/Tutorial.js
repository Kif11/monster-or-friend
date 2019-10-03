import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
import { fresnelMaterial } from './FresnelMaterial';

async function getHeadsetType() {
  const displays = await navigator.getVRDisplays();
  for (let i = 0; i < displays.length; i += 1) {
    const d = displays[i];
    if (d.displayName === "Oculus Quest") {
      return "Oculus Quest";
    } else if (d.displayName === "Oculus Go") {
      return "Oculus Go";
    }
  }
  return null
}

AFRAME.registerComponent('tutorial', {
  init: async function () {
    const group = this.el.object3D;

    const controllerEl = this.el.children.namedItem('tutorialController');
    const annotationsEl = this.el.children.namedItem('annotations');

    const headsetType = await getHeadsetType();

    const controller = controllerEl.object3D;
    const annotations = annotationsEl.object3D;

    const buttonMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#37ffdd"),
    });

    const textMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d8ecee"),
    });

    controllerEl.addEventListener('model-loaded', (event) => {
      const scene = event.detail.model;
      const { children: root } = scene;
      const { children } = root[0]

      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];

        // Assign highlighted material to buttons
        if (
          child.name === 'oculus_go_touchpad' ||
          child.name === 'oculus_go_button_trigger' ||
          child.name === 'thumstick' ||
          child.name === 'trigger' ||
          child.name === 'b_button'
        ) {
          child.material = buttonMat;
        } else {
          child.material = fresnelMaterial;
        }
      }
    })

    // Remove tutorial element if headset doesn't match detected one
    if (headsetType === "Oculus Quest" && this.el.id !== "questTutorial") {
      this.el.parentNode.removeChild(this.el);
    } else if (headsetType === "Oculus Go" && this.el.id !== "goTutorial") {
      this.el.parentNode.removeChild(this.el);
    } else if (headsetType === null) {
      this.el.parentNode.removeChild(this.el);
    }

    annotationsEl.addEventListener('model-loaded', (event) => {
      const scene = event.detail.model.children[0];
      const { children } = scene;

      for (let i = 0; i < children.length; i += 1 ) {
        const child = children[i];

        child.material = textMat;
      }
    })

    this.el.sceneEl.addEventListener('enter-vr', (evt) => {
      this.el.setAttribute("visible", true);

      // Hacky way to get headset position and move controller tutorial in front of it
      // Ah A-Frame...
      setTimeout(() => {
        const rig = document.querySelector('#camera');
        const position = new THREE.Vector3();
        const headPos = rig.object3D.getWorldPosition(position);

        group.rotation.y = -Math.PI / 2;
        group.position.set(headPos.x, headPos.y, -0.6);

        controller.rotation.z = THREE.Math.degToRad(-30);
        controller.rotation.y = THREE.Math.degToRad(-10);
      }, 500)

      const tutorialDuration = 8000; //ms
      setTimeout(() => {
        this.el.setAttribute("visible", false);
      }, tutorialDuration)
    });
  },

  tick: function (time, timeDelta) {

  }
});
