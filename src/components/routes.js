import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from '../components/Home/Home'
import Trip from './Trip/Trip'

import TripsDisplay from './TripsDisplay/TripsDisplay'
 


export default (
    <Switch>        
        <Route exact path='/:name' component={Home}/>
        <Route exact path='/:company_name/:driver_d_id/trips' component={TripsDisplay} /> 
        <Route exact path='/:company_id/:driver_d_id/trips/:trip_id' component={Trip} />    
    </Switch>
)