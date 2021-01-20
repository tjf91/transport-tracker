import axios from 'axios'
import Moment from "react-moment";
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'
import TripForm from '../Forms/TripForm'
import '../styles/styles.scss'
import './TripsDisplay.scss'
import Pie from '../Charts/Pie';
import Bar from '../Charts/Bar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import editPencil from '../imgs/favpng_icon-design-editing-iconfinder-icon.png'
import deleteIcon from '../imgs/favpng_button-checkbox.png'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'

function TripDisplay(props){    
    const [trips,setTrips]=useState([])
    const [newTripId, setNewTripId]=useState(null)
    const [toggleForm, setToggleForm]=useState(false)    
    const [driverCompany, setDriverCompany]=useState('')
    const [driverCompanyId, setDriverCompanyId]=useState(null)
    const [status,setStatus]=useState('')
    const handleFormToggle=()=>setToggleForm(!toggleForm)

    const getPic=()=>{
        
    }
    

    
        //needed to get driver's last company name and id
    const getDriverCompany=()=>{
        axios.get(`/drivers/${props.d_id}/companies`)
        .then(res=>{
            console.log(res.data)
            setDriverCompanyId(res.data.id)
            setDriverCompany(res.data.name)})
        .catch(e=>console.log(e))   
    } 
    //this was in case of multiple companies per driver, really unnecessary this way.    
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
                props.history.push(`/${props.id?props.id:driverCompanyId}/${props.match.params.driver_d_id||props.d_id}/trips/${res.data.id}`)
            })
                
            .catch(e=>console.log(e))  

    }

    const handleEditTrips=(e)=>{
        
        
    }    
    
    //update list of trips
    useEffect(()=>{         
        getTrips()
        console.log('getting TRIPS effect')
        
        },[trips.length,props.id,props.d_id])
    
        const handleChange = (event) => {
            console.log(event.target.value);
          };

    const mappedTrips=trips.map((trip,index)=>(
               
        <main>
        <div className='trip-title'>
        <div className='trip-info'>
        <Link to={{pathname:`/${props.id?props.id:driverCompanyId}/${props.match.params.driver_d_id||props.d_id}/trips/${trip.id}`,driver:props.location.driver}}>
            <h4>
            {trip.name}
            </h4>
            </Link>
        <Moment format="MM/DD/YYYY">{trip.date_start}</Moment>
        {trip.status==='complete' &&
        <Moment format="MM/DD/YYYY">{trip.date_end}</Moment>
}
        <FormControl >
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={trip.status}
          onChange={(e)=>{          
            axios.put(`/companies/${props.id||driverCompanyId}/drivers/${props.d_id||props.match.params.driver_d_id}/trips/${trip.id}`,{...trip,status:e.target.value,date_end:moment(new Date()).format("yyyy-MM-DD")})
            .then(res=>{
                setTrips([...trips,res.data])
                
            })
            .catch(e=>console.log(e))
          }}
          >
          <MenuItem value='active'>active</MenuItem>  
          <MenuItem value='complete'>complete</MenuItem>
                   
        </Select>
      </FormControl>
            </div>
            

            

        
            <div className='display-pie-chart'>
        <Pie
        company_id={props.id||driverCompanyId}
        driver_d_id={props.d_id||props.match.params.driver_d_id}
        trip_id={trip.id}
        margin={{ top: 40, right: 0, bottom: 40, left: 80}}
        radialLabelsLinkDiagonalLength={5}
        radialLabelsLinkHorizontalLength={0}
        
        />
        <p>
        </p>
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
            <Button id='begin' variant="contained"  onClick={handleFormToggle}>Begin Trip</Button>
            <img key={Date.now()} src={props.profile_pic||
            `https://persona-project.s3-us-west-1.amazonaws.com/${props.name.replace(/\s/g, '-')}-${props.d_id}-profile_pic`
            }  className='profile-pic' alt='Please add pic'/>
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