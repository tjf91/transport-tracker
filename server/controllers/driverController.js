    const bcrypt=require('bcryptjs')    


module.exports={
    getDrivers:async(req,res)=>{
        const db = req.app.get('db')        
        const {company_id}=req.params        
        const {q}=req.query
        console.log(q)
        if(q){
            console.log('query')
            const [location] = await db.users.getDriverLocation([+q])
            const [profile_pic]=await db.users.getDriverPic([+q])
            return res.status(200).send([location,profile_pic])
        }
        else{
            console.log('normal')
            const Drivers=await db.users.getDrivers([+company_id])        
           return res.status(200).send(Drivers)

        }
    },
    addDriver:async(req,res)=>{
        const db = req.app.get('db')
        const {company_id}=req.params        
        const {name,phone_number,email,password}=req.body
        const [existingUser]= await db.users.checkUser([name])
        if(existingUser)return res.status(409).send("Username is taken, please find alternative")
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password,salt)
        //this query returns the created driver's id for inserting in the company_driver relationship table
        const [driverId]=await db.users.addDriver([name,phone_number,email,hash])   
        //company_driver relationship table add        
        await db.users.addCompanyDriver([+company_id,+driverId.d_id])

        const Drivers=await db.users.getDrivers([+company_id]) 
        res.status(200).send(Drivers)
        
    },
    editDriver:async(req,res)=>{
        const db = req.app.get('db')
        const {company_id,driver_d_id}=req.params
        const{name,phone_number,email,password,lng,lat,url}=req.body
        const {q}=req.query
        console.log(req.body)
        if(q==='location'){
            console.log([lat,lng])
            const [driver]=await db.users.addDriverLocation([lng,lat,driver_d_id])
            return res.status(200).send(driver)
        }
        if(q==='profile_pic'){
            console.log(url)
            await db.users.updateDriverProfilePic([url,driver_d_id])            
            return res.status(200).send(url)
        }
    },
    deleteDriver:async(req,res)=>{
        const db = req.app.get('db')
        const {company_id,driver_d_id}=req.params


    },
    //needed request to get name, and id of last company to set as default
    getDriverCompany:async(req,res)=>{
        const db= req.app.get('db')
        const {driver_d_id}=req.params
        const [lastCompany]= await db.users.getDriverCompany([driver_d_id])
        // ONLY ONE COMPANY PER DRIVER UNTIL THIS IS CHANGED
        res.status(200).send(lastCompany)
    }
}