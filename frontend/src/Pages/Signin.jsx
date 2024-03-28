import React, { useState } from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

  const navigate=useNavigate();
  const handleSignIn=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
        username:username,
        password:password
      })
          
    
  const { token }=response.data
  
  localStorage.setItem('token', token);
      
  navigate('/dashboard',{replace:true})

    }catch(err){
      console.error("Error Occured while signing in:"+err)

    }

  }
  return (
    <div className='bg-gray-400 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'> 
<div 
className='w-96 bg-white p-10 rounded-lg text-center flex flex-col gap-3'
>
        <Heading  label={"Sign In"}/>
        <SubHeading label={"Enter your details to access the CodePay"} />
      <InputBox 
      onChange={(e)=>setUsername(e.target.value)}
      label={"Email"} placeholder={"Enter your Email"} />
 
 <InputBox 
      onChange={(e)=>setPassword(e.target.value)}
      label={"Password"} placeholder={"Enter your Password"} />

       <div className='mt-4'>
      <Button label={"Sign in"} onClick={handleSignIn} />
       </div>

      <BottomWarning label={"Do not have an account?"} 
      buttonText={"Sign up"}
      to={'/signup'}
      />

</div>
        </div> 
      
    </div>
  )
}

export default Signin
