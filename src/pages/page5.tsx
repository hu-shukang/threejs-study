import { Canvas } from '@react-three/fiber';
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

function Box() {
  const [ref] = useSphere<THREE.Mesh>(() => ({ mass: 1, position: [0, 5, 0] }));
  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function Ground() {
  const [ref] = useBox<THREE.Mesh>(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], args: [10, 10, 0.01] }));
  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[10, 10, 0.01]} />
      <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} />
    </mesh>
  );
}

const Page5 = () => {
  return (
    <Canvas style={{ height: '100vh' }} camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <OrbitControls />
      <axesHelper args={[10]} />
      <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ restitution: 0.7 }}>
        <Box />
        <Ground />
      </Physics>
    </Canvas>
  );
};

export default Page5;
