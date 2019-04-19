import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
import FresnelFrag from '../shaders/FresnelFrag.glsl'
import FresnelVert from '../shaders/FresnelVert.glsl'

AFRAME.registerComponent('tutorial', {
  init: function () {
    const group = this.el.object3D;

    const controllerEl = this.el.children.namedItem('tutorialController');
    const annotationsEl = this.el.children.namedItem('annotations');

    const controller = controllerEl.object3D;
    const annotations = annotationsEl.object3D;

    group.rotation.y = -Math.PI / 2;
    group.position.set(0.05, 1.6, -0.6);

    controller.rotation.z = THREE.Math.degToRad(-30);
    controller.rotation.y = THREE.Math.degToRad(-10);

    // const bodyMat = new THREE.MeshBasicMaterial();

    const bodyMat = new THREE.ShaderMaterial({
      uniforms: {
        mRefractionRatio: { value: 1.02 },
        mFresnelBias: { value: 0.1 },
        mFresnelPower: { value: 2.0 },
        mFresnelScale: { value: 1.0 }
      },
      vertexShader: FresnelVert,
      fragmentShader: FresnelFrag,
    });


    const buttonMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#37ffdd"),
    });

    const textMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d8ecee"),
    });

    controllerEl.addEventListener('model-loaded', (event) => {
      const scene = event.detail.model;
      const { children } = scene;

      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];

        if (
          child.name === 'oculus_go_touchpad'||
          child.name === 'oculus_go_button_trigger'
        ) {
          child.material = buttonMat;
        } else {
          child.material = bodyMat;
        }

      }
    })

    annotationsEl.addEventListener('model-loaded', (event) => {
      const scene = event.detail.model.children[0];
      const { children } = scene;

      for (let i = 0; i < children.length; i += 1 ) {
        const child = children[i];

        child.material = textMat;
      }
    })

    this.el.sceneEl.addEventListener('enter-vr', (evt) => {
      this.el.setAttribute("visible",true);
    });

    this.el.sceneEl.addEventListener('triggerdown', (evt) => {
      this.el.setAttribute("visible",false);
    });
    
    this.el.sceneEl.addEventListener('trackpaddown', (evt) => {
      this.el.setAttribute("visible",false);
    });
  },

  tick: function (time, timeDelta) {

  }
});
