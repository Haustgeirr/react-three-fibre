import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import Box from "../components/Box";

const IntroScene = () => {
  const yRef = useRef(-Math.PI / 2);
  // use useFrame to rotate the box around the y axis, 2 radians every 5 s
  useFrame(({ clock }) => {
    yRef.current = (clock.getElapsedTime() * 2 * Math.PI) / 5;
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 100]} />
      <Box position={[0, 0, 0]} rotation={[0, yRef.current, 0]} />
    </>
  );
};

export default IntroScene;
