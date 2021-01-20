import React, { useEffect, useState } from "react"
import moment from 'moment' 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
    
    useEffect(()=>{
        
        console.log('receipt form ')

    },[props.formReceipt])
    return(
        <div>
                <form onSubmit={!props.edit?handleAddReceipt:handleEditReceipt}>
                <TextField disabled={props.edit} onChange={handleFormInput} placeholder='City' name='city' value={props.formReceipt.city||''}/>  
                <TextField disabled={props.edit} onChange={handleFormInput} placeholder='State' name='state' value={props.formReceipt.state||''}/>
                <TextField onChange={handleFormInput} name='date_created' type='date' defaultValue={props.date_created||date}/>
                                    
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
         name='type'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={props.formReceipt.type||''}
          onChange={handleFormInput}
          >
          <MenuItem value='gas'>gas</MenuItem>
          <MenuItem value='tires'>tires</MenuItem>
          <MenuItem value='food'>food</MenuItem>
          <MenuItem value='repair'>repair</MenuItem>  
          
                   
        </Select>
                   
                <TextField onChange={handleFormInput} placeholder='Total' name='total' defaultValue={props.formReceipt.total||''}/>
                <TextField disabled={props.edit} onChange={handleFormInput} placeholder='Lat' name='lat' value={props.formReceipt.lat||''}/>
                <TextField disabled={props.edit} onChange={handleFormInput} placeholder='Lng' name='lng' value={props.formReceipt.lng||''}/>
                <Button type='submit' variant='contained' id='submit-receipt'>Submit Receipt</Button>
            </form>
                       
        </div>
    )

}


