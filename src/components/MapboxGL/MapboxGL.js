import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { Marker } from "mapbox-gl";
import Moment from 'react-moment'
import moment from 'moment'
import "mapbox-gl/dist/mapbox-gl.css";
import './MapboxGL.scss'
import 'dotenv'
import { connect } from 'react-redux';
import axios from 'axios';
import fuel from '../imgs/favpng_fuel-dispenser-clip-art.png'
import { withRouter } from 'react-router-dom';

function MapboxGL(props){
    
  // const [marker, setMarker]= useState(null) 
  const [pos, setPos]= useState({lat:null,lng:null})  
  const mapContainer = useRef("");
  const [driverPos,setDriverPos]=useState({lng:null,lat:null})
  
  const { REACT_APP_MAPBOX_APIKEY} = process.env;

  //replace public key
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
          axios.get(`/companies/${props.match.params.company_id}/drivers?q=${props.match.params.driver_d_id}`)
          .then(res=>{
            const markerNode = document.createElement('div')
            markerNode.className='driver-marker'
            markerNode.style.backgroundImage=`url(${res.data[1].profile_pic})`
            console.log(markerNode)
            console.log('new location',res.data)
            new mapboxgl.Marker(
              markerNode              
              
            )
            .setLngLat(res.data[0]).addTo(map)
          })
          const receiptMarkers=  props.receipts.map((receipt,index)=>{  
            let markerColors={gas:"#81ae19",food:"#f47560",tires:"#f1e15b",repair:'#61cdbb'}
          let marker=                  
         new mapboxgl.Marker({
              
              color: markerColors[receipt.type],
              draggable: false,              
              backgroundImage:  fuel,
              
            })

            marker.setLngLat({lng:receipt.lng,lat:receipt.lat})            
            .setPopup( new mapboxgl.Popup({ offset: 10,closeButton:false,className:"popup", })
            .setHTML(`<h5>${moment(receipt.date_created).format("MMM Do YYYY")}</h5>
            <p>${receipt.type}</p>
            <p>$ ${receipt.total}</p>            
            `))
            .addTo(map)
          })
          })
          
         //reverse geolocation api call to get state and city name on map double click
        map.on('dblclick',(e)=>{         
          
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${REACT_APP_MAPBOX_APIKEY}`)
          .then(res=>{
            console.log(res.data.features[res.data.features.length-3].place_name.split(','))
            let placeArray=res.data.features[res.data.features.length-3].place_name.split(',')
            props.setFormReceipt({...props.formReceipt,...e.lngLat,city:placeArray[0],state:placeArray[1]})
          })
          .catch(e=>console.log(e))
        }) 
        
        if(props.d_id){
          map.addControl(map, 'top-left');
          map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            })
          )
        }
      },[props.receipts])
      
     
      
      
    
    return(
        <div>          
              <div ref={(el) => (mapContainer.current = el)} style={styles} />
             
        </div>
    )
}

function mapStateToProps(reduxState){
  return reduxState
}
export default connect(mapStateToProps)(withRouter(MapboxGL))