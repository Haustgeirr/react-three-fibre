import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  Grid,
  OrbitControls,
  Environment,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { api } from "../utils/api";
import Box from "../components/Box";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="h-screen w-screen bg-black">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Stage
          intensity={0.5}
          environment="city"
          shadows={{ type: "accumulative", bias: -0.001 }}
          adjustCamera={false}
        >
          <Box position={[0, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[10, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[20, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[30, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[40, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[50, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[60, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[70, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[80, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[90, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[100, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[110, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[120, 0, 0]} rotation={[0, -90, 0]} />
          <Box position={[130, 0, 0]} rotation={[0, -90, 0]} />
        </Stage>
        <OrthographicCamera
          left={10}
          right={10}
          top={10}
          bottom={10}
          makeDefault
          position={[0, 0, 10]}
        />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur />
        </EffectComposer>
        {/* <Environment background preset="night" blur={0.8} /> */}
      </Canvas>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
