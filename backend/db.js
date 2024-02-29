const mongoose=require('mongoose');
 

mongoose.connect('mongodb+srv://mytuf8289:bElGZXrUA0lyf6yb@cluster0.pf4cvit.mongodb.net/payment-app').then((data)=>{console.log(data + " Connected to data base ");})

const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLength:4,
    maxLength:20,
    index: true
   },
   firstName:{
    type:String,
    required:true,
    trim:true,
   },
   lastName:{
    trim:true,
    type:String
   },
   password:{
   type:String,
   required:true,
   min:6
   }
})

const accountSchema=new mongoose.Schema({

    userId:{
        required:true,
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,

    },
    balance:{
        type:Number,
        required:true,
    }


})


const User=mongoose.model('User',userSchema);

const Account=mongoose.model('Account',accountSchema)

module.exports={
    User,Account
}
