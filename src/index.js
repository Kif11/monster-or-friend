// @ts-nocheck
import AFRAME from 'aframe';
import Dom from './Dom';
import './components/IKMonster';
import './components/Mover';

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

  </a-scene>
);

document.querySelector('body').appendChild(App());
