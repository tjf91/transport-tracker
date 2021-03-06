module.exports=(req,res,next)=>{    
    if(!req.session.user){
        res.status(404).send('Please Login first')
    }
    else if(req.session.user.d_id){
        res.status(403).send('Driver account not authorized for action')
    }
    else if(req.session.user.id !== +req.params.company_id){
        res.status(403).send('You can only view your own content')
    }
    else{
        next()
    }    
}