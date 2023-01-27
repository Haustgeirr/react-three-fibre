import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import type { Vector3, Euler } from '@react-three/fiber';
import { Canvas, useFrame } from '@react-three/fiber';

import Box from 'src/components/Box';
import { Button } from 'src/components/Button';
import { generateUUID } from 'three/src/math/MathUtils';

type SceneObject = {
  name: string;
  type: string;
  uuid: string;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
};

type SceneJson = {
  objects: SceneObject[];
};

const sceneJson: SceneJson = {
  objects: [
    {
      name: 'Logo',
      type: 'Box',
      uuid: generateUUID(),
      position: [0, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
      scale: [1, 1, 1],
    },
    {
      name: 'Logo2',
      type: 'Box',
      uuid: generateUUID(),
      position: [10, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
      scale: [1, 1, 1],
    },
  ],
};

const SceneCanvas = () => {
  return (
    <>
      <Button
        onClick={() => {
          console.log('ya pressao');
        }}
      >
        <p>Clack moy</p>
      </Button>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
};

const Scene = () => {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { clock } = state;

    if (boxRef.current) {
      boxRef.current.rotation.y = (clock.getElapsedTime() * 2 * Math.PI) / 10;
    }
  });

  const renderBox = (object: SceneObject) => {
    return (
      <Box
        key={object.uuid}
        ref={boxRef}
        position={object.position}
        rotation={object.rotation || [0, 0, 0]}
        scale={object.scale || [1, 1, 1]}
      />
    );
  };

  const renderObjects = (objects: SceneObject[]) => {
    return objects.map((object) => {
      switch (object.type) {
        case 'Box':
          return renderBox(object);
        default:
          return null;
      }
    });
  };

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 100]} />
      {renderObjects(sceneJson.objects)}
    </>
  );
};

export default SceneCanvas;
