import { useState } from "react"
import { withRouter } from "react-router-dom"
import '../styles/styles.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
            <TextField defaultValue={trip.name} onChange={handleChange} name='name' placeholder='Name of Trip' />
            <Button type='submit' variant='contained' id='start-trip'>Start</Button>            
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