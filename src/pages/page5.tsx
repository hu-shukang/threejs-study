import { Canvas, useThree } from '@react-three/fiber';
import { Physics, Triplet, useBox, useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useCallback, useEffect, useState } from 'react';

type BoxProps = {
  position: Triplet;
};

function Box({ position }: BoxProps) {
  const [ref] = useSphere<THREE.Mesh>(() => ({ mass: 1, position: position, args: [0.2] }));
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 32, 32]} />
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

const Scene = () => {
  const { camera, gl, scene } = useThree();
  const [balls, setBalls] = useState<Triplet[]>([]);

  useEffect(() => {
    const onClick = (event: any) => {
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const [intersection] = raycaster.intersectObjects(scene.children, true);

      let position: Triplet = [0, 5, 0]; // Default position in case no intersection
      if (intersection) {
        position = [intersection.point.x, intersection.point.y + 0.5, intersection.point.z];
      }

      setBalls(prev => [...prev, position]);
    };

    gl.domElement.addEventListener('click', onClick);
    return () => gl.domElement.removeEventListener('click', onClick);
  }, [camera, gl]);

  return (
    <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ restitution: 0.7 }}>
      {balls.map((position, index) => (
        <Box key={index} position={position} />
      ))}
      <Ground />
    </Physics>
  );
};

const Page5 = () => {
  return (
    <Canvas id="canvas" style={{ height: '100vh' }} camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <OrbitControls />
      <axesHelper args={[10]} />
      <Scene />
    </Canvas>
  );
};

export default Page5;
