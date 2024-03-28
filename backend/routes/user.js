const express = require('express');
 const  router=express.Router();
 const z=require('zod')
 const { User,Account }=require('../db')
 const jwt=require('jsonwebtoken')
 const { JWT_SECRET }=require('../config')
 const authMiddleware =require('../middleware');
const { jwtDecode } = require('jwt-decode');
 
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
if(existingUser){
    return res.status(411).json({
        message:"User already exists"
    })
}


const user =await User.create( {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password:req.body.password
})

const userId=user._id;

 await Account.create({
           userId,
           balance:1 + Math.random() * 50000 
   })


const token=jwt.sign({
    userId
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
      return  res.status(411).json({
            message:"error while signing in"
        })
    
    }

    const existingUser = await User.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }
    )


    if(existingUser){
        const token = jwt.sign({
            userId:existingUser._id
        },JWT_SECRET)
    
        return  res.status(200).json({
                message:"successlly logged in ",
                token:token
             })

          
    }
  

    res.status(411).json({
        message:"wrong Password or email"
    })
})

const updateBody=z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})

router.put('/',authMiddleware, async(req, res) =>{
        
    const { success }=updateBody.safeParse(req.body)
  
    if(!success){
        return   res.status(411).json({
            message:"error while updating information "
        })
       
    }
try {
 await User.updateOne({_id:req.userId},
    req.body 
    )
    
 res.json({
    success:"Updated successfully"
 }) 
} 
catch (error){
res.status(500).json({
    message:"Interal Server Error"
})
}  
})

router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter || "";
 
 
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            },
        },
            {
            lastName:{
                "$regex":filter
            }
        }
        ]
    })
    res.status(200).json({
        users:users.map(user=>(
            {
           username: user.username,
           firstName:user.firstName,
           lastName:user.lastName,
           _id:user._id
            }
        ))
    })


})

router.get('/me',async (req,res)=>{
    const token=req.headers.authorization

    if(token){
        try{
            const stringToken=JSON.stringify(token)
            const decodedToken=jwtDecode(stringToken)
            const user=await User.findById(decodedToken.userId)
           
            if(user){
                res.status(200).json({
                    username:user.username,
                    firstName:user.firstName
                })


            }
            else{
                res.status(404).json({ message: "User not found" });
            }
            
        }catch(err){
            console.log("Cannot get the user"+err)
        }
    }else{
        res.status(401).json({ message: "User is not logged in" });
    }
})


module.exports = router
