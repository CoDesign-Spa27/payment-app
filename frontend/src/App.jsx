import { Routes,Route, Navigate } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Send from './Pages/Send';
import Sent from './Pages/Sent';
import Failed from './Pages/Failed';
import { useState,useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


function App() {
 

  return (
   
    <Routes>

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<Send />} />
      <Route path="/sent" element={<Sent />} />
      <Route path="/failed" element={<Failed />} />
      
      </Routes>
   
  )
}

export default App
