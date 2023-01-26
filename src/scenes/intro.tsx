import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import Box from '../components/Box';

const IntroScene = () => {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { clock } = state;
    boxRef.current.rotation.y = (clock.getElapsedTime() * 2 * Math.PI) / 10;
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 100]} />
      <Box position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} ref={boxRef} />
    </>
  );
};

export default IntroScene;
