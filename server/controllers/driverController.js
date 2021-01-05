    const bcrypt=require('bcryptjs')    


module.exports={
    getDrivers:async(req,res)=>{
        const db = req.app.get('db')        
        const {company_id}=req.params
        const Drivers=await db.users.getDrivers([+company_id])        
        res.status(200).send(Drivers)
    },
    addDriver:async(req,res)=>{
        const db = req.app.get('db')
        const {company_id}=req.params        
        const {name,phone_number,email,password}=req.body
        const [existingUser]= await db.users.checkUser([name])
        if(existingUser)return res.status(409).send("Username is taken, please find alternative")
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password,salt)
        const [driverId]=await db.users.addDriver([name,phone_number,email,hash])           
        await db.users.addCompanyDriver([+company_id,+driverId.d_id])
        const Drivers=await db.users.getDrivers([+company_id]) 
        res.status(200).send(Drivers)
        
    },
    editDriver:async(req,res)=>{

    },
    deleteDriver:async(req,res)=>{

    },
    getDriverCompany:async(req,res)=>{
        const db= req.app.get('db')
        const {driver_d_id}=req.params
        const [lastCompany]= await db.users.getDriverCompany([driver_d_id])
        // ONLY ONE COMPANY PER DRIVER UNTIL THIS IS CHANGED
        res.status(200).send(lastCompany)
    }
}