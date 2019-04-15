import AFRAME from 'aframe';
import TWEEN from 'tween';
import glowShader from '../shaders/GlowShader';
import { IK, IKChain, IKJoint, IKBallConstraint, IKHelper } from 'three-ik';

const THREE = AFRAME.THREE;


const IKMonster = () => {
  AFRAME.registerComponent('ik-monster', {
    init: function () {
      const scene = this.el.sceneEl.object3D;
      const camera = document.querySelector('a-camera');
      this.camera = camera.object3D;

      this.lastTime = Date.now();

      this.length = 400;
      this.count = 8;
      this.armcount = 5;
      this.setcount = 5;
      this.distance = 0.13;

      // head sphere
      const geometry = new THREE.SphereGeometry(0.05);
      const material = new THREE.MeshBasicMaterial({ wireframe: true });
      const mesh = new THREE.Mesh(geometry, material);

      // create some ik chains
      var roomGeo = new THREE.BoxGeometry(10, 10, 10);
      var roomMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ff8bff'),
        side: THREE.DoubleSide
      });

      var room = new THREE.Mesh(roomGeo, roomMat);
      room.frustumCulled = false;
      scene.add(room)

      const points = [];
      for (let i = 0; i < 10; ++i) {
        points.push(new THREE.Vector2(Math.sin(-i * 0.7) * 4 + 3, (i - 5) * 5).multiplyScalar(0.01));
      }

      const jointGeo = new THREE.LatheBufferGeometry(points);
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
      this.target.position.set(0, 0.6, 0)
      scene.add(this.target)

      this.iks = [];
      this.pivots = [];

      for (let k = 0; k < this.setcount; k++) {
        for (let j = 0; j < this.armcount; j++) {
          const bones = [];
          const ik = new IK();
          const chain = new IKChain();
          const constraint = new IKBallConstraint();

          for (let i = 0; i < this.count; i++) {

            const bone = new THREE.Mesh(jointGeo, this.jointMat);
            bone.position.z = i === 0 ? 0.25 * Math.random() * k : 0;
            bone.position.y = i === 0 ? 0 : this.distance;
            bone.position.x = i === 0 ? 0.1 * Math.random() * (j - this.armcount / 2) : 0.1 * Math.random();

            // Store the bone and connect it to previous bone
            // if it exists.
            bones[i] = bone;
            if (bones[i - 1]) {
              bones[i - 1].add(bones[i]);
            }

            const constraints = [constraint];
            if (i === this.count - 1) {
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

    },

    tick: function (time, timeDelta) {
      const jointMat = this.jointMat;
      const diff = Date.now() - this.lastTime;

      const tweenPos = this.camera.position.clone();
      const tweenForward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion);

      if (diff > this.length) {
        tweenPos.sub(tweenForward)
        tweenPos.x += 0.4 * Math.sin(time * 0.001)
        tweenPos.y += 0.4 * Math.sin(time * 0.002)

        this.length = Math.random() * 100 + 400;
        const tween = new TWEEN.Tween(this.target.position).to(tweenPos, this.length).onUpdate((f) => { }).start()

        this.lastTime = Date.now()
      } else {
        this.pivots.forEach((piv, index) => {
          piv.position.x = this.target.position.x - tweenForward.x * 1.5;
          piv.position.y = this.target.position.y - tweenForward.y * 1.5;
          piv.position.z = this.target.position.z - tweenForward.z * 1.5;

          piv.position.x += 0.001 * Math.sin(time * 0.002 + index)
          piv.position.y += 0.01 * Math.sin(time * 0.001 + index)
          piv.position.z += (0.05 * Math.sin(time * 0.002 + index))
        })
      }

      jointMat.uniforms.time.value = time;

      for (let ik of this.iks) {
        ik.solve();
      }

      TWEEN.update();
    }
  });
}

export default IKMonster;
