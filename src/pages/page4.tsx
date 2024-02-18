import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DogModel = () => {
  const model = useGLTF('/models/dog/doggo2.glb');
  const mixerRef = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    mixerRef.current = new THREE.AnimationMixer(model.scene);
    model.animations.forEach(clip => {
      const action = mixerRef.current!.clipAction(clip);
      action.play();
    });
  }, [model]);

  useFrame((_state, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <mesh>
      <primitive object={model.scene} />
    </mesh>
  );
};

const Page4 = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <OrbitControls />
      <axesHelper />
      <gridHelper />
      <ambientLight intensity={5} />
      <DogModel />
    </Canvas>
  );
};

export default Page4;
