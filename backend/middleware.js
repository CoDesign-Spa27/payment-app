const express=require('express')
const jwt=require('jsonwebtoken')
const { JWT_SECRET }=require('./config')
 function authMiddleware(req, res, next) {

    const authHeader=req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message:"invalid authorization header"
        })
        
    }
    const token=authHeader.split(' ')[1];

  try{
    const decoded=jwt.verify(token, JWT_SECRET)

    req.userId=decoded.userId
    next();

  }
  catch{(err)=>{
    return res.status(500).json({
        message:"Authentication Failed"

    })
  }}



}

module.exports=  authMiddleware 
