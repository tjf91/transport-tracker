const bcrypt=require('bcryptjs')
module.exports={
    register:async(req,res)=>{
        const db = req.app.get('db')
        const {name,phone_number,email,password}=req.body
        const [existingCompany]=await db.users.checkCompany([name])
        const [existingDriver]=await db.users.checkDriver([name])
        const existingUser=existingCompany||existingDriver              
        if(existingUser)return res.status(409).send('Company/Driver by that name already exists')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newCompany]=await db.users.addCompany([name,phone_number,email,hash])
        delete newCompany.hash
        req.session.user=newCompany
        res.status(200).send(newCompany)    
    },
    login:async(req,res)=>{
        const db = req.app.get('db')
        const {name,password}=req.body
        const [existingCompany]=await db.users.checkCompany([name])        
        const [existingDriver]=await db.users.checkDriver([name])        
        const userFound=existingCompany||existingDriver  
        if(!userFound) return res.status(404).send('No Company or Driver by that name found')
        const isAuth=bcrypt.compareSync(password,userFound.hash)
        if(!isAuth)return res.status(403).send('Incorrect Password')
        delete userFound.hash
        req.session.user=userFound
        res.status(200).send(userFound)

    },
    logout:(req,res)=>{
        req.session.destroy()
        res.sendStatus(200)
    },
    getUserSession:(req,res)=>{
        if(req.session.user)res.status(200).send(req.session.user)
        else res.status(404).send("No session found")
    },
}