import { ResponsivePie } from "@nivo/pie"
import React, { useEffect, useState } from "react"
import './Pie.scss'


export default function Pie(props){   
    const [state,setState]=useState(null)
    
    const handleData=(input)=>({
        'id':input.type,
        'value':input.total
    })

    useEffect(()=>{
        setState(props.receipts.map(receipt=>handleData(receipt)))
    },[props.receipts])
    if(!props.receipts){
        
        return(
            <div>Loading</div>
        )
    }
    else{             
    return(        
        <div className='pie-chart'>  
            
            <ResponsivePie
                data={state}
                margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"  
                        
            />
        </div>
)
    }       
    }
    