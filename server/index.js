require('dotenv').config()
const express = require('express')
const app=express()
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const driverCtrl = require('./controllers/driverController')
const tripCtrl = require('./controllers/tripController')
const receiptCtrl = require('./controllers/receiptController')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET}=process.env

app.use(express.json())
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
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUserSession)

app.get('/companies/:company_id/',driverCtrl.getDrivers)
app.post('/companies/:company_id/',driverCtrl.addDriver)
app.put('/companies/:company_id/',driverCtrl.editDriver)
app.delete('/companies/:company_id/',driverCtrl.deleteDriver)

app.get('/companies/:company_id/',tripCtrl.getTrips)
app.post('/companies/:company_id/',tripCtrl.addTrip)
app.put('/companies/:company_id/',tripCtrl.editTrip)
app.delete('/companies/:company_id/',tripCtrl.deleteTrip)

app.get('/companies/:company_id/',receiptCtrl.getReceipts)
app.post('/companies/:company_id/',receiptCtrl.addReceipt)
app.put('/companies/:company_id/',receiptCtrl.editReceipt)
app.delete('/companies/:company_id/',receiptCtrl.deleteReceipt)


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
