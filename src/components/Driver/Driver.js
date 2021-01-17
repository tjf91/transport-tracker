import React, { useEffect, useState } from 'react'
import DriverEdit from './DriverEdit'
import './Driver.scss'

export default function Driver(props){
    const [formToggle, setFormToggle]=useState(false)
    const [driverPic, setDriverPic]=useState('')
    const handleFormToggle=()=>{        
        setFormToggle(!formToggle)}
    const updatePic =(pic)=>{
        setDriverPic(pic)
    }

    useEffect(()=>{
        setDriverPic(props.driver.profile_pic)
    },[props.driver])

    return(
        <div key={props.driver.d_id} className='driver'>
            <img src={driverPic} alt='profile pic' className='profile-pic'/>
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