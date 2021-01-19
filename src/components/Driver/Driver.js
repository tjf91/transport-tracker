import React, { useEffect, useState } from 'react'
import DriverEdit from './DriverEdit'
import './Driver.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateProfilePic} from '../../redux/userReducer'

function Driver(props){
    const [formToggle, setFormToggle]=useState(false)
    const [driverPic, setDriverPic]=useState(props.driver.profile_pic)
    const handleFormToggle=()=>{        
        setFormToggle(!formToggle)}
    const updatePic =()=>{
        setDriverPic(`https://persona-project.s3-us-west-1.amazonaws.com/${props.driver.name.replace(/\s/g, '-')}-${props.driver.driver_d_id}-profile_pic`)       
        
    }

    useEffect(()=>{
        updatePic()
    })

    return(
        <div key={props.driver.d_id} className='driver'>
            <Link onClick={()=>props.updateProfilePic(driverPic)} to={{pathname:`/${props.name}/${props.driver.d_id}/trips`,driver:props.driver}}>
            <img onError={e=>e.target.src='https://persona-project.s3-us-west-1.amazonaws.com/Daco_5508649.png'} key={Date.now()} src={driverPic}  alt='profile pic' className='profile-pic'/>
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
                forceUpdate={props.forceUpdate}
                />
            }
        </div>
    )
}

function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps,{updateProfilePic})(Driver)