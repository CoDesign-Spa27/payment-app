const express=require('express');

const router =express.Router();
const  authMiddleware  = require('../middleware');
const { Account } = require('../db');


router.get('/balance' ,authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({
                message: 'Account not found for the user',
            });
        }

        res.json({
            balance: account.balance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unexpected error occurred',
        });
    }
});

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

    await Account.updateOne({
       userId:req.userId 
    },
    {
     $inc:{
        balance:-amount
     }   
    }
    )

    await Account.updateOne({
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