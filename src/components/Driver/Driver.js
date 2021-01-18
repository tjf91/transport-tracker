import React, { useEffect, useState } from 'react'
import DriverEdit from './DriverEdit'
import './Driver.scss'
import { Link } from 'react-router-dom'

export default function Driver(props){
    const [formToggle, setFormToggle]=useState(false)
    const [driverPic, setDriverPic]=useState('')
    const handleFormToggle=()=>{        
        setFormToggle(!formToggle)}
    const updatePic =(pic)=>{
        setDriverPic(pic)
    }

    // useEffect(()=>{
    //     setDriverPic()
    // },[props.driver.profile_pic])

    return(
        <div key={props.driver.d_id} className='driver'>
            <Link to={`/${props.name}/${props.driver.d_id}/trips`}>
            <img src={props.driver.profile_pic} alt='profile pic' className='profile-pic'/>
            </Link>
            {props.driver.name}
            {
                props.driver.profile_pic
                ?<button onClick={handleFormToggle}>Edit</button>                
                :<button onClick={handleFormToggle}>Add Pic</button>
            }
            {
                formToggle&&
                <DriverEdit
                driver={props.driver} 
                updatePic={updatePic}
                handleFormToggle={handleFormToggle}
                />
            }
        </div>
    )
}