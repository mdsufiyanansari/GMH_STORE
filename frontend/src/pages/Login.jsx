import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // default home

  // ----------------- REDIRECT IF ALREADY LOGGED IN -----------------
  if (token) {
    return <Navigate to={from} replace />; // login ke baad original page ya "/" redirect
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          backendUrl + "/api/user/register",
          { name, email, password }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + "/api/user/login",
          { email, password }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-md rounded-2xl p-10 w-full max-w-md space-y-6 mb-52 border border-gray-200"
      >
        <div className="text-center mb-6">
          <p className="text-3xl font-extrabold text-black">{currentState}</p>
          <hr className="mt-2 border-black" />
        </div>

        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            className="w-full border-b border-black bg-transparent py-3 px-2 text-black placeholder-black focus:outline-none focus:border-black"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="w-full border-b border-black bg-transparent py-3 px-2 text-black placeholder-black focus:outline-none focus:border-black"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
          type="password"
          placeholder="Password"
          className="w-full border-b border-black bg-transparent py-3 px-2 text-black placeholder-black focus:outline-none focus:border-black"
        />

        <div className="flex justify-between items-center text-sm text-black mt-2">
          <p className="cursor-pointer hover:underline">Forgot Password?</p>
          {
            currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer font-semibold hover:underline">Create Account</p>
              : <p onClick={() => setCurrentState('Login')} className="cursor-pointer font-semibold hover:underline">Login Here</p>
          }
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:bg-gray-900 transition-colors mt-4"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
