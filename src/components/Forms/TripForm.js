import { useState } from "react"
import { withRouter } from "react-router-dom"

function TripForm(props){
    const [trip,setTrip]=useState({
        name:'',
        date_start:new Date().toLocaleString(),
        date_end:null,
        total:null,
        company_id:props.id,
        driver_d_id:props.d_id,
        status:'active'
    })
    const handleChange=(e)=>setTrip({...trip,name:e.target.value})
    const handleBeginTrip=(e)=>{
        e.preventDefault()        
        props.beginTrip(trip)       
    }

    return(
        <form onSubmit={handleBeginTrip}>
            <input value={trip.name} onChange={handleChange} name='name' placeholder='Name of Trip' />
            <button onClick={console.log()}>Start</button>            
        </form>
    )
} 

export default withRouter(TripForm)