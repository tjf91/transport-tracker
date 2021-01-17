import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Driver from '../Driver/Driver'
import DriverEdit from '../Driver/DriverEdit'

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
        .then(res=>setDrivers(res.data))
        .catch(e=>console.log(e))
    }
    
    useEffect(()=>{
        getDrivers() 
               
    },[])
    const mappedDrivers=drivers.map((driver,index)=>(
        <div>
            <Link to={{pathname:`/${props.name}/${driver.d_id}/trips`,driver}}>
                {driver.name}
                </Link>
            <Driver
            driver={driver}
            key={driver.d_id}
            />
           
            </div>
        )
    )
    
    return(
        <div>
            <button onClick={handleFormToggle}>Add Driver</button>
            {
                formToggle&&
            <form onSubmit={addDriver}>
                <input onChange={handleFormInput} placeholder='name' name='name'/>
                <input onChange={handleFormInput} placeholder='password' name='password' />
                <input onChange={handleFormInput} placeholder='phone-number' name='phone_number'/>
                <input onChange={handleFormInput} placeholder='email' name='email'/>                
                <button>Submit New Driver</button>
            </form>            
             
            }
            {mappedDrivers}
        </div>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(DriverDisplay))