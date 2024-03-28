import React from 'react'
import { useLocation, useNavigate}from 'react-router-dom'
import Lottie from "lottie-react";
import successfull from '../assets/successfull.json'
import { CircleUserRound } from 'lucide-react';
import Button from '../components/Button'
import { IndianRupee } from 'lucide-react';
 
const Sent = () => {
const location=useLocation();
const receiver=location.state.receiverName
const amount=location.state.amount
const locale = 'en';
const today = new Date();
const navigate=useNavigate();

const goToDashboard=()=>{
  navigate('/dashboard');
}
 
const day = today.toLocaleDateString(locale, { weekday: 'long' });
const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });


  return (
    <div class='w-full h-screen flex justify-center items-center'>
     
    <div class=' bg-gray-200   flex flex-col items-center rounded-xl p-8'>
      <div class='w-16 my-4  h-16'>
        <Lottie animationData={successfull} loop={true}/>
      </div>
        <p className='flex text-2xl items-center'><IndianRupee />{amount. toLocaleString('en-IN')}</p>
      <h1 class='text-xl my-4 font-semibold text-center'>Transaction Successful!   
          </h1>
      <div class='flex flex-col md:gap-4 gmd:flex-row justify-between items-center'>
        <div class='flex items-center gap-2'>
          <CircleUserRound class='h-6 w-6' /> 
          <span class='text-lg md:text-base'>{receiver.toUpperCase()}</span>
        </div>
        <div class='text-sm md:text-base mt-4 md:mt-0'>
          {date} {time}  
        </div>
        <div className='mt-4 md:mt-0'>  
          
           <Button 
           onClick={goToDashboard}
           label={"Go to Dashboard"}/></div>
     
      </div>
     
    </div>
   
  </div>
  
  )
}

export default Sent
