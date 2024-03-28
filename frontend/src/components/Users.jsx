import React, { useEffect, useState } from 'react'
import axios from 'axios';
import  {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import Button from './Button'

const Users = () => {
    const [users,setUsers]=useState([])
    const [filter,setFilter]=useState("")
  
    // To get Current User Id
    const currentToken=localStorage.getItem('token')
    const decodedToken=jwtDecode(currentToken);
    const currentUser=decodedToken.userId

    useEffect(()=>{

         axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((response)=>{
            const filteredUsers = response.data.users.filter(user => user._id !== currentUser);
            setUsers(filteredUsers)
         }) 
    },[filter])
  return (
    
      <div className='flex flex-col gap-2'>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />

        <div><h1
        
        className='text-2xl font-bold'>Send to</h1></div>
        <div>
            <input type="text"
            onChange={(e)=>{
                setFilter(e.target.value)
            }}
            placeholder='Search users'
            className='w-full px-2 py-1 border rounded border-slate-300'
            />
        </div>
        <div>
            {users.map(user =>
                <User user={user} />
            )}
        </div>
      </div>

  )
}

function User({user}){

    const navigate=useNavigate();
    return <div className="flex justify-between">
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 text-center flex justify-center mt-1 mr-2">
            <div className="flex flex-col pb-1 text-center justify-center h-full text-xl">
                {user.firstName[0].toUpperCase()}  
            </div>
        </div>
        <div className="flex flex-col capitalize justify-center h-ful">
            <div>
                {user.firstName } {user.lastName}
            </div>
        </div>
    </div>

    <div className="flex flex-col justify-center h-ful">
        <Button
        onClick={()=>{
           navigate("/send?id=" + user._id + "&name=" + user.firstName)
        }}
        label={"Send Money"} />
    </div>
</div>
}

export default Users
