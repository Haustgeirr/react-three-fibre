import { PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

import Box from 'src/components/Box';
import { Button } from 'src/components/Button';

type SceneProps = {
  boxQuantity: number;
};

const SceneCanvas = () => {
  // const [showBox, setShowBox] = useState<boolean>(false);
  const [boxQuantity, setBoxQuantity] = useState<number>(1);

  return (
    <>
      <Button
        onClick={() => {
          console.log('ya pressao');
          setBoxQuantity(boxQuantity + 1);
        }}
      >
        <p>Clack moy</p>
      </Button>
      <Canvas>
        <Scene boxQuantity={boxQuantity} />
      </Canvas>
    </>
  );
};

const Scene = ({ boxQuantity }: SceneProps) => {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { clock } = state;
    if (boxRef.current) {
      boxRef.current.rotation.y = (clock.getElapsedTime() * 2 * Math.PI) / 10;
    }
  });

  const renderBox = (xPos: number) => (
    <Box position={[xPos, 0, 0]} rotation={[0, -Math.PI / 2, 0]} ref={boxRef} />
  );

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 100]} />
      {Array.from({ length: boxQuantity }, (_, i) => renderBox(i * 10))}
    </>
  );
};

export default SceneCanvas;
