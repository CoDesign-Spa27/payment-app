import React, { useEffect, useState } from 'react'
import AppBar from '../components//AppBar'
import axios from 'axios'
import Balance from '../components/Balance'
import Users from '../components/Users'
import { useNavigate } from 'react-router-dom'
 
const Dashboard = () => {
  const [balance,setBalance]=useState("")
  const [name,setName]=useState("")
  const [profile,setProfile]=useState("")
 
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token not found");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      
        const response = await axios.get('http://localhost:3000/api/v1/user/me', config);
        setName(response.data.firstName);
        setProfile(response.data.firstName[0]);
      
   
     
      } catch (error) {
        console.error("Error getting user details:", error);
 
      }
    };

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token not found");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get("http://localhost:3000/api/v1/account/balance", config);
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchUserData();
    fetchBalance();
  }, []);
 
  


  return (

    <div>
      <AppBar username={name} profile={profile} />
      <div className="m-8">
            <Balance value={balance.toLocaleString('en-IN')} />
            <Users />
        </div>
     </div>
  )
}

export default Dashboard
