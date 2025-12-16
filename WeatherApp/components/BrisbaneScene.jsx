import {Canvas, useFrame} from '@react-three/fiber'
import { OrbitControls, useGLTF, Cloud } from "@react-three/drei";
import DynamicLighting from './dynamicLighting.jsx';
import React, { useRef } from 'react';
import DynamicSky from "../components/dynamicSky.jsx"
import AnimatedClouds from './AnimatedClouds.jsx';
import SoundPlayer from './audioPlayer.jsx';

export default function BrisbaneScene({ weatherApiData = {}, localtime = "" }){

  
  return (
    <>
      <SoundPlayer localTime = {localtime}/>
      <Canvas
        camera={{position: [50, 0, 200], 
                 fov: 50,
                 near: 0.1,
                 far: 4000,
                }}>
        <ambientLight intensity={0.2}/>
        <OrbitControls/>
        <DynamicLighting localTime = {localtime}/>
        <BrisbaneModel/>
        <DynamicSky localTime = {localtime}/>
        <AnimatedClouds cloud={weatherApiData.cloud}/>
      </Canvas>
    </>
    );
};


function BrisbaneModel() {
  const { scene } = useGLTF('/assets/brisbane_queensland_australia/scene.gltf');
  return <primitive object={scene} position={[-1450, -180, -1800]} />
};