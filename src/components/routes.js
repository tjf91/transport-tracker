import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from '../components/Home/Home'

import TripsDisplay from './TripsDisplay/TripsDisplay'
 


export default (
    <Switch>        
        <Route exact path='/:name' component={Home}/>
        <Route exact path='/:company_name/:driver_d_id/trips' component={TripsDisplay} />     
    </Switch>
)