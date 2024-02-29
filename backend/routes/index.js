const express= require('express');
const app= express();
const userRouter = require('../routes/user')
const accountRouter = require('./account');
const router=express.Router();

router.use('/user',userRouter)
router.use('/account',accountRouter)

module.exports =router;                                 

