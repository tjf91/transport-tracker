import React from 'react'
import { connect } from 'react-redux'
import DriverDisplay from '../DriverDisplay/DriverDisplay'
import TripDisplay from '../TripsDisplay/TripsDisplay'

function Home(props){

    return(
        <main>
               {
                   props.id&&
                   <div>
                        <DriverDisplay/>
                        <TripDisplay />
                   </div>
               }
               {
                   props.d_id&&
                   <div>                        
                        <TripDisplay />
                   </div>
               }
        </main>
    )
}
function mapStateToProps(reduxState){
    return reduxState
}
export default connect(mapStateToProps)(Home)