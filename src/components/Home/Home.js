import React from 'react'
import { connect } from 'react-redux'
import DriverDisplay from '../DriverDisplay/DriverDisplay'
import TripDisplay from '../TripsDisplay/TripsDisplay'

function Home(props){

    return(
        <main>
            
               {
                   props.id&&
                   
                        <DriverDisplay/>                        
                   
               }
               {
                   props.d_id&&
                                          
                        <TripDisplay />
                   
               }
               
        </main>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(Home)