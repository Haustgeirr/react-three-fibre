import type * as THREE from "three";
import React, { useRef, useState } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Box = (props: ThreeElements["mesh"]) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { nodes } = useLoader(GLTFLoader, "/cs-dev-mark-001.glb");

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
      <meshStandardMaterial color={hovered ? "hotpink" : "white"} />
    </mesh>
  );
};

export default Box;
