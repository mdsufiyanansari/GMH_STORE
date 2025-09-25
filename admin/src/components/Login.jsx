import axios from "axios"
import React, { useState } from 'react';
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {

   
    
    const [email,setEmail] =useState("")
    const [password,setPassword]= useState("")
    const onSubmitHandler = async (e) =>{
        try {
            
            e.preventDefault();
            const response = await axios.post(backendUrl + "/api/user/admin", {email,password})
            if (response.data.success){
               setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-black underline-offset-4  underline ">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 ">
            <p className="text-sm font-medium mb-1 text-black">Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-0 py-2 border-b border-black focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <p className="text-sm font-medium mb-1 text-black">Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-0 py-2 border-b border-black focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
