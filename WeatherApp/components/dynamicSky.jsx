import {Sky, Stars} from "@react-three/drei"
import React from "react";
import {getTimeOfDay} from "./helper.jsx"

export default function DynamicSky(localTime){
    
    // Inspired by https://tympanus.net/codrops/2025/09/18/creating-an-immersive-3d-weather-visualization-with-react-three-fiber/

    // returns the state of the day from API request in format "day", "night", "dawn" or "dusk" 
    const timeOfDay = getTimeOfDay(localTime)
    
    if (timeOfDay == 'night'){
        // nighttime scene here the background is black and stars are renderd 
        return(
            <>
            <color attach="background" args={[0x000000]} />
            <Stars
                radius={1500}
                depth={20}
                count={50000}
                factor={4}
                saturation={0}
                fade
                speed={1}
                
            />
            </>
        );
    };


    // Daytime scense using the sky component  
    let sunPosition;
    let inclination;
    let turbidity;    
        
    switch (timeOfDay){
        case "dawn":
            sunPosition = [100, -5, 100];
            inclination = 0.6;
            turbidity = 8;
            break;
        
        case "day":
            sunPosition = [100, 20, 100];
            inclination = 0.9;
            turbidity = 2;  
            break;
    
        case "dusk":
            sunPosition = [-100, -5, 100];
            inclination = 0.6;
            turbidity = 8;
            break;
        }
    return(
        <Sky
            sunPosition={sunPosition}
            inclination={inclination}
            turbidity={turbidity}
        />
    );

}
