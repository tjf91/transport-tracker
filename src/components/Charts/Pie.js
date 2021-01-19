import { ResponsivePie } from "@nivo/pie"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import './Pie.scss'
import options from './options'
import { GridLoader } from 'react-spinners'

function Pie(props){   
    const [state,setState]=useState(null)
    
    const handleData=(input)=>({
        'id':input.type,
        'value':input.sum,        
    })

    useEffect(()=>{        
        axios.get(`/companies/${props.match.params.company_id||props.company_id}/drivers/${props.match.params.driver_d_id||props.driver_d_id}/trips/${props.match.params.trip_id||props.trip_id}/receipts?q=tripTypeTotal`)
        .then(res=>{
            setState(res.data.map(receipt=>handleData(receipt)))            
            console.log("chart data from state",state)})
        .catch(e=>console.error(e.response.data))

    },[props.receipts,props.trip_id])
    if(!state){
        
        return(
            <GridLoader />
        )
    }
    else{             
    return(       
                      
            <ResponsivePie
                data={state}
                margin={props.margin}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}               
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor={{ from: 'color', modifiers: [] }}
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#33333"
                radialLabelsLinkDiagonalLength={props.radialLabelsLinkDiagonalLength}
                radialLabelsLinkHorizontalLength={props.radialLabelsLinkHorizontalLength}
                defs={options.defs}
                fill={options.fill}  
                
                        
            />
        
)
    }       
    }
    export default withRouter(Pie)