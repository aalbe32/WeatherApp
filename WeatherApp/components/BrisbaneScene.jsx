import {Canvas} from '@react-three/fiber'
import { OrbitControls, useGLTF, Cloud } from "@react-three/drei";
import DynamicLighting from './dynamicLighting.jsx';
import React from 'react';
import DynamicSky from "../components/dynamicSky.jsx"


export default function BrisbaneScene({ weatherApiData = {} }){

  
  return (
      <Canvas
        camera={{position: [50, 0, 200], 
                 fov: 50,
                 near: 0.1,
                 far: 4000,
                }}>
        <ambientLight intensity={0.2}/>
        <OrbitControls/>
        <DynamicLighting localTime = {weatherApiData.localTime}/>
        <BrisbaneModel/>
        <DynamicSky localTime = {weatherApiData.localTime}/>
        <Cloud
          segments={weatherApiData.cloud_cover}
          bounds={[1500, 300, 400]}
          volume={500}
          position={[-300, 600, -2000]}
          color={"white"}/>
      </Canvas>
    );
};


function BrisbaneModel() {
  const { scene } = useGLTF('/assets/brisbane_queensland_australia/scene.gltf');
  return <primitive object={scene} position={[-1450, -180, -1800]} />
};