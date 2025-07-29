import React, { useState } from 'react';
import { User, Menu, X, CheckSquare } from 'lucide-react';
import Logo from "../assets/tfLogo.png"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {/* <CheckSquare className="h-8 w-8 text-blue-600" /> */}

              <img src={Logo} alt="" className='h-13 w-15'/>
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-150 ease-in-out">
              Home
            </a>
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-150 ease-in-out">
              Features
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition duration-150 ease-in-out">
              About
            </a>
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-150 ease-in-out">
              Contact
            </a>
            <a href="/todo" className="text-gray-700 hover:text-blue-600 font-medium transition duration-150 ease-in-out">
              Tasks
            </a>
          </div>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* {!isLoggedIn ? ( */}
              <>
              <a href="/login">

                <button 
                  // onClick={() => setIsLoggedIn(true)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </a>
              <a href="/signup">
                <button 
                  // onClick={() => setIsLoggedIn(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>

              </a>
              </>
            {/* ) : ( */}
              {/* <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-700 hover:text-red-600 font-medium transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div> */}
            {/* )} */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Navigation Links */}
              <a href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Home
              </a>
              <a href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Features
              </a>
              <a href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                About
              </a>
              <a href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Contact
              </a>

              {/* Mobile Authentication */}
              <div className="border-t border-gray-200 pt-4 pb-3">
                {/* {!isLoggedIn ? ( */}
                  <div className="space-y-2 px-3">
                   <a href="/login">
                    <button 
                      // onClick={() => setIsLoggedIn(true)}
                      className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      Login
                    </button>
                   </a>
                   <a href="/signup">
                   
                    <button 
                      // onClick={() => setIsLoggedIn(true)}
                      className="w-full px-3 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Sign Up
                    </button>
                   
                   </a>
                  </div>
                {/* ) : ( */}
                  {/* <div className="px-3">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">John Doe</div>
                        <div className="text-sm text-gray-500">john@example.com</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div> */}
                {/* )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;