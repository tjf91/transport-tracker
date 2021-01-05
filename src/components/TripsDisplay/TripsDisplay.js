import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Trips from '../Trips/Trips'

function TripDisplay(props){
    const [trips,setTrips]=useState([])
    const getCompanyDriverTrips=()=>{
        console.log(props)
    }

    const getTrips=()=>{       
        props.id
        ?axios.get(`/companies/${props.id}/trips`)
        .then(res=>setTrips(res.data))
        .catch(e=>console.error(e.response.data))
        :axios.get(`/drivers/${props.d_id}/trips`)
        .then(res=>setTrips(res.data))
        .catch(e=>console.error(e.response.data))
    }
    useEffect(()=>{        
        getTrips()
        getCompanyDriverTrips()
    },[])

    const mappedTrips=trips.map((trip,index)=>(
        <Trips
                trip={trip}
                key={trip.id}
                 />
    )
)
    return(
        <div>
            {mappedTrips}
            <button onClick={getCompanyDriverTrips}>Click for trips</button>
        </div>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(TripDisplay))