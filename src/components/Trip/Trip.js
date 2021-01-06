import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReceiptForm from '../Forms/ReceiptForm'
import MapboxGL from '../MapboxGL/MapboxGL'

function Trip (props){
    const [formToggle,setFormToggle]=useState(false)
    const [receipts,setReceipts]=useState([])   
    const getDriverTripReceipts=()=>{
        console.log(props.match)
        axios.get(`/drivers/${props.d_id}/trips/${props.match.params.trip_id}/receipts`)
        .then(res=>setReceipts(res.data))
        .catch(e=>console.log(e))
        console.log(receipts)
    }
    const addReceipt=(receipt)=>{
        if(props.id){
            axios.post(`/companies/${props.id}/trips/${props.match.params.trip_id}/receipts`,receipt)
            .then(res=>setReceipts([...receipts,res.data]))
            .catch(e=>console.log(e))
        }
        else{
            axios.post(`/drivers/${props.d_id}/trips/${props.match.params.trip_id}/receipts`,receipt)
            .then(res=>setReceipts([...receipts,res.data]))
            .catch(e=>console.log(e))
        }
    }

    const getCompanyDriverTripReceipts=()=>{
        console.log(props.match)
        axios.get(`/companies/${props.id}/trips/${props.match.params.trip_id}/receipts`)
        .then(res=>setReceipts(res.data))
        .catch(e=>console.log(e))
        console.log(receipts)
    } 
    useEffect(()=>{
        if(props.id){
            getCompanyDriverTripReceipts()
        }
        else{
            getDriverTripReceipts()
        }        
    },[])
    
    const handleFormToggle=()=>{        
        setFormToggle(!formToggle)}
    
    return(
        <div>
            <button onClick={handleFormToggle}>Add Receipts</button>
            {
                formToggle&&
                <ReceiptForm
                receipts={receipts}
                addReceipt={addReceipt}
                setFormToggle={setFormToggle} 
                    />
                    
            } 
            Hello
            <MapboxGL />      
            {JSON.stringify(receipts)}               
        </div>
    )
    }

function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(Trip))