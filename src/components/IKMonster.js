import AFRAME from 'aframe';
import TWEEN from 'tween';
import glowShader from '../shaders/GlowShader';
import { IK, IKChain, IKJoint, IKBallConstraint, IKHelper } from 'three-ik';

const THREE = AFRAME.THREE;

AFRAME.registerComponent('ik-monster', {
  init: function () {
    const scene = this.el.sceneEl.object3D;
    const camera = document.querySelector('a-camera');
    this.camera = camera.object3D;

    this.lastTime = Date.now();

    this.length = 400;
    this.bonesPerArm = 8;
    this.armXCount = 5;
    this.armYcount = 5;
    this.distance = 0.52;

    // head sphere
    const geometry = new THREE.SphereGeometry(0.05);
    const material = new THREE.MeshBasicMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);

    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(-i * 0.7) * 4 + 3, (i - 5) * 5).multiplyScalar(0.04));
    }

    const jointGeo = new THREE.LatheBufferGeometry(points, 8);
    jointGeo.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2))

    const noiseTexture = new THREE.TextureLoader().load('/assets/tex_Fern_Lush_Noise.jpg');
    this.jointMat = new THREE.ShaderMaterial({
      uniforms: {
        noise: {
          value: noiseTexture
        },
        time: {
          value: 0
        }
      },
      vertexShader: glowShader.vertexShaderGlow,
      fragmentShader: glowShader.fragmentShaderGlow,
      transparent: true,
      depthWrite: false
    });

    this.target = mesh;
    scene.add(this.target)

    this.iks = [];
    this.pivots = [];
    this.t = 0;
    for (let k = 0; k < this.armYcount; k++) {
      for (let j = 0; j < this.armXCount; j++) {
        const bones = [];
        const ik = new IK();
        const chain = new IKChain();
        const constraint = new IKBallConstraint();

        for (let i = 0; i < this.bonesPerArm; i++) {

          const bone = new THREE.Mesh(jointGeo, this.jointMat);
          bone.position.z = i === 0 ? 0.25 * Math.random() * k : 0;
          bone.position.y = i === 0 ? 0 : this.distance;
          bone.position.x = i === 0 ? 0.1 * Math.random() * (j - this.armXCount / 2) : 0.1 * Math.random();

          // Store the bone and connect it to previous bone
          // if it exists.
          bones[i] = bone;
          if (bones[i - 1]) {
            bones[i - 1].add(bones[i]);
          }

          const constraints = [constraint];
          if (i === this.bonesPerArm - 1) {
            chain.add(new IKJoint(bone, { constraints }), { target: this.target });
          } else {
            chain.add(new IKJoint(bone, { constraints }));
          }
        }

        // Add the chain to the IK system
        ik.add(chain);

        const pivot = new THREE.Object3D();
        pivot.add(ik.getRootBone());
        scene.add(pivot);

        this.pivots.push(pivot)

        this.iks.push(ik);
      }
    }
    this.doneTime = 0;
  },

  tick: function (time, timeDelta) {
    const jointMat = this.jointMat;
    const diff = Date.now() - this.lastTime;

    var camWorldPos = this.camera.getWorldPosition(new THREE.Vector3());

    const tweenPos = camWorldPos.clone();
    const tweenForward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion);
    const tweenRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const tweenUp = new THREE.Vector3(0, 1 ,0).applyQuaternion(this.camera.quaternion);

    if (diff > this.length) {
      this.t ++;
      tweenPos.sub(tweenForward.clone().multiplyScalar(2))
      tweenPos.add(tweenRight.clone().multiplyScalar(3* Math.random()* Math.sin(time * 0.001)))
      tweenPos.add(tweenUp.clone().multiplyScalar(3* Math.random()* Math.sin(time * 0.002)))

      this.length = Math.random() * 300 + 900;
      const tween = new TWEEN.Tween(this.target.position).to(tweenPos, this.length).onUpdate((f) => { }).start()

      if(tweenPos.distanceTo(this.pivots[0].position) > 4*1 && time > this.doneTime){
        this.pivots.forEach((piv, index) => {
          var newPiv = camWorldPos.clone();
          var rF = tweenForward.clone();
          rF.x += 0.8*Math.random()
          rF.y += 0.8*Math.random()
          rF.z += 0.8*Math.random()
          rF.normalize()

          newPiv.sub(rF.multiplyScalar(4*1))
          newPiv.x += 0.2*Math.sin(diff*0.002 + Math.random()*8)
          newPiv.y +=  0.4*Math.sin(diff*0.001+ Math.random()*8)
          newPiv.z += 0.2*Math.sin(diff*0.002 + Math.random()*8)
          var tween = new TWEEN.Tween(piv.position).to(newPiv, 3*this.length).easing(TWEEN.Easing.Back.Out).delay(this.length).start()
        })
        this.doneTime = time + 3*this.length;
      }
      this.lastTime = Date.now()
    }

    jointMat.uniforms.time.value = time;

    for (let ik of this.iks) {
      ik.solve();
    }

    TWEEN.update();
  }
});
