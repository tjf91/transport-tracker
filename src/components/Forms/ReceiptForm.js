import axios from "axios"
import React, { useState } from "react"

export default function ReceiptForm(props){
    
    
    const [formReceipt, setFormReceipt]=useState({
        date_created:null,
        type:'',
        amount:null,
        total:null,
        lat:null,
        lng:null,
    })
    const handleFormInput=(e)=>setFormReceipt({...formReceipt,[e.target.name]:e.target.value})
    const handleAddReceipt=(e)=>{
        e.preventDefault()
        props.addReceipt(formReceipt)
        props.setFormToggle(false)
    }

    return(
        <div>
                <form onSubmit={handleAddReceipt}>
                <input onChange={handleFormInput} placeholder='City' name='city'/>  
                <input onChange={handleFormInput} placeholder='State' name='state'/>
                <input onChange={handleFormInput} name='date_created' type='date'/>
                <select onChange={handleFormInput} name='type' type='radio'>
                    <option value='gas'>Gas</option>
                    <option value='repair'>Repair</option>
                    <option value='food'>Food</option>
                    <option value='tires'>Tires</option>
                    <option value='other'>Other</option>
                    </select>
                <input onChange={handleFormInput} placeholder='Amount' name='amount'/>
                <input onChange={handleFormInput} placeholder='Total' name='total'/>
                <input onChange={handleFormInput} placeholder='Lat' name='lat'/>
                <input onChange={handleFormInput} placeholder='Lng' name='lng'/>
                <button>Submit Receipt</button>
            </form>
                       
        </div>
    )

}


