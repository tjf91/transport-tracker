require('dotenv').config()
const express = require('express')
const app=express()
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const driverCtrl = require('./controllers/driverController')
const tripCtrl = require('./controllers/tripController')
const receiptCtrl = require('./controllers/receiptController')
const verifyCompanyDriver=require('./middleware/verifyCompanyDriver')
const verifyCompany=require('./middleware/verifyCompany')
const verifyDriver=require('./middleware/verifyDriver')
const s3Ctrl = require('./controllers/s3Controller')
const path=require('path')


const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET}=process.env

app.use(express.json())

app.use( express.static( `${__dirname}/../build` ) );

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(
    session({
        resave:false,
        saveUninitialized:true,
        secret:SESSION_SECRET,
        cookie:{maxAge:1000*60*60*24*30}
    })
)


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUserSession)

app.get('/companies/:company_id/drivers',verifyCompany,driverCtrl.getDrivers)
app.post('/companies/:company_id/drivers',verifyCompany,driverCtrl.addDriver)
//used for location update
app.put('/drivers/:driver_d_id', verifyDriver, driverCtrl.editDriver)

//endpoint used for profile pic update
app.put('/companies/:company_id/drivers/:driver_d_id',verifyCompanyDriver,driverCtrl.editDriver)
// app.delete('/companies/:company_id/drivers/driver_d_id',driverCtrl.deleteDriver)

// app.get('/companies/:company_id/trips',verifyCompany,tripCtrl.getCompanyTrips)
app.get('/companies/:company_id/drivers/:driver_d_id/trips',verifyCompanyDriver,tripCtrl.getCompanyDriverTrips)
app.get('/drivers/:driver_d_id/trips',verifyDriver,tripCtrl.getDriverTrips)
app.get('/drivers/:driver_d_id/companies',verifyDriver,driverCtrl.getDriverCompany)

app.post('/companies/:company_id/drivers/:driver_d_id/trips',verifyCompanyDriver,tripCtrl.addTrip)
app.put('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id',verifyCompanyDriver,tripCtrl.editTrip)
app.delete('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id',verifyCompanyDriver,tripCtrl.deleteTrip)

app.get('/companies/:company_id/trips/:trip_id/receipts',verifyCompany,receiptCtrl.getCompanyDriverTripReceipts)
app.get('/drivers/:driver_d_id/trips/:trip_id/receipts',verifyCompanyDriver,receiptCtrl.getDriverTripReceipts)
app.post('/companies/:company_id/trips/:trip_id/receipts',verifyCompany,receiptCtrl.addCompanyTripReceipt)
app.post('/drivers/:driver_d_id/trips/:trip_id/receipts',verifyDriver,receiptCtrl.addDriverTripReceipt)

app.put('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id/receipts/:receipt_id',verifyCompanyDriver,receiptCtrl.editReceipt)
app.delete('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id/receipts/:receipt_id',verifyCompanyDriver,receiptCtrl.deleteReceipt)
app.get('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id/receipts',verifyCompanyDriver,receiptCtrl.getChartReceipts)
// app.get('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id/receipts',receiptCtrl.getTripReceipts)

// app.post('/companies/:company_id/drivers/:driver_d_id/trips/:trip_id/receipts',verifyCompanyDriver,receiptCtrl.addReceipt)

app.get('/api/s3',s3Ctrl.s3)


massive({
    connectionString:CONNECTION_STRING,
    ssl:{rejectUnauthorized:false}
})
.then(db=>{
    app.set('db',db)
    console.log("Database connected")
    app.listen(SERVER_PORT,()=>console.log(`Server listening on ${SERVER_PORT}`))
})
.catch(e=>console.log(e))
