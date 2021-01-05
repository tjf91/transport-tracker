import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'

function TripDisplay(props){
    const [trips,setTrips]=useState([])
    const [driverCompany, setDriverCompany]=useState('')
    const getCompanyDriverTrips=()=>{
        axios.get(`/companies/${props.id}/drivers/${props.match.params.driver_d_id}/trips`)
        .then(res=>setTrips(res.data))
        .catch(e=>console.error(e.response.data))        
        }
    const getDriverCompany=()=>{
        axios.get(`/drivers/${props.d_id}/companies`)
        .then(res=>{
            console.log(res.data)
            setDriverCompany(res.data.name)})
        .catch(e=>console.log(e))        
    }    
    const getTrips=()=>{    
        getDriverCompany()   
        props.id
        ?axios.get(`/companies/${props.id}/trips`)
        .then(res=>setTrips(res.data))
        .catch(e=>console.error(e.response.data))
        :axios.get(`/drivers/${props.d_id}/trips`)
        .then(res=>setTrips(res.data))
        .catch(e=>console.error(e.response.data))
    }

    
    useEffect(()=>{
        props.id?getCompanyDriverTrips():getTrips()
        },[])
    

    const mappedTrips=trips.map((trip,index)=>(
        

        <Link to={`/${props.name}/${props.match.params.driver_d_id||driverCompany}/trips/${trip.id}`}>
        <div>{trip.name}</div>
        </Link>
    )
)
    return(
        <div>
            {mappedTrips}
            <button onClick={()=>console.log(props)}>Click for props</button>
        </div>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(TripDisplay))