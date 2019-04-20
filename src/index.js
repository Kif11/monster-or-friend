// @ts-nocheck
import AFRAME from 'aframe';
import Dom from './Dom';
import './style.css';
import './components/IKMonster';
import './components/Mover';
import './components/Environment';
import './components/Particles';
import './components/ColorTheme';
import './components/Tutorial';
import './components/SoundController';
import './components/WebUIController';

const App = () => (
  <a-scene background="color: black">

    <a-entity web-ui-controller />
    <div id="buttonsContainer">
      <img class="btnImage" src="assets/info.png" alt="info" />
      <img class="btnImage" id="soundBtn" src="assets/no-sound.png" alt="sound" />
    </div>

    <a-entity id="rig" position="0 0 0">
      <a-camera position="0 0 0" />
      <a-entity
        oculus-go-controls
        mover
      />
    </a-entity>

    <a-assets>
      <a-asset-item id="controller" src="https://cdn.aframe.io/controllers/oculus/go/oculus-go-controller.gltf" />
      <a-asset-item id="annotations" src="assets/annotations/annotations.gltf" />
    </a-assets>

    <a-entity tutorial visible="false">
      <a-gltf-model name="annotations" src="#annotations" />
      <a-gltf-model name="tutorialController" src="#controller" />
    </a-entity>

    <a-entity ik-monster color-theme />
    <a-entity particles color-theme />
    <a-entity environment color-theme />

    <a-entity
      sound-controller
      sound="
        src: url(assets/astral.mp3);
        volume:1;
        loop: true;
        positional: false;
      "
    />
    
  </a-scene>
);

document.querySelector('body').appendChild(App());
