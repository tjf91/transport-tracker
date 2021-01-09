import React, { useEffect, useState } from "react"
import moment from 'moment'

export default function ReceiptForm(props){
    const [date,setDate]=useState(moment(new Date()).format("yyyy-MM-DD"))
    
    
    // const [formReceipt, setFormReceipt]=useState({
    //     date_created:null,
    //     type:'',
    //     amount:null,
    //     total:null,
    //     lat:null,
    //     lng:null,
    // })
    const handleFormInput=(e)=>props.setFormReceipt({...props.formReceipt,[e.target.name]:e.target.value})
    const handleAddReceipt=(e)=>{
        e.preventDefault()
        props.addReceipt(props.formReceipt)
        props.setFormToggle(false)  
    }
    const handleEditReceipt=(e)=>{
        e.preventDefault()
        props.editReceipt(props.formReceipt)
        props.setEditToggle(false)  
    }
    console.log('wut',props.date_created)

    return(
        <div>
                <form onSubmit={!props.edit?handleAddReceipt:handleEditReceipt}>
                <input onChange={handleFormInput} placeholder='City' name='city' defaultValue={props.formReceipt.city||''}/>  
                <input onChange={handleFormInput} placeholder='State' name='state' defaultValue={props.formReceipt.state||''}/>
                <input onChange={handleFormInput} name='date_created' type='date' defaultValue={props.date_created||date}/>
                <select onChange={handleFormInput} name='type' type='radio' defaultValue={props.formReceipt.type}>
                    <option value='gas'>Gas</option>
                    <option value='repair'>Repair</option>
                    <option value='food'>Food</option>
                    <option value='tires'>Tires</option>
                    <option value='other'>Other</option>
                    </select>
                <input onChange={handleFormInput} placeholder='Amount' name='amount' defaultValue={props.formReceipt.amount||''}/>
                <input onChange={handleFormInput} placeholder='Total' name='total' defaultValue={props.formReceipt.total||''}/>
                <input onChange={handleFormInput} placeholder='Lat' name='lat' defaultValue={props.formReceipt.lat||''}/>
                <input onChange={handleFormInput} placeholder='Lng' name='lng' defaultValue={props.formReceipt.lng||''}/>
                <button>Submit Receipt</button>
            </form>
                       
        </div>
    )

}


