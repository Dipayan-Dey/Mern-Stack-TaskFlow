import React,{useEffect, useState} from 'react'
import { LogOut , CircleUser} from 'lucide-react';

import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const [user,setUser]=useState("")

useEffect(() => {
  const userData=JSON.parse(localStorage.getItem("todo-user"))

  setUser(userData && userData.user.fullname)

}, [])

const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("todo-user");

    // Optionally: clear other app state (if any)

    // Redirect to landing page
    navigate("/");
  };


  return (
    <div>
      
   <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Welcome message */}
      <div className="text-lg font-semibold text-gray-700">

    <span className='flex space-x-3'> <CircleUser size={32} />   Welcome, <span className="text-blue-600">{user}</span></span>
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex space-x-6 text-gray-600 font-medium">
        <li>
          <a
            href="/home"
            className="hover:text-blue-600 hover:underline transition duration-200"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/todo"
            className="hover:text-blue-600 hover:underline transition duration-200"
          >
            MyToDO List
          </a>
        </li>
      </ul>

      {/* Right: Logout button */}
      <a
        href="#"
        onClick={handleLogout}
        className="flex items-center space-x-1 text-white bg-red-500 px-3 py-1.5 rounded-md hover:bg-red-600 transition duration-200"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </a>
    </nav>

    </div>
  )
}

export default Home