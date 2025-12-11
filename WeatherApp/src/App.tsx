import './App.css'
import { useState, useEffect} from 'react'
import BrisbaneScene from "../components/BrisbaneScene"




const KEY = import.meta.env.VITE_WAPI_TOKEN;


function App() {


  
  const [weatherData, setWeatherData] = useState({
      current :{is_day: 0, 
                temp_c: 27.2,
                condition:{text: "sunny", icon:""},
                wind_kph: 16.2,
                wind_dir: "NE",
                cloud: 100,
                },
      location:{name: "Brisbane",
                country:"Australia",
                lat: 40.71,
                long: 21.40,
                localtime:"2022-07-22 21:49" }
    });

  // useEffect(() => {
  //     fetch(`https://api.weatherapi.com/v1/current.json?q=Brisbane`, {headers :{key: KEY}})
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {setWeatherData(data)})
  // },[]);



  return (
    <>
    <BrisbaneScene weatherApiData={weatherData.current} localtime={weatherData.location.localtime}/>
      <div className='container' id="ui">
        <p>Birsbane</p>
        <p>is_day: {weatherData.current.is_day}</p>
        <p>temp: {weatherData.current.temp_c}</p>
        <p>condition:  {weatherData.current.condition.text}</p>
        <p>wind_kph: {weatherData.current.wind_kph}</p>
        <p>wind_dir: {weatherData.current.wind_dir}</p>
        <p>cloud: {weatherData.current.cloud}</p>
        <p>Local Time : {weatherData.location.localtime}</p>
      </div>
    </>
    );

  }

export default App
