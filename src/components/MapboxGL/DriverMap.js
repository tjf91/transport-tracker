import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './MapboxGL.scss'
import 'dotenv'
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const { REACT_APP_MAPBOX_APIKEY} = process.env;

function DriverMap(props){
    
    const mapContainer = useRef("");
    const [drivers,setDrivers]=useState([])
    const goToTrips=(id)=>{
        console.log('driver id',id)
        // props.history.push(`/${props.name}/${id}/trips`)
    }

    mapboxgl.accessToken = REACT_APP_MAPBOX_APIKEY
    const styles = {
        width: "400px",
        height: "400px",
        borderRadius: "10px"        
      };
    useEffect(()=>{
        let map=new mapboxgl.Map({
            container:mapContainer.current,
            style:'mapbox://styles/mapbox/streets-v11',
            center:[-111,33],
            zoom:3
          })
        map.on('load',(e)=>{
            //get driver lat and lng to create marker
            axios.get(`/companies/${props.id}/drivers`)
            .then(res=>{
                
                console.log('new location',res.data)
                res.data.map(driver=>{
                    const markerNode = document.createElement('div')
                    markerNode.className='driver-marker'
                    markerNode.style.backgroundImage=`url(${driver.profile_pic})`                    
                  new mapboxgl.Marker(
                      markerNode            

                      )
                      .setLngLat({lng:driver.lng,lat:driver.lat})
                      .setPopup( new mapboxgl.Popup({ offset: 10,className:"popup"})
                      .setHTML(`<h3>${driver.name}</h3>
                                <br />
                                <button onClick=${()=>{
                                    goToTrips(driver.d_id)}}>Go to Trips</button>`))
                      .addTo(map)
              })
                
            })
        })

    },[drivers])

    return(
        <div ref={(el) => (mapContainer.current = el)} style={styles} />
    )
}

function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(DriverMap))