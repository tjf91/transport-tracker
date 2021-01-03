module.exports=(req,res,next)=>{  
    // console.log(req.session.user)
    // console.log(req.params)  
    if(!req.session.user){
        res.status(404).send('Please Login first')
    } 
    else if(req.session.user.d_id !== +req.params.driver_d_id){
        res.status(403).send('You can only view your content, driver')
    }               
    
    else{
        next()
    }    
}