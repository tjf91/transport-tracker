import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Driver from '../Driver/Driver'

import DriverMap from '../MapboxGL/DriverMap'
import './DriverDisplay.scss'
import '../styles/styles.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GridLoader } from 'react-spinners'


function DriverDisplay(props){
    const [drivers,setDrivers]=useState([])
    const [formToggle, setFormToggle]=useState(false)
    const [formInput, setFormInput]=useState({name:'',password:'',phone_number:'',email:''})

    const handleFormInput=(e)=>{
        setFormInput({...formInput,[e.target.name]:e.target.value})
    }
    const addDriver=(e)=>{
        e.preventDefault()
        axios.post(`/companies/${props.id}/drivers`,formInput)
        .then(res=>setDrivers(res.data))
        .catch(e=>console.log(e))
        setFormToggle(false)
    }

    const handleFormToggle=()=>{        
        console.log(formToggle)
        setFormToggle(!formToggle)
    }

    const getDrivers=()=>{        
        axios.get(`/companies/${props.id}/drivers`)
        .then(res=>{
            console.log('drivers', res.data)
            setDrivers(res.data)})
        .catch(e=>console.log(e))
    }
    const forceUpdate=()=>{
        console.log('getting drivers again')
        getDrivers()
    }
    
    useEffect(()=>{
        getDrivers() 
               
    },[])

    // const mappedDrivers=drivers.map((driver,index)=>(
    //     // <div key={driver.d_id} >            
    //         <Driver
    //         driver={driver}
    //         key={driver.d_id}
    //         forceUpdate={forceUpdate}
    //         />           
    //         // </div>
    //     )
    // )||<div>Loading</div>
    console.log(drivers)
    return(
        <div className='driver-display'>
            <DriverMap
            drivers={drivers}
             />
            <Button variant='contained' id='add-driver' onClick={handleFormToggle}>Add Driver</Button>
            {
                formToggle&&
            <form onSubmit={addDriver}>
                <TextField onChange={handleFormInput} placeholder='name' name='name'/>
                <TextField onChange={handleFormInput} placeholder='password' name='password' />
                <TextField onChange={handleFormInput} placeholder='phone-number' name='phone_number'/>
                <TextField onChange={handleFormInput} placeholder='email' name='email'/>                
                <Button type='submit' variant='contained' id='submit-driver' >Submit New Driver</Button>
            </form>            
             
            }
            <div className='drivers'>
            {drivers?
            drivers.map((driver,index)=>(
                // <div key={driver.d_id} >            
                    <Driver
                    driver={driver}
                    key={driver.d_id}
                    forceUpdate={forceUpdate}
                    /> 
                    ))
                    :<GridLoader/>
            }
            </div>
        </div>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(DriverDisplay))