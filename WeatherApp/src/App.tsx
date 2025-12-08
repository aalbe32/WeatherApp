import {Canvas, useThree} from '@react-three/fiber'
import { OrbitControls, useGLTF, useHelper, Cloud, Sky } from "@react-three/drei";
import './App.css'
import { useState, useEffect, useRef } from 'react'
import { PointLightHelper } from 'three';




const KEY = import.meta.env.VITE_WAPI_TOKEN;


function BrisbaneModel() {
  const { scene } = useGLTF('/assets/brisbane_queensland_australia/scene.gltf');
  return <primitive object={scene} position={[-1450, -180, -1800]} />
};

function PointLight(){
  const pointLightRef = useRef(null);

  useHelper(pointLightRef, PointLightHelper, 0.5);

  return (
    <>
    <pointLight
      ref={pointLightRef}
      position={[0, 200, -900]}
      intensity={100000}
      color={"white"}
    />
    <pointLight
      ref={pointLightRef}
      position={[1000, 100, -3000]}
      intensity={100000}
      color={"white"}
    />
    <pointLight
      ref={pointLightRef}
      position={[-1200, 50, -2500]}
      intensity={100000}
      color={"white"}
    />
    </>

  )
}

function Background({cloudCover, timeOfDay} : {cloudCover: number, timeOfDay: string}){
  
  return (
      <Canvas
        camera={{position: [50, 0, 200], 
                 fov: 50,
                 near: 0.1,
                 far: 4000,
                }}>
        <ambientLight intensity={0.2}/>
        <OrbitControls/>
        <PointLight/>
        <BrisbaneModel/>
        {timeOfDay !== 'night' && (
          <Sky
            sunPosition={(() => {
              if (timeOfDay === 'dawn') {
                return [100, -5, 100]; // Sun below horizon for darker dawn colors
              } else if (timeOfDay === 'dusk') {
                return [-100, -5, 100]; // Sun below horizon for sunset colors
              } else { // day
                return [100, 20, 100]; // High sun position for bright daylight
              }
            })()}
            inclination={(() => {
              if (timeOfDay === 'dawn' || timeOfDay === 'dusk') {
                return 0.6; // Medium inclination for transitional periods
              } else { // day
                return 0.9; // High inclination for clear daytime sky
              }
            })()}
            turbidity={(() => {
              if (timeOfDay === 'dawn' || timeOfDay === 'dusk') {
                return 8; // Higher turbidity creates warm sunrise/sunset colors
              } else { // day
                return 2; // Lower turbidity for clear blue sky
              }
            })()}
          />
        )}
        <Cloud
          segments={cloudCover}
          bounds={[1500, 300, 400]}
          volume={500}
          position={[-300, 600, -2000]}
          color={"white"}/>
      </Canvas>
    )
}


function App() {


  
  const [weatherData, setWeatherData] = useState({is_day: 1, 
                                                  temp_c: 27.2,
                                                  condition:{text: "sunny", icon:""},
                                                  wind_kph: 20.6,
                                                  wind_dir: "NE",
                                                  cloud: 100,
                                                  air_quality: 70,
                                                  localTime: "2022-07-22 20:49"
                                                 });

  // useEffect(() => {
  //     fetch(`https://api.weatherapi.com/v1/current.json?q=Brisbane`, {headers :{key: KEY}})
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {setWeatherData(data.current)})
  // },[]);

  const getTimeOfDay = () => {
  
    const currentHour = new Date(weatherData.localTime).getHours();
    if (currentHour >= 19 || currentHour <= 6) return 'night';
    if (currentHour >= 6 && currentHour < 8) return 'dawn';
    if (currentHour >= 17 && currentHour < 19) return 'dusk';
    return 'day';
};



  return (
    <>
    <Background cloudCover={weatherData.cloud} timeOfDay={getTimeOfDay()} />
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
