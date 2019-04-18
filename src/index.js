// @ts-nocheck
import AFRAME from 'aframe';
import Dom from './Dom';
import './components/IKMonster';
import './components/Mover';
import './components/Environment';
import './components/Particles';
import './components/ColorTheme';

const App = () => (
  <a-scene background="color: black">

    <a-entity id="rig" position="0 0 0">
      <a-camera position="0 0 0" />
      <a-entity
        oculus-go-controls
        mover
      />
    </a-entity>

    <a-entity ik-monster />
    <a-entity environment color-theme />
    <a-entity particles />
    
  </a-scene>
);

document.querySelector('body').appendChild(App());
