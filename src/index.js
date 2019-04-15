// @ts-nocheck

import Dom from './Dom';
import IKMonster from './components/IKMonster';

IKMonster();

const App = () => (
  <a-scene background="color: black">
    <a-camera
      position="0 0 2"
    ></a-camera>
    <a-entity
      ik-monster
    ></a-entity>
  </a-scene>
);

document.querySelector('body').appendChild(App());
