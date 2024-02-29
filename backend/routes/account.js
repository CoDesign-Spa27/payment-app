const express=require('express');
const router =express.Router();
const { Account }=require('../db'); 
const authMiddleware = require('../middleware');

router.get('/balance' ,authMiddleware,async(req,res)=>{
  
    const account=await  Account.findOne({
        userId:req.userId
    })

    res.json({
        balance:account.balance
    })
})
 
router.post('/transfer',authMiddleware,async(req,res)=>{
  
    const {amount,to}=req.body;

    const account =await Account.findOne({
        userId:req.userId
    })
       
    if(account.balance < amount){
      return res.status(400).json({
            message:"Insufficient funds"
        })
    }

    const toAccount =await Account.findOne({
        userId:to
    })

    if(!toAccount){
        return res.status(400).json({
            message:"Account not found"
        })
    }

    await Account.update({
       userId:req.userId 
    },
    {
     $inc:{
        balance:-amount
     }   
    }
    )

    await Account.update({
        userId:to
    },
    {
        $inc:{
            balance:amount
        }
    })
   res.status(200).json({
    message:"Transaction Successful"
   })
    



})


module.exports=router;