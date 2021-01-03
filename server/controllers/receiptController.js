module.exports={
    getCompanyReceipts:async(req,res)=>{
        const db=req.app.get('db')
        const{company_id}=req.params
        const receipts=await db.receipts.getCompanyReceipts([+company_id])
        res.status(200).send(receipts)
    },
    getDriverReceipts:async(req,res)=>{
        const db=req.app.get('db')
        const{driver_d_id}=req.params
        const receipts=await db.receipts.getDriverReceipts([driver_d_id])
        res.status(200).send(receipts)
    },
    getTripReceipts:async(req,res)=>{
        const db=req.app.get('db')
        const{company_id,driver_d_id,trip_id}=+req.params
        const receipts=await db.receipts.getTripReceipts([company_id,driver_d_id,trip_id])
        res.status(200).send(receipts)
    },
    addReceipt:async(req,res)=>{
        const db=req.app.get('db')
        const{trip_id}=req.params
        const{city,state,date_created,lat,lng,type,amount,total}=req.body
        const receipts=await db.receipts.addReceipt([city,state,date_created,lat,lng,type,amount,total,+trip_id])
        res.status(201).send(receipts)
    },
    editReceipt:async(req,res)=>{
        const db=req.app.get('db')
        const{trip_id,receipt_id}=req.params
        const{city,state,date_created,lat,lng,type,amount,total}=req.body
        const receipts=await db.receipts.editReceipt([city,state,date_created,lat,lng,type,amount,total,+trip_id,+receipt_id])
        res.status(200).send(receipts)
    },
    deleteReceipt:async(req,res)=>{
        const db=req.app.get('db')
        const{receipt_id}=req.params
        console.log('req',req.params)
        await db.receipts.deleteReceipt([+receipt_id])
        res.sendStatus(200)
    },
}