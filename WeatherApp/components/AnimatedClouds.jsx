import React, {useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";



export default function AnimatedClouds(cloud){

    console.log(cloud)
    const cloudsRef = useRef()
    const cloud0 = useRef()

    const centerY = 1;
    const centerX = -300;
    const bounceSpeed = 0.1;
    const bounceHight = 20;



    
    
    useFrame(({clock}) => {
        if (!cloudsRef.current) return;

        const t = clock.getElapsedTime();
        
        cloudsRef.current.position.y = centerY + Math.sin( t * bounceSpeed) * bounceHight; 
        cloudsRef.current.position.x += 0.00000004;

        cloud0.current.rotation.x += 0.00000003
        // cloud0.current.rotation.z += 0.003
        // cloud0.current.rotation.y += 0.003

        
        // if(cloudsRef.current.position.x > 800){
        //     movement * -1
        // }
        // cloud0.current.rotation.y -= delta;  
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
