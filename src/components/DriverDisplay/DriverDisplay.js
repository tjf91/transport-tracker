import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Driver from '../Driver/Driver'

function DriverDisplay(props){
    const [drivers,setDrivers]=useState([])

    const getCompanyDriverTrips=()=>{
        console.log(props.match)
    }

    const getDrivers=()=>{
        axios.get(`/companies/${props.id}/drivers`)
        .then(res=>setDrivers(res.data))
        .catch(e=>console.log(e))
    }
    
    useEffect(()=>{
        console.log('get drivers')
        getDrivers()        
    },[])
    const mappedDrivers=drivers.map((driver,index)=>(
            <Link onClick={getCompanyDriverTrips} to={`/${props.name}/${driver.d_id}/trips`}>
            <Driver
            driver={driver}
            key={driver.name}
            />
            </Link>
        )
    )
    
    return(
        <div>
            <button>Add Driver</button>            
            {mappedDrivers}
        </div>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(DriverDisplay))