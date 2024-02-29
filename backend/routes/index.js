const express= require('express');
const app= express();
const userRouter = require('../routes/user')
const router=express.Router();

router.use('/user',userRouter)


module.exports =router;                                 

