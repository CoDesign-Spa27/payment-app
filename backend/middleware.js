const express=require('express')
const jwt=require('jsonwebtoken')
const JWT_SECRET=require('./config')
 function authMiddleware(req, res, next) {

    const authHeader=req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message:"invalid authorization header"
        })
    }
    const token=authHeader.replace("Bearer ", "")
    if(!token) {
        return res.status(401).json({
            message:"Authrization token not Found"
        })
    }

  try{
    const decoded=jwt.verify(token,JWT_SECRET)

    if(decoded.userId){
    req.userId=decoded.userId
    next();
    }
    else{
        return res.status(500).json({
            message:"User Id not found"
    
        })
    }
  }
  catch{(err)=>{
    return res.status(500).json({
        message:"Authentication Failed"

    })
  }}



}

module.exports= authMiddleware;
