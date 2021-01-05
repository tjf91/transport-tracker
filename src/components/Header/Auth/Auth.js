import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {loginUser} from '../../../redux/userReducer'


import './Auth.scss'

function Auth(props){
    const [loginInput, setLoginInput]=useState({name:'',password:''})
    const [buttonOff, setButtonOff]=useState(null)
    const [errMsg, setErrMsg]=useState('')
    const handleLoginInput=(e)=>{
        setLoginInput({...loginInput,[e.target.name]:e.target.value})
    }
    const handleAuthSubmit=(e)=>{    
        e.preventDefault()         
        axios
        .post('/auth/login',loginInput)
        .then(res=>{
            console.log(res.data)
            const {id,d_id,name}=res.data
            props.loginUser({name,id,d_id}) 
            props.history.push(`/${name}`)       
        
        })
        .catch(e=>console.error(setErrMsg(e.response.data)))
        setButtonOff(!buttonOff)
    }
    
    return(
        <form  onSubmit={handleAuthSubmit} className='auth-form'>
            <input onChange={handleLoginInput} name='name' placeholder='username' value={loginInput.name}/>            
            <input onChange={handleLoginInput} name='password' placeholder='password' value={loginInput.password}/>            
            <button disabled={buttonOff}>Login</button>
            {errMsg}
          
        </form>
    )
}

export default connect(null,{loginUser})(withRouter(Auth))