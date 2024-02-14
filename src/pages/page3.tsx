import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Page3 = () => {
  const starFilePath = '/images/stars.jpg';
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} shadows camera={{ position: [-90, 140, 140] }}>
      <OrbitControls />
      <ambientLight color={0x333333} />
      <Environment background={true} files={Array(6).fill(starFilePath)} />
    </Canvas>
  );
};

export default Page3;
