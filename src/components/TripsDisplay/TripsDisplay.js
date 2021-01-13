import axios from 'axios'
import Moment from "react-moment";
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'
import TripForm from '../Forms/TripForm'
import './TripsDisplay.scss'
import Pie from '../Charts/Pie';
import Bar from '../Charts/Bar';

function TripDisplay(props){    
    const [trips,setTrips]=useState([])
    const [toggleForm, setToggleForm]=useState(false)
    const [driverCompany, setDriverCompany]=useState('')
    const [driverCompanyId, setDriverCompanyId]=useState(null)
    const handleFormToggle=()=>setToggleForm(!toggleForm)
    const getCompanyDriverTrips=()=>{
        axios.get(`/companies/${props.id}/drivers/${props.match.params.driver_d_id}/trips`)
        .then(res=>setTrips(res.data))
        .catch(e=>console.error(e.response.data))        
        }
    const getDriverCompany=()=>{
        axios.get(`/drivers/${props.d_id}/companies`)
        .then(res=>{
            console.log(res.data)
            setDriverCompanyId(res.data.id)
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
    const beginTrip=(trip)=>{        
            axios.post(`/companies/${props.id||driverCompanyId}/drivers/${props.match.params.driver_d_id||props.d_id}/trips`,trip)
            .then(res=>setTrips([...trips,res.data]))
            .catch(e=>console.log(e))        
    }

    
    useEffect(()=>{        
        props.id?getCompanyDriverTrips():getTrips()
        },[trips.length])
    

    const mappedTrips=trips.map((trip,index)=>(       
        <main>
        <Link to={`/${props.id?props.id:driverCompanyId}/${props.match.params.driver_d_id||props.d_id}/trips/${trip.id}`}>
        <h4>{trip.name}</h4>
        <aside>Status:{trip.status}</aside>
        <Moment format="MM/DD/YYYY">{trip.date_start}</Moment>
        <div className='display-pie-chart'>
        <Pie
        company_id={props.id||driverCompanyId}
        driver_d_id={props.d_id||props.match.params.driver_d_id}
        trip_id={trip.id}
        margin={{ top: 40, right: 40, bottom: 40, left: 40}}
        radialLabelsLinkDiagonalLength={5}
        radialLabelsLinkHorizontalLength={0}
        
        />
        </div>
            </Link>
        <div className='display-bar-chart'>
            <Bar
            company_id={props.id||driverCompanyId}
            driver_d_id={props.d_id||props.match.params.driver_d_id}
            trip_id={trip.id}    
            margin={{ top: 0, right: 130, bottom: 0, left: 60 }}       
            />
        </div>
        </main>
    )
)
        
    return(
        <div className='trips-display'>
            <h5>{driverCompany}</h5>
            <button onClick={handleFormToggle}>Begin Trip</button>
            {
                toggleForm&&
                <TripForm 
                id={props.id||driverCompanyId}
                d_id={props.match.params.driver_d_id||props.d_id}
                beginTrip={beginTrip}
                />
            }
            {mappedTrips}
        </div>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(TripDisplay))