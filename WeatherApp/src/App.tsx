import {Canvas} from '@react-three/fiber'
import { OrbitControls, useGLTF, useHelper } from "@react-three/drei";
import './App.css'
import { useState, useEffect, useRef } from 'react'
import { PointLightHelper } from 'three';




const KEY = import.meta.env.VITE_WAPI_TOKEN;


function BrisbaneModel() {
  const { scene } = useGLTF('/assets/brisbane_queensland_australia/scene.gltf');
  return <primitive object={scene} position={[-1250, -200, -2000]} />
};

function PointLight(){
  const pointLightRef = useRef();

  useHelper(pointLightRef, PointLightHelper, 0.5);

  return (
    <pointLight
      ref={pointLightRef}
      position={[-530, -50, -3000]}
      intensity={10000000}
      color={"white"}
    />
  )

}


function App() {

  
  const [weatherData, setWeatherData] = useState({is_day: 1, 
                                                  temp_c: 27.2,
                                                  condition:{text: "sunny", icon:""},
                                                  wind_kph: 20.6,
                                                  wind_dir: "NE",
                                                  cloud: 25,
                                                  air_quality: 70
                                                 });

  // useEffect(() => {
  //     fetch(`https://api.weatherapi.com/v1/current.json?q=Brisbane`, {headers :{key: KEY}})
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {setWeatherData(data.current)})
  // },[]);


  return (
    <>
      <Canvas
        camera={{position: [0, 5, 15], 
                 fov: 60,
                 near: 0.1,
                 far: 4000}}>
        <ambientLight intensity={0.5}/>
        <PointLight/>
        <OrbitControls/>
        <BrisbaneModel/>
      </Canvas>

      <div className='container' id="ui">
        <p>Birsbane</p>
        <p>is_day: {weatherData.is_day}</p>
        <p>temp: {weatherData.temp_c}</p>
        <p>condition:  {weatherData.condition.text}</p>
        <p>wind_kph: {weatherData.wind_kph}</p>
        <p>wind_dir: {weatherData.wind_dir}</p>
        <p>cloud: {weatherData.cloud}</p>
        <p>air_quality: {weatherData.air_quality}</p>
      </div>
    </>
    );

  }

export default App
