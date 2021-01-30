import React, { useState } from 'react'
import Moment from 'react-moment'
import ReceiptForm from '../Forms/ReceiptForm'
// import editPencil from '../imgs/favpng_icon-design-editing-iconfinder-icon.png'
// import deleteIcon from '../imgs/favpng_button-checkbox.png'
import './Receipt.scss'


export default function Receipt (props){
    // const [formReceipt,setFormReceipt]=useState({...props.receipt,date_created:moment(props.receipt.date_created).format("yyyy-MM-DD"),lat:props.receipt.lat||props.formReceipt.lat,lng:props.receipt.lng||props.formReceipt.lng})
    const [editToggle, setEditToggle]=useState(false) 

    // const editReceipt=(receipt)=>{
    //    console.log('edit button',receipt) 
    //     axios.put(`/companies/${receipt.company_id}/drivers/${receipt.driver_d_id}/trips/${receipt.trip_id}/receipts/${receipt.id}`, receipt)
    //     .then(res=>{
    //         props.setReceipts([...props.receipts])
    //         //update trips
    //         props.getTrips()
    //     })
    //     .catch(e=>console.log(e))
    // }

    console.log('this is form receipt',props.date_created)
    return (
        <div className='receipts'>
        <p> 
        <Moment format="MM/DD/YYYY">                
        {props.receipt.date_created}
        </Moment>
        <br/>
            {props.receipt.type}
        </p>            
        <p>{props.receipt.city}, {props.receipt.state}</p>
        <p>
         ${props.receipt.total}
        </p>
            <div>
                    {editToggle&&
                    <ReceiptForm
                    formReceipt={props.receipt}
                    date_created={props.date_created}
                    setFormReceipt={props.setFormReceipt}
                    edit={true}
                    setEditToggle={setEditToggle}
                    editReceipt={props.editReceipt}
                    // receipts={receipts}
                    // addReceipt={addReceipt}
                    // setFormToggle={setFormToggle}
                    />
                }
                </div>
        
                <img onClick={()=>{
                    props.setFormToggle(false)
                    setEditToggle(!editToggle)}} src='https://persona-project.s3-us-west-1.amazonaws.com/favpng_icon-design-editing-iconfinder-icon.png' className='action-img' alt=''/>
                    <br />
                <img onClick={()=>{ 
                    window.confirm('You sure about erasing this receipts')&&
                    props.deleteReceipt()
                    }
                    }           
                    src='https://persona-project.s3-us-west-1.amazonaws.com/favpng_button-checkbox.png' className='action-img' alt=''/>
      
    </div>
    )
}