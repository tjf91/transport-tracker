import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import 'dotenv'

export default function MapboxGL(props){
    
  // const [marker, setMarker]= useState(null) 
  const [pos, setPos]= useState({lat:0,lng:0})
  const [date, setDate]=useState(new Date())
  const mapContainer = useRef("");
  const map = useRef(null);
  const { REACT_APP_MAPBOX_APIKEY} = process.env;
  mapboxgl.accessToken = 'pk.eyJ1IjoidGpmOTEiLCJhIjoiY2tpeXh6NDNnMDIzMjJ5cGhwcDA1bTVvbiJ9.HTkz382IfxQRTZOQt8btGA'
    const styles = {
        width: "40vw",
        height: "40vh",        
      };

      const dropMarker =()=>{
        const marker =  new mapboxgl.Marker({
          color: "#FFFFFF",
          draggable: true
          }).setLngLat([-111, 33.5])
          .addTo(map.current);
      }
      const handleClick=()=>{
        Window.onClick(console.log("TO THE WINDOWWW"))
      }

      useEffect(()=>{
        map.current=new mapboxgl.Map({
         container:mapContainer.current,
         style:'mapbox://styles/mapbox/streets-v11',
         center:[-111,33],
         zoom:5
       })

      },[])
    
    return(
        <div>          
              <div ref={(el) => (mapContainer.current = el)} style={styles} />
              <button onClick={dropMarker}>Marker</button>
        </div>
    )
}


