// @ts-nocheck
import AFRAME from 'aframe';
import Dom from './Dom';
import './components/IKMonster';
import './components/Mover';
import './components/Environment';
import './components/Particles';
import './components/ColorTheme';
import './components/Tutorial';

const App = () => (
  <a-scene background="color: black">

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

    <a-entity sound="
      src: url(assets/astral.mp3);
      volume:1;
      loop: true; 
      positional: false;
    " />

  </a-scene>
);

document.querySelector('body').appendChild(App());
