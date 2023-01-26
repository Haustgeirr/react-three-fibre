import { type NextPage } from "next";
import { Canvas } from "@react-three/fiber";

import IntroScene from "../scenes/intro";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <IntroScene />
      </Canvas>
    </div>
  );
};

export default Home;
