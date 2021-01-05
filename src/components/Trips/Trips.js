import React from 'react'

export default function Trips (props){
    return(
        <div>
            {props.trip.name}
            {props.trip.date_start}
        </div>
    )
}