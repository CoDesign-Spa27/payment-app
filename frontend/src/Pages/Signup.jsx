import React, { useState } from 'react'
import  axios from 'axios'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
const Signup = () => {
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
 
  const handleSignUp =async(e)=>{
    e.preventDefault()
try{
  const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
    username,
    firstName,
    lastName,
    password
  })
 
  const { token }=response.data
  
  localStorage.setItem('token', token);
}
catch(err){
  console.log(err)
}
  
  
  
  }
  return (
    <div className='bg-gray-400 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'> 
<div 
className='w-96 bg-white p-10 rounded-lg text-center flex flex-col gap-3'
>
        <Heading  label={"Sign up"}/>
        <SubHeading label={"Enter your details to access the CodePay"} />
        <InputBox 
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        label={"First name"} placeholder={"Enter your first name"} />
      <InputBox
         onChange={(e)=>{
          setLastName(e.target.value)
        }}
      label={"Last name"} placeholder={"Enter your last name"}/>
      <InputBox
         onChange={(e)=>{
          setUsername(e.target.value)
        }}
      label={"Email"} placeholder={"Enter your Email"} />
      <InputBox 
         onChange={(e)=>{
          setPassword(e.target.value)
        }}
      label={"Password"} placeholder={"Enter your password"} />
       <div className='mt-4'>
      <Button
      onClick={handleSignUp}


      label={"Sign up"} />
       </div>

      <BottomWarning label={"Already have an account?"} 
      buttonText={"Sign in"}
      to={"/signin"}
      />

</div>
        </div> 
      
    </div>
  )
}

export default Signup
