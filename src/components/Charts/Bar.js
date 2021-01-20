import {ResponsiveBar} from "@nivo/bar"
import axios from "axios"
import React, {useEffect, useState} from 'react'
import options from './options'
import f from './barFunctions'
import { GridLoader } from 'react-spinners'

export default function Bar(props){
    const[state,setState]=useState(null)

    useEffect(()=>{        
        axios.get(`/companies/${props.company_id}/drivers/${props.driver_d_id}/trips/${props.trip_id}/receipts?q=tripStateTypeTotal`)
        .then(res=>{
            console.log('bar',res.data) 
            //series of functions to get the data in the correct format to display on chart           
            const firstSort=res.data.map(receipt=>f.handleData(receipt))      
                
          const groupedStates = f.groupBy(firstSort);               
            let finalR=f.getStates(groupedStates)   
            setState(finalR)   
           
            })
        .catch(e=>console.error(e.response.data))

    },[props.receipts,props.trip_id])

    if(!state){
        return(
            <GridLoader />
        )
    }
    else{    

    return(
        <ResponsiveBar
        data={state}
        keys={[ 'gas', 'food', 'repair', 'tires']}
        indexBy='state'
        label={d => `${d.value}`}
        margin={props.margin}
        
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}      
        layout="horizontal"
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'total',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,            
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'value',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: -100,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={options.defs}
        fill={options.fill} 
    />
    )
}
}