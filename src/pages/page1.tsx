import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Page1 = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <ambientLight />
      <directionalLight color="#ffffff" position={[0, 0, 5]} />
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshLambertMaterial color={'red'} />
      </mesh>
    </Canvas>
  );
};

export default Page1;
