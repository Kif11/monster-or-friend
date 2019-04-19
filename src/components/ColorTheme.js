import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

const CODERCAT_THEME = {
  env_c1: {
    value: new THREE.Color("#27909d")
  },
  env_c2: {
    value: new THREE.Color("#28d3c2")
  },
  particles_c1: {
    value: new THREE.Color("#fc9828")
  },
  monster_c1: {
    value: new THREE.Color("#f8d72d")
  },
  monster_c2: {
    value: new THREE.Color("#e97938")
  },
  monster_c3: {
    value: new THREE.Color("#f9eba7")
  },
  monster_c4: {
    value: new THREE.Color("#ffab4c")
  }
}

const INKBLOOD_THEME = {
  env_c1: {
    value: new THREE.Color("#f67280")
  },
  env_c2: {
    value: new THREE.Color("#961543")
  },
  particles_c1: {
    value: new THREE.Color("#37456d")
  },
  monster_c1: {
    value: new THREE.Color("#6c5b7b")
  },
  monster_c2: {
    value: new THREE.Color("#27304a")
  },
  monster_c3: {
    value: new THREE.Color("#413d52")
  },
  monster_c4: {
    value: new THREE.Color("#1c2335")
  }
}

const ASTRAL_THEME = {
  env_c1: {
    value: new THREE.Color("#05313b")
  },
  env_c2: {
    value: new THREE.Color("#72bcc5")
  },
  particles_c1: {
    value: new THREE.Color("#37ffdd")
  },
  monster_c1: {
    value: new THREE.Color("#3efeff")
  },
  monster_c2: {
    value: new THREE.Color("#f3096b")
  },
  monster_c3: {
    value: new THREE.Color("#78fdfd")
  },
  monster_c4: {
    value: new THREE.Color("#861479")
  }
}

const BW_THEME = {
  env_c1: {
    value: new THREE.Color("#000000")
  },
  env_c2: {
    value: new THREE.Color("#3a3a3a")
  },
  particles_c1: {
    value: new THREE.Color("#f3f3f3")
  },
  monster_c1: {
    value: new THREE.Color("#d8d8d8")
  },
  monster_c2: {
    value: new THREE.Color("#f3f3f3")
  },
  monster_c3: {
    value: new THREE.Color("#d8d8d8")
  },
  monster_c4: {
    value: new THREE.Color("#ffffff")
  }
}

const CAMO_THEME = {
  env_c1: {
    value: new THREE.Color("#00db96")
  },
  env_c2: {
    value: new THREE.Color("#49297e")
  },
  particles_c1: {
    value: new THREE.Color("#fdfb76")
  },
  monster_c1: {
    value: new THREE.Color("#49297e")
  },
  monster_c2: {
    value: new THREE.Color("#00db96")
  },
  monster_c3: {
    value: new THREE.Color("#49297e")
  },
  monster_c4: {
    value: new THREE.Color("#00db96")
  }
}

const MIDNIGHT_THEME = {
  env_c1: {
    value: new THREE.Color("#838eb8")
  },
  env_c2: {
    value: new THREE.Color("#320035")
  },
  particles_c1: {
    value: new THREE.Color("#956ca6")
  },
  monster_c1: {
    value: new THREE.Color("#99abd0")
  },
  monster_c2: {
    value: new THREE.Color("#956ca6")
  },
  monster_c3: {
    value: new THREE.Color("#99abd2")
  },
  monster_c4: {
    value: new THREE.Color("#655a88")
  }
}

const DREAM_THEME = {
  env_c1: {
    value: new THREE.Color("#f9c8f7")
  },
  env_c2: {
    value: new THREE.Color("#f9d6b3")
  },
  particles_c1: {
    value: new THREE.Color("#eef2a6")
  },
  monster_c2: {
    value: new THREE.Color("#a7c7ff")
  },
  monster_c1: {
    value: new THREE.Color("#d2e7f7")
  },
  monster_c4: {
    value: new THREE.Color("#a7c7ff")
  },
  monster_c3: {
    value: new THREE.Color("#d2e7f7")
  }
}

const themes = [ ASTRAL_THEME, CODERCAT_THEME, DREAM_THEME ];

AFRAME.registerComponent('color-theme', {
  init: function () {
    this.el.material.uniforms = {
      ...this.el.material.uniforms,
      ...BW_THEME
    };

    this.curTheme = 0;
    this.cycleThemes();

    this.el.sceneEl.addEventListener('triggerdown', (evt) => {
      this.cycleThemes();
    });

    window.addEventListener('keydown', (evt) => {
      if(evt.key === ' '){
        this.cycleThemes();
      }
    });
  },

  cycleThemes: function () {
    this.el.material.uniforms.env_c1.value = themes[this.curTheme%3].env_c1.value;
    this.el.material.uniforms.env_c2.value = themes[this.curTheme%3].env_c2.value;
    this.el.material.uniforms.particles_c1.value = themes[this.curTheme%3].particles_c1.value;
    this.el.material.uniforms.monster_c1.value = themes[this.curTheme%3].monster_c1.value;
    this.el.material.uniforms.monster_c2.value = themes[this.curTheme%3].monster_c2.value;
    this.el.material.uniforms.monster_c3.value = themes[this.curTheme%3].monster_c3.value;
    this.el.material.uniforms.monster_c4.value = themes[this.curTheme%3].monster_c4.value;
    this.curTheme ++;
  },

  tick: function (time, timeDelta) {
  }
});
