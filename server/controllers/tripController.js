module.exports={
    getCompanyTrips:async(req,res)=>{
        const db = req.app.get('db')        
        const {company_id}=req.params        
        const trips=await db.trips.getCompanyTrips([+company_id])
        res.status(200).send(trips)
    },
    getCompanyDriverTrips:async(req,res)=>{
        const db = req.app.get('db')        
        const {company_id,driver_d_id}=req.params        
        const trips=await db.trips.getCompanyDriverTrips([+company_id,+driver_d_id])
        res.status(200).send(trips)
    },
    getDriverTrips:async(req,res)=>{
        const db = req.app.get('db')        
        const {driver_d_id}=req.params             
        const trips=await db.trips.getDriverTrips([+driver_d_id])
        res.status(200).send(trips)
    },
    addTrip:async(req,res)=>{
        const db = req.app.get('db')
        const {company_id,driver_d_id}=req.params
        const {name,date_start,date_end,total_spent,status}=req.body
        const trips=await db.trips.addTrip([name,date_start,date_end,total_spent,+company_id,+driver_d_id,status])
        res.status(201).send(trips)
    },
    editTrip:async(req,res)=>{
        const db = req.app.get('db')
        const {trip_id}=req.params
        const {name,date_start,date_end,total_spent}=req.body
        const trips=await db.trips.editTrip([name,date_start,date_end,total_spent,+trip_id])
        res.status(201).send(trips)
    },
    deleteTrip:async(req,res)=>{
        const db = req.app.get('db')
        const {trip_id}=req.params
        await db.trips.deleteTrip([+trip_id])
        res.sendStatus(200)
    },
    //need function to get driver and company id from trip
    getTripsDriverCompany:async(req,res)=>{

    }
}