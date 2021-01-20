import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Auth from './Auth/Auth'
import './Header.scss'
import logo from '../imgs/favpng_truck-driver-car-less-than-truckload-shipping-driving.png'
import { Link, withRouter } from 'react-router-dom'
import {loginUser,logout} from '../../redux/userReducer'
import axios from 'axios'
import Button from '@material-ui/core/Button';


function Header(props){
    const [pos, setPos]= useState({longitude:null,latitude:null})

    const handleLogout=()=>{
        console.log('logout')
        props.history.push('/')
        props.logout()
    }
    const updateLocation=()=>{
        if(pos.latitude){
            axios.put(`/drivers/${props.d_id}?q=location`,{lng:pos.longitude,lat:pos.latitude})
            .then(()=>console.log('location update',pos))
            .catch(e=>console.log(e))
        }
    }
    function successLocation(e){
        console.log('success',e)    
        const {longitude,latitude}=e.coords
        console.log()        
        setPos({longitude,latitude})
        updateLocation()
              
      }
    function errorLocation(e){
        console.log('ERROR LOCATION')
      
    }
    
    useEffect(()=>{
        axios.get('/auth/user')
        .then(res=>{
            const {id,d_id,name}=res.data
            props.loginUser({name,id,d_id})
            if(props.d_id){
                console.log('geo')   
                    navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true})
                    updateLocation()         
                   }
        })
    },[])
    
    useEffect(()=>{
        if(props.d_id){
            console.log('geo')   
                navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true})
                updateLocation()         
               }
    },[props.d_id])
    
    return(
        <header>            
            <Link to={`/${props.name}`}>
                <img src={logo} alt='Logo' className='main-logo'/>
            </Link>
            {
            props.isLoggedIn
            ?<h1>Welcome<br/> {props.name}</h1>
            :<h1>Transport Tracker</h1>
            }
            {
                props.isLoggedIn
                ?<Button id='logout' onClick={handleLogout}>Logout</Button>
                :<Auth /> 
                   
            }
              
        </header>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps,{loginUser,logout})(withRouter(Header))