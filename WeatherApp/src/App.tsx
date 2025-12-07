import React, { useRef } from "react";
import './App.css'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'



const KEY = import.meta.env.VITE_WAPI_TOKEN;

function App() {

  const canvasRef = useRef(null);
  
  const [weatherData, setWeatherData] = useState({is_day: 1, 
                                                  temp_c: 27.2,
                                                  condition:{text: "sunny", icon:""},
                                                  wind_kph: 20.6,
                                                  wind_dir: "NE",
                                                  cloud: 25,
                                                  air_quality: 70
                                                 })

  useEffect(() =>{ 
     // --- THREE.JS SETUP --- //
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(0, 20, 100);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    scene.add(new THREE.GridHelper(200, 50));

    // GLTF Model loader 
    const gltfloader = new GLTFLoader();
    gltfloader.load('./assets/brisbane_queensland_australia/scene.gltf', (gltfScene) =>{
      console.log(gltfScene)
      scene.add(gltfScene.scene)
    });
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);


  // useEffect(() => {
  //     fetch(`https://api.weatherapi.com/v1/current.json?q=Brisbane`, {headers :{key: KEY}})
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {setWeatherData(data.current)})
  // },[]);


  return (
    <>
      <canvas id="bg" ref={canvasRef}/>
        <div className='container' id="ui">
          <div className=''>
            <p>Birsbane</p>
            <p>is_day: {weatherData.is_day}</p>
            <p>temp: {weatherData.temp_c}</p>
            <p>condition:  {weatherData.condition.text}</p>
            <p>wind_kph: {weatherData.wind_kph}</p>
            <p>wind_dir: {weatherData.wind_dir}</p>
            <p>cloud: {weatherData.cloud}</p>
            <p>air_quality: {weatherData.air_quality}</p>
          </div>
        </div>
      </>
    );

  }

export default App
