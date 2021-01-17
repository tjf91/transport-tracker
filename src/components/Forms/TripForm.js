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
        props.handleFormToggle(false)       
    }
    const handleEdit=(e)=>{
        
    }
    

    return(
        <div>
            {props.add_trip&&
        <form onSubmit={handleBeginTrip}>
            <input defaultValue={trip.name} onChange={handleChange} name='name' placeholder='Name of Trip' />
            <button>Start</button>            
        </form>
            
            }
            {
                props.edit_trip&&
                <form>
                    <input />
                    <input />
                    <input />
                </form>
            }
        </div>
    )
} 

export default withRouter(TripForm)