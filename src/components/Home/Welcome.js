import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Home.scss'
import '../styles/styles.scss'

export default function Welcome(){
    const [toggleForm,setToggleForm]=useState(false)
    const [form, setForm]=useState({})
    const handleToggle =()=>setToggleForm(!toggleForm)

    const handleLoginInput=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        }
    const handleAddCompany=(e)=>{
        e.preventDefault()
        console.log(form)

    }

    return(
        <div>
            <Button color='primary' onClick={handleToggle}>
                Register
            </Button>
            {toggleForm&&
            <div>
                <form onSubmit={handleAddCompany} className='register-form'>
                <TextField onChange={handleLoginInput} name='name' placeholder='username' />            
                <TextField onChange={handleLoginInput} name='password' placeholder='password' />            
                <TextField onChange={handleLoginInput} name='phone_number' placeholder='phone_number' />            
                <TextField onChange={handleLoginInput} name='email' placeholder='email' error          
           helperText='hi'/>            
                <Button variant="contained" type='submit' >Register </Button>

                </form>
                </div>}
            <div>
                <img alt=''/>

            </div>
            <div>
            <img alt=''/>
            </div>
            <div>
            <img alt=''/>
            </div>
        </div>
    )
}