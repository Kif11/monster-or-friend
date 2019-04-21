import AFRAME from 'aframe';

AFRAME.registerComponent('sound-controller', {
  init: function () {
    this.el.sceneEl.addEventListener('enter-vr', (evt) => {
      this.el.components.sound.playSound();
    });
    this.el.sceneEl.addEventListener('exit-vr', (evt) => {
      this.el.components.sound.stopSound();
    });
    this.el.sceneEl.addEventListener('sound-on', (evt) => {
      this.el.components.sound.playSound();
    });
    this.el.sceneEl.addEventListener('sound-off', (evt) => {
      this.el.components.sound.stopSound();
    });
  }
});
