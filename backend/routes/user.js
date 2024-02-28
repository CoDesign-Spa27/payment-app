const express = require('express');
 const  router=express.Router();
 const z=require('zod')
 const { User }=require('../db')
 const jwt=require('jsonwebtoken')
 const  JWT_SECRET=require('../config')
 const authMiddleware=require('../middleware')
 
router.use(express.json())
 
 
const signUpBody =z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string().min(6)
})

router.post("/signup",async (req, res) => {
 
const { success }=signUpBody.safeParse(req.body)

if(!success) {
    return res.status(411).json({
        message:"email already taken or invalid inputs"
    })
}

const existingUser = await User.findOne(
    {
        username: req.body.username
    }
)
if(existingUser._id){
    return res.status(411).json({
        message:"User already exists"
    })
}

const newUser =await User.create( {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password:req.body.password
})
const token=jwt.sign({
    userId:newUser._id
},JWT_SECRET)

res.json({
    message:"User created successfully",
    token:token
})

})

//sign in route
const signInBody=z.object({
    username:z.string().email(),
    password:z.string().min(6)
})
router.post('/signin',async(req, res) => {
 
    const { success }=signInBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message:"error while signing in"
        })
    }

    const existingUser = await User.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }
    )


    if(!existingUser){
        res.status(411).json({
            message:"User does not exists"
        })
    }
    else{
        
    const token = jwt.sign({
        userId:existingUser._id
    },JWT_SECRET)

         res.status(200).json({
            message:"successlly logged in ",
            token:token
         })
    }

    res.status(411).json({
        message:"Error occured while signing in"
    })
})

router.put('/user',authMiddleware,(req, res, next) =>{
    
})
module.exports = router
