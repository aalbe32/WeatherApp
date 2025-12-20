import React, {useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";


// animates clouds for scene along a sine wave 
export default function AnimatedClouds(cloud){

    const cloudsRef = useRef()
    const cloud0 = useRef()

    const centerY = 1;
    const centerX = -300;
    const bounceSpeed = 0.3;
    const bounceHight = 10;

    
    useFrame(({clock}) => {
        if (!cloudsRef.current) return;

        const t = clock.getElapsedTime();
        
        cloudsRef.current.position.y = centerY + Math.sin( t * bounceSpeed) * bounceHight; 
        cloudsRef.current.position.x += 0.00000004;

        cloud0.current.rotation.x += 0.00000003
    })

    return(
        <group ref={cloudsRef}>
          <Cloud 
                ref={cloud0}  
                color={"white"} 
                segments={cloud.cloud} 
                volume={500} 
                bounds={[1500, 300, 400]} 
                position={[-300, 600, -2000]} />
        </group>
    )

}
