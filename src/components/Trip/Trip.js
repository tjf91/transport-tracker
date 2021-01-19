import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReceiptForm from '../Forms/ReceiptForm'
import moment from 'moment'
import MapboxGL from '../MapboxGL/MapboxGL'
import './Trip.scss'
import '../styles/styles.scss'
import Receipt from '../Receipt/Receipt'
import Pie from '../Charts/Pie'
import Bar from '../Charts/Bar'
import { GridLoader } from 'react-spinners'


function Trip (props){
    const [formToggle,setFormToggle]=useState(false)
    const [receipts,setReceipts]=useState([])
    const [driverPos,setDriverPos]=useState({lng:null,lat:null})
    const form={
        city:null,
        state:null,
        date_created:moment(new Date()).format("yyyy-MM-DD"),
        type:'gas',
        amount:null,
        total:null,
        lat:null,
        lng:null,
    }
    const [formReceipt, setFormReceipt]=useState(form)    
    //Company account get specific driver trips
    const getCompanyDriverTripReceipts=()=>{        
        axios.get(`/companies/${props.match.params.company_id}/trips/${props.match.params.trip_id}/receipts`)
        .then(res=>setReceipts(res.data))
        .catch(e=>console.log(e))        
    } 
    //Driver account get specific trips
    const getDriverTripReceipts=()=>{
        console.log(props.match)
        axios.get(`/drivers/${props.match.params.driver_d_id}/trips/${props.match.params.trip_id}/receipts`)
        .then(res=>{
            console.log(res.data)
            setReceipts(res.data)})
        .catch(e=>console.log(e))        
    }
    //conditional function to use appropriate call depending on account level
    const getTrips=()=>{
         
        if(props.id){
            console.log('getting company driver receipts')
            getCompanyDriverTripReceipts()
        }
        else{
            
            getDriverTripReceipts()
        }
    }

    const addReceipt=(receipt)=>{
        if(props.id){
            axios.post(`/companies/${props.id}/trips/${props.match.params.trip_id}/receipts`,receipt)
            .then(res=>setReceipts([...receipts,res.data]))
            .catch(e=>console.log(e))
            setFormReceipt(form)            
            getTrips()
        }
        else{
            axios.post(`/drivers/${props.d_id}/trips/${props.match.params.trip_id}/receipts`,receipt)
            .then(res=>setReceipts([...receipts,res.data]))
            .catch(e=>console.log(e))
            setFormReceipt(form) 
            getTrips()
        }
    }
    
  

    useEffect(()=>{
        if(props.id||props.d_id)
        getTrips()                      
    },[])
    
    const handleFormToggle=()=>{        
        setFormToggle(!formToggle)}
    
    const mappedReceipts=receipts.map((receipt,index)=>{
        const editReceipt=()=>{
            
             axios.put(`/companies/${receipt.company_id}/drivers/${receipt.driver_d_id}/trips/${receipt.trip_id}/receipts/${receipt.id}`, formReceipt)
             .then(res=>{
                 setReceipts(res.data)
                 //update trips
                 console.log(res.data)
                 setFormReceipt(form)
                 getTrips()
             })
             .catch(e=>console.log(e))
         }
         const deleteReceipt=()=>{
            axios.delete(`/companies/${receipt.company_id}/drivers/${receipt.driver_d_id}/trips/${receipt.trip_id}/receipts/${receipt.id}`)
            .then(res=>{
                
                console.log(res.data)
                getTrips()
            })
            .catch(e=>console.log(e))
         }
        //  console.log(moment(receipt.date_created).format("yyyy-MM-DD"))
    return(
        <div>
            <Receipt             
            editReceipt={editReceipt}
            deleteReceipt={deleteReceipt}
            receipt={receipt}
            setReceipts={setReceipts}
            receipts={receipts}
            formReceipt={formReceipt}
            setFormReceipt={setFormReceipt}
            getTrips={getTrips}   
            setFormToggle={setFormToggle}
        date_created={moment(receipt.date_created).format("yyyy-MM-DD")}

            />
        </div>
      
    )    
    })
    
   
    return(
        <div className='trip-display'>
            <img key={Date.now()} src={props.profile_pic } className='profile-pic'   alt=''/>
            <button onClick={handleFormToggle}>Add Receipts</button>
            <button>Edit Trip</button>
            {
                formToggle&&
                <ReceiptForm
                formReceipt={formReceipt}
                setFormReceipt={setFormReceipt}
                receipts={receipts}
                addReceipt={addReceipt}
                setFormToggle={setFormToggle} 
                    />                    
            } 
            
            <MapboxGL
            formReceipt={formReceipt}
            setFormReceipt={setFormReceipt}
            receipts={receipts} 
            d_id={props.d_id}
            />            
            <div className='pie-chart'>
            <Pie receipts={receipts}
            margin={{ top: 30, right: 0, bottom: 30, left: 0 }}/>
            </div>
            <div className='bar-chart'>
            <Bar 
            company_id={props.match.params.company_id}
            driver_d_id={props.match.params.driver_d_id}
            trip_id={props.match.params.trip_id}
            receipts={receipts}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            />
            </div>
            {mappedReceipts}             
        </div>
    )
    }

function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(withRouter(Trip))