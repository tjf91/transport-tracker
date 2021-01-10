import { ResponsivePie } from "@nivo/pie"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import './Pie.scss'


function Pie(props){   
    const [state,setState]=useState(null)
    
    const handleData=(input)=>({
        'id':input.type,
        'value':input.sum,
        'color':function(){
            let colors={
                'gas': "hsl(240, 70%, 50%)",
                'repair': "hsl(13, 70%, 50%)",
                'tires': "hsl(213, 70%, 50%)",
                'food': "hsl(240, 70%, 50%)",
              }
              
              switch(input.type){
                    case 'gas':
                     return colors['gas']
                    case 'repair':
                        return colors['repair']
                    case 'tires':
                        return colors['tires']
                    case 'food':
                        return colors['food']
                    default:
                        return  "hsl(213, 70%, 50%)"
                  }
        }     
    })

    useEffect(()=>{        
        axios.get(`/companies/${props.match.params.company_id}/drivers/${props.match.params.driver_d_id}/trips/${props.match.params.trip_id}/receipts?q=tripTypeTotal`)
        .then(res=>{
            setState(res.data.map(receipt=>handleData(receipt)))            
            console.log("chart data from state",state)})
        .catch(e=>console.error(e.response.data))

    },[props.receipts])
    if(!state){
        
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
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor={{ from: 'color', modifiers: [] }}
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#33333"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: "#81ae19",
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 1,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color:  "#f1e15b",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    },
                    {
                        id: 'squares',
                        type: 'patternSquares',
                        background: "#f47560",
                        color: 'rgba(255, 255, 255, 0.3)',
                        
                    },
                    {
                        id: 'dots2',
                        type: 'patternDots',
                        background: "#61cdbb",
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 2,
                        padding: 1,
                        stagger: true
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'gas'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'tires'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'food'
                        },
                        id: 'dots2'
                    },
                    {
                        match: {
                            id: 'repair'
                        },
                        id: 'squares'
                    }                    
                ]}  
                
                        
            />
        </div>
)
    }       
    }
    export default withRouter(Pie)