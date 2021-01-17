import axios from 'axios'
import Moment from "react-moment";
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'
import TripForm from '../Forms/TripForm'
import './TripsDisplay.scss'
import Pie from '../Charts/Pie';
import Bar from '../Charts/Bar';
import editPencil from '../imgs/favpng_icon-design-editing-iconfinder-icon.png'
import deleteIcon from '../imgs/favpng_button-checkbox.png'


function TripDisplay(props){    
    const [trips,setTrips]=useState([])
    const [toggleForm, setToggleForm]=useState(false)    
    const [driverCompany, setDriverCompany]=useState('')
    const [driverCompanyId, setDriverCompanyId]=useState(null)
    const handleFormToggle=()=>setToggleForm(!toggleForm)

    
        //needed to get driver's last company name and id
    const getDriverCompany=()=>{
        axios.get(`/drivers/${props.d_id}/companies`)
        .then(res=>{
            console.log(res.data)
            setDriverCompanyId(res.data.id)
            setDriverCompany(res.data.name)})
        .catch(e=>console.log(e))   
    }    
    const getTrips=()=>{    
        if(props.id){
            axios.get(`/companies/${props.id}/drivers/${props.match.params.driver_d_id}/trips`)
            .then(res=>setTrips(res.data))
            .catch(e=>console.error(e.response.data))

        }
        if(props.d_id){

            getDriverCompany()   
            axios.get(`/drivers/${props.d_id}/trips`)
            .then(res=>setTrips(res.data))
            .catch(e=>console.error(e.response.data))
        }

    }
    const beginTrip=(trip)=>{        
            axios.post(`/companies/${props.id||driverCompanyId}/drivers/${props.match.params.driver_d_id||props.d_id}/trips`,trip)
            .then(res=>{
                setTrips([res.data,...trips])
                
            })
                
            .catch(e=>console.log(e))  

    }

    const handleEditTrips=(e)=>{

    }

    const handleDeleteTrip=(e)=>{

    }
    // useEffect(()=>{
    //     axios.get(`/companies/${props.id||driverCompanyId}/drivers/${props.match.params.driver_d_id||props.d_id}/trips`)
    // },[])
    
    //update list of trips
    useEffect(()=>{         
        getTrips()
        console.log('getting TRIPS effect')
        
        },[trips.length])
    

    const mappedTrips=trips.map((trip,index)=>(
               
        <main>
        <div className='trip-title'>
        <Link to={`/${props.id?props.id:driverCompanyId}/${props.match.params.driver_d_id||props.d_id}/trips/${trip.id}`}>
        <h4>{trip.name}</h4>
        <aside>Status:{trip.status}</aside>
        <Moment format="MM/DD/YYYY">{trip.date_start}</Moment>
        {trip.date_end&&
<Moment format="MM/DD/YYYY">{trip.date_end}</Moment>

        }
            </Link>
            <div className='display-pie-chart'>
        <Pie
        company_id={props.id||driverCompanyId}
        driver_d_id={props.d_id||props.match.params.driver_d_id}
        trip_id={trip.id}
        margin={{ top: 40, right: 80, bottom: 40, left: 0}}
        radialLabelsLinkDiagonalLength={10}
        radialLabelsLinkHorizontalLength={5}
        
        />
        </div>
        <div>

            <img onClick={()=>{
                console.log(`request to ${props.id||driverCompanyId} and ${props.d_id||props.match.params.driver_d_id}with final${trip.id}`)
                            }} src={editPencil} className='action-img' alt=''/>
                            <br />
             <img onClick={()=>{
                 window.confirm('You sure about erasing this receipts')&&
                axios.delete(`/companies/${props.id||driverCompanyId}/drivers/${props.d_id||props.match.params.driver_d_id}/trips/${trip.id}`)
                .then(res=>{                    
                    console.log('success?',res.data)
                    getTrips()
                })
                .catch(e=>console.error(alert(e.response.data)))

             }
                            }           
                          src={deleteIcon} className='action-img' alt=''/>

        </div>
        </div>
            
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
                add_trip={true}
                handleFormToggle={handleFormToggle}
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