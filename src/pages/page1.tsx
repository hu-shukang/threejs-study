import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const Box = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshLambertMaterial color={'red'} />
    </mesh>
  );
};

const Sphere = () => {
  const colorMap = useLoader(THREE.TextureLoader, '/images/stars.jpg');

  return (
    <mesh castShadow position={[0, 2, 0]}>
      <sphereGeometry args={[2]} />
      <meshLambertMaterial map={colorMap} />
    </mesh>
  );
};

const Plane = () => {
  return (
    <mesh rotation-x={-Math.PI * 0.5} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshLambertMaterial color={0xffffff} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Background = ({ url }: { url: string }) => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(url, texture => {
      scene.background = texture;
    });
  }, [url, scene]);

  return null;
};

const Page1 = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}
      shadows
      camera={{ position: [10, 5, 10] }}
    >
      <ambientLight intensity={0.5} />
      <spotLight ref={spotLightRef} color={0xffffff} position={[-5, 5, 5]} angle={5} intensity={100} castShadow />
      {spotLightRef.current && <spotLightHelper args={[spotLightRef.current]} />}
      <directionalLight color="#ffffff" position={[0, 0, 5]} />
      <OrbitControls />
      <axesHelper args={[3]} />
      <gridHelper />
      <Sphere />
      <Plane />
    </Canvas>
  );
};

export default Page1;
