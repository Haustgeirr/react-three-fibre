import React, { forwardRef, useState, useRef } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3 } from 'three';

type BoxProps = JSX.IntrinsicElements['mesh'] & {
  ref?: React.Ref<THREE.Mesh>;
};

const Box = forwardRef<THREE.Mesh, BoxProps>((props, ref) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { nodes } = useLoader(GLTFLoader, '/cs-dev-mark-001.glb');

  const dir = new Vector3(1, 0, 0);
  dir.normalize();

  const origin = new Vector3(0, 0, 0);
  const length = 5;
  const hex = 0xffff00;

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      castShadow
      receiveShadow
      geometry={nodes.Cube.geometry}
    >
      <meshStandardMaterial color={hovered ? 'hotpink' : 'white'} />
      <arrowHelper args={[dir, origin, length, hex]} />
    </mesh>
  );
});

Box.displayName = 'Box';
export default Box;
