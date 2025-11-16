import React, {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

mapboxgl.config.TELEMETRY_DISABLED = true;

export default function MapboxMap({
    lng = 153.0251,
    lat = -27.4698,
    zoom = 13,
    pitch = 65,
    bearing = 0,
    style  = "mapbox://styles/mapbox/streets-v12",
}) { 

    const containerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() =>{

        if (!containerRef.current) return;

        if (!mapboxgl.accessToken){
            console.error("Mapbox token is incorrect")
            return
        }

        // map init with new veriables
        mapRef.current = new mapboxgl.Map({
            container: containerRef.current,
            style,
            center: [lng, lat],
            zoom,
            pitch,
            bearing,
            antialias: true
        });

        // add navigation controls
        mapRef.current.addControl(new mapboxgl.NavigationControl());

        mapRef.current.on("load", () =>{
            console.log("Mapbox style loaded");
        });


        return () => {
            if(mapRef.current){
                mapRef.current.remove();
                mapRef.current = null
            }
        };
    }, [lng, lat, zoom, pitch, bearing, style]);

    return <div ref={containerRef} className="map-container" />
}

