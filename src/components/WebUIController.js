import AFRAME from 'aframe';

AFRAME.registerComponent('web-ui-controller', {
  init: function () {
    const soundBtnEl = document.getElementById('soundBtn');
    let isSoundOn = false;

    const soundImg = 'assets/sound.png';
    const noSoundImg = 'assets/no-sound.png';

    soundBtnEl.addEventListener('click', event => {      
      if (isSoundOn) {
        soundBtnEl.setAttribute('src', noSoundImg);
        this.el.emit('sound-off');
      } else {
        soundBtnEl.setAttribute('src', soundImg);
        this.el.emit('sound-on');
      }
      isSoundOn = !isSoundOn;
    })
  }
});
