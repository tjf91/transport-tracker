import React from 'react'
import { connect } from 'react-redux'
import Auth from './Auth/Auth'
import './Header.scss'
import logo from '../imgs/favpng_truck-driver-car-less-than-truckload-shipping-driving.png'
import { Link, withRouter } from 'react-router-dom'
import {logout} from '../../redux/userReducer'

function Header(props){
    const handleLogout=()=>{
        console.log('logout')
        props.history.push('/')
        props.logout()
    }
    return(
        <header>            
            <Link to='/'>
                <img src={logo} alt='Logo' className='main-logo'/>
            </Link>
            {
            props.isLoggedIn
            ?<h1>Welcome {props.name}<button onClick={handleLogout}>Logout</button></h1>
            :<Auth /> 
            }    
            
        </header>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps,{logout})(withRouter(Header))