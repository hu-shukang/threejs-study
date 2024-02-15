import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

type RingProps = {
  innerRadius: number;
  outerRadius: number;
  image: string;
  position: number;
};

type PlaneteProps = {
  size: number;
  image: string;
  position: number;
  ring?: RingProps;
  selfRotationY: number;
  aroundRotationY: number;
};

const SunMesh = () => {
  const selfRotationY = 0.004;
  const [sry, setSRY] = useState(selfRotationY);
  const texture = useLoader(THREE.TextureLoader, '/images/sun.jpg');
  useFrame(() => {
    setSRY(prev => prev + selfRotationY);
  });
  return (
    <mesh rotation={[0, sry, 0]}>
      <sphereGeometry args={[16, 30, 30]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const RingMesh = ({ innerRadius, outerRadius, image, position }: RingProps) => {
  const texture = useLoader(THREE.TextureLoader, image);
  return (
    <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[position, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 32]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const PlaneteMesh = ({ size, image, position, ring, selfRotationY, aroundRotationY }: PlaneteProps) => {
  const texture = useLoader(THREE.TextureLoader, image);
  const [sry, setSRY] = useState(selfRotationY);
  const [ary, setARY] = useState(aroundRotationY);

  useFrame(() => {
    setSRY(prev => prev + selfRotationY);
    setARY(prev => prev + aroundRotationY);
  });

  return (
    <object3D rotation={[0, ary, 0]}>
      <mesh position={[position, 0, 0]} rotation={[0, sry, 0]}>
        <sphereGeometry args={[size, 30, 30]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {ring && <RingMesh {...ring} />}
    </object3D>
  );
};

const Page3 = () => {
  const starFilePath = '/images/stars.jpg';
  const [mercury, setMercury] = useState<PlaneteProps>({
    size: 3.2,
    image: '/images/mercury.jpg',
    position: 28,
    selfRotationY: 0.004,
    aroundRotationY: 0.024,
  });
  const [venus, setVenus] = useState<PlaneteProps>({
    size: 5.8,
    image: '/images/venus.jpg',
    position: 44,
    selfRotationY: 0.002,
    aroundRotationY: 0.015,
  });
  const [earth, setEarth] = useState<PlaneteProps>({
    size: 6,
    image: '/images/earth.jpg',
    position: 62,
    selfRotationY: 0.02,
    aroundRotationY: 0.01,
  });
  const [mars, setMars] = useState<PlaneteProps>({
    size: 4,
    image: '/images/mars.jpg',
    position: 78,
    selfRotationY: 0.018,
    aroundRotationY: 0.008,
  });
  const [jupiter, setJupiter] = useState<PlaneteProps>({
    size: 12,
    image: '/images/jupiter.jpg',
    position: 100,
    selfRotationY: 0.04,
    aroundRotationY: 0.002,
  });
  const [saturn, setSaturn] = useState<PlaneteProps>({
    size: 10,
    image: '/images/saturn.jpg',
    position: 138,
    selfRotationY: 0.038,
    aroundRotationY: 0.0009,
    ring: {
      innerRadius: 10,
      outerRadius: 20,
      image: '/images/saturn ring.png',
      position: 138,
    },
  });
  const [uranus, setUranus] = useState<PlaneteProps>({
    size: 7,
    image: '/images/saturn.jpg',
    position: 176,
    selfRotationY: 0.03,
    aroundRotationY: 0.0004,
    ring: {
      innerRadius: 7,
      outerRadius: 12,
      image: '/images/uranus ring.png',
      position: 176,
    },
  });
  const [neptune, setNeptune] = useState<PlaneteProps>({
    size: 7,
    image: '/images/neptune.jpg',
    position: 200,
    selfRotationY: 0.032,
    aroundRotationY: 0.0001,
  });
  const [pluto, setPluto] = useState<PlaneteProps>({
    size: 2.8,
    image: '/images/pluto.jpg',
    position: 216,
    selfRotationY: 0.008,
    aroundRotationY: 0.00007,
  });
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} shadows camera={{ position: [-90, 140, 140] }}>
      <OrbitControls />
      <Environment background={true} files={Array(6).fill(starFilePath)} />
      <ambientLight color={0x333333} intensity={5} />
      <pointLight color={0xffffff} intensity={10000} />
      <SunMesh />
      <PlaneteMesh {...mercury} />
      <PlaneteMesh {...venus} />
      <PlaneteMesh {...earth} />
      <PlaneteMesh {...mars} />
      <PlaneteMesh {...jupiter} />
      <PlaneteMesh {...saturn} />
      <PlaneteMesh {...uranus} />
      <PlaneteMesh {...neptune} />
      <PlaneteMesh {...pluto} />
    </Canvas>
  );
};

export default Page3;
