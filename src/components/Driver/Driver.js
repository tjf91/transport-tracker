import React, { useEffect, useState } from 'react'
import DriverEdit from './DriverEdit'
import './Driver.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateProfilePic} from '../../redux/userReducer'
import '../styles/styles.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Driver(props){
    const [formToggle, setFormToggle]=useState(false)
    const [driverPic, setDriverPic]=useState(props.driver.profile_pic||'https://persona-project.s3-us-west-1.amazonaws.com/Daco_5508649.png')
    const [anchorEl, setAnchorEl] = useState(null);
    const handleFormToggle=()=>{        
        setFormToggle(!formToggle)
        handleClose()    
    }
    const updatePic =()=>{
        setDriverPic(`https://persona-project.s3-us-west-1.amazonaws.com/${props.driver.name.replace(/\s/g, '-')}-${props.driver.driver_d_id}-profile_pic`)       
        
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

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
                // props.driver.profile_pic
                // ?<Button variant='contained' onClick={handleFormToggle}>Edit</Button>                
                // :
                <div>
                <Button id='options' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant='contained'>Options</Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleFormToggle}>Change Picture</MenuItem>
                <MenuItem onClick={handleClose}>Reset Password</MenuItem>
                <MenuItem onClick={handleClose}>Delete Driver</MenuItem>
              </Menu>
                  </div>
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