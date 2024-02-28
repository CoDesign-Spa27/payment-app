const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://mytuf8289:bElGZXrUA0lyf6yb@cluster0.pf4cvit.mongodb.net/payment-app').then((data)=>{console.log(data + " Connected to data base ");})

const userSchema=new mongoose.Schema({
   username:{
    type:'string',
    required:true,
    unique:true,
    trim:true,
    minLength:4,
    maxLength:20,
    index: true
   },
   firstName:{
    type:'string',
    required:true,
    trim:true,
   },
   lastName:{
    trim:true,
    type:'string'
   },
   password:{
   type:'string',
   required:true,
   min:6
   }
})

const User=mongoose.model('User',userSchema);
module.exports={
    User
}

