import React from "react";
import './App.css'
import { useState, useEffect } from 'react'


const KEY = import.meta.env.VITE_WAPI_TOKEN;

function App() {


  const [weatherData, setWeatherData] = useState({is_day: 1, 
                                                  temp_c: 27.2,
                                                  condition:{text: "sunny", icon:""},
                                                  wind_kph: 20.6,
                                                  wind_dir: "NE",
                                                  cloud: 25,
                                                  air_quality: 70
                                                 })

  // useEffect(() => {
  //     fetch(`https://api.weatherapi.com/v1/current.json?q=Brisbane`, {headers :{key: KEY}})
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {setWeatherData(data.current)})
  // },[]);


  return (

      <div className='container'>
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
    );

  }

export default App
