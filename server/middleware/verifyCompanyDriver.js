module.exports=(req,res,next)=>{
    const {user}=req.session
    console.log(req.params)
    const{company_id,driver_d_id}=req.params   
    if(!req.session.user){
        res.status(404).send('Please Login first')
    }
    else if(user.id !== +company_id && user.d_id !== +driver_d_id){
        res.status(403).send('Not allowed')
    }
    
   else {
        next()
    }    
}