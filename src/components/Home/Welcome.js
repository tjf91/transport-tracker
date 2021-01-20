import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Home.scss'
import '../styles/styles.scss'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser} from '../../redux/userReducer'

 function Welcome(props){
    const [toggleForm,setToggleForm]=useState(false)
    const [form, setForm]=useState({})
    const [error, setError]=useState()
    const handleToggle =()=>setToggleForm(!toggleForm)

    const handleLoginInput=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        }
    const handleAddCompany=(e)=>{
        e.preventDefault()
        console.log(form)
        axios.post(`/auth/register`,form)
        .then(res=>{
            props.loginUser(res.data)
            props.history.push(`/${res.data.name}`)
        })
        .catch(e=>console.error(setError(e.response.data)))

    }

    return(
        <div className='welcome'>
            <Button id='register' onClick={handleToggle}>
                Register
            </Button>
            {toggleForm&&
            <div>
                <form onSubmit={handleAddCompany} className='register-form'>
                <TextField onChange={handleLoginInput} name='name' placeholder='username' />            
                <TextField onChange={handleLoginInput} type='password' name='password' placeholder='password' />            
                <TextField onChange={handleLoginInput} name='phone_number' placeholder='phone_number' />            
                <TextField onChange={handleLoginInput} name='email' placeholder='email'           
           error helperText={error}/>            
                <Button variant="contained" type='submit' >Register </Button>

                </form>
                </div>}
            <p>                
                Register a company
                <br />
                Create Driver accounts and see them on the map
                <br />
                Give your driver/s their credentials and start tracking their trip
                <br />
                Create a trip and start adding receipts 
                <br />
                You can <strong>double click on the mini map </strong>to autofill the location
                <br />
                The driver account can also quickly add a receipt at their current location
                <br />
                You can always edit your receipt details, such as total and date later.
                <br />
                You can login with DemoTransport and Demo Driver with the password 123
            </p>
            <div>
            <img alt=''/>
            </div>
           
        </div>
    )
}

export default connect(null,{loginUser})(withRouter(Welcome))