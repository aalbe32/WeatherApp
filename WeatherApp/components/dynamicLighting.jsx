import React from "react";
import { getTimeOfDay } from "./helper";


export default function DynamicLighting(localTime){

    const timeOfDay = getTimeOfDay(localTime)
    if(timeOfDay == "day"){
        console.log("Day Lighting")
        return <pointLight
                position={[0, 1000, 2000]}
                intensity={10000000}
                color={"white"}
                />;
    }
    else{
        return PointLightDark();
    }
};



function PointLightDark(){
  return (
    <>
    <pointLight
      position={[0, 200, -900]}
      intensity={100000}
      color={0xFDF4DC}
    />
    <pointLight
      position={[1000, 100, -3000]}
      intensity={100000}
      color={0xFDF4DC}
    />
    <pointLight
      position={[-1200, 50, -2500]}
      intensity={100000}
      color={0xFDF4DC}
    />
    </>

  )
};
