import React, {useEffect, useRef} from "react";
import useSound from "use-sound";
import { getTimeOfDay } from "./helper";

// function that plays ambiant sounds depending of if time is day/dawn/dusk/night
export default function SoundPlayer(localTime){
    const timeOfDay = getTimeOfDay(localTime)

    console.log(timeOfDay)
    
    const [playNight, night] = useSound("/assets/sounds/night-wind.mp3", {
        loop: true,
        volume: 0.2,
        interrupt: true
    });
    
    const [playDay, day] = useSound("/assets/sounds/city-sounds.mp3", {
        loop:true,
        volume: 0.5,
        interrupt: true
    })
        
    useEffect(() =>{

        night.stop();
        day.stop();


        if (timeOfDay == "night"){
            playNight();
        }
        else if(timeOfDay == "dawn" || timeOfDay == "day" || timeOfDay == "dusk"){
            console.log("day sounds")
            playDay();
        }
        
        return () => {
            night.stop();
            day.stop();
        };
    }, [timeOfDay, playDay, playNight, night, day]);    

    return null
}






