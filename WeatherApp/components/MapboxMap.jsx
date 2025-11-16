import React, {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as THREE from "three"


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.config.TELEMETRY_DISABLED = true;

// inits a map with brisbane at the centre then changes dynamicly
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

        mapRef.current.on("style.load", () =>{

            const cloudLayer: mapboxgl.CustomLayerInterface  = {
                
                id: "threejs-clouds",
                type: "custom",
                renderingMode: "3d",

                onAdd: function (map, gl) {
                    // scene
                    this.Scene = new THREE.scene();

                    // Camera
                    this.Camera = new THREE.camera();

                    // Renderer using mapbox GL canvas
                    this.renderer = new THREE.WebGLRenderer({
                        canvas: map.getCanvas(),
                        context: gl,
                        antialias: true,
                    });
                    this.renderer.autoClear = false;

                    // Add directional light
                    const light = new THREE.DirectionalLight(0xffffff, 1);
                    light.position.set(0, 3000, 3000).normalize();
                    this.scene.add(light);

                    // Cloud plane
                    const cloudTexture = new THREE.TextureLoader().load("../public/the-cloud.jpg") //mesh for cloud 
                    const geometry = new THREE.PlaneGeometry(2000, 2000);
                    const material = new THREE.MeshLambertMaterial({
                        map: cloudTexture,
                        transparent: true,
                        opacity: 0.7,
                        depthWrite: false,
                    });

                    // init cloud 
                    this.cloud = new THREE.Mesh(geometry, material);
                    this.cloud.position.set(0, 0, 300); // 300 meters above ground
                    this.cloud.rotation.x = -Math.PI / 2;
                    this.scene.add(this.cloud);
                },

                render: function (gl, matrix) {
                    const progMatrix = new THREE.Matrix4().fromArray(matrix);
                    this.camera.projectionMatrix = progMatrix

                    // simple animation
                    this.cloud.position.x += 0.2;

                    this.renderer.resetState();
                    this.renderer.render(this.scene, this.camera);
                    
                    map.triggerRepaint();
                },
            };

            mapRef.current?.addLayer(cloudLayer)

            console.log("Mapbox clouds loaded");
        });


        return () => {
            if(mapRef.current){
                mapRef.current.remove();
                mapRef.current = null
            }
        };
    },[]);

    return <div ref={containerRef} className="map-container" />
}

