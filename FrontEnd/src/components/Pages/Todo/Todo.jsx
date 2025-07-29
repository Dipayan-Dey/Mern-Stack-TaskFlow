import React, { useEffect, useState,useRef } from "react";
import Logo from "../../../assets/tfLogo.png"
import {
  LogOut,
  CircleUser,
  Menu,
  X,
  Home,
  CheckSquare,
  Calendar,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Plus,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalComponent from "./Model";
// import getallTodo from "../"
// import getAllTodo  from "../../../../Services/TodoServices.js";

import { getallTodo } from "../../../../Services/TodoServices";
import Card from "./Card";
import Footer from "../../Footer";
// import { js } from '@eslint/js';
export const getUserFromLocalStorage = () => {
  // todonavigate=useNavigate()
  const item = JSON.parse(localStorage.getItem("todo-user"));

  if (!item) {
    return null;
  }

  const now = Date.now();

  if (now > item.expiry) {
    localStorage.removeItem("todo-user");
    // todonavigate("/")
    return null;
  }

  return item;
};

function Todo() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [data, setdata] = useState("");
  
  // NEW STATE VARIABLES FOR SEARCH AND FILTER
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filterType, setFilterType] = useState("All"); // State for filter type (All, Completed, Incomplete)
  const [filteredData, setFilteredData] = useState([]); // State for filtered and searched data

  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (!userData) {
      navigate("/");
      return;
    }

    setUser(userData && userData.user.fullname);
    setEmail(userData && userData.user.email);
  }, []);

  const handleLogout = () => {
    toast.success("🥳 Successfully Logged Out..", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      localStorage.removeItem("todo-user");
      navigate("/");
    }, 500);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "My Tasks", href: "/", icon: CheckSquare },
    { name: "Calendar", href: "/", icon: Calendar },
    { name: "Projects", href: "/", icon: CheckSquare },
    { name: "Analytics", href: "/", icon: Calendar },
    { name: "Settings", href: "/", icon: Settings },
  ];

  const [showmodel, setShowmodel] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openModelHandler = () => {
    setShowmodel(true);
  };

  //show all data
  const getalldata = async () => {
    const tododata = JSON.parse(localStorage.getItem("todo-user"));
    const id = tododata?.user?.id;
    const token = tododata?.token;
    // console.log("Calling Api ", id, token);
    try {
      const { data } = await getallTodo(id, token);
      setdata(data?.todos);
      // console.log(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // FILTER AND SEARCH FUNCTIONALITY
  useEffect(() => {
    if (!data) {
      setFilteredData([]);
      return;
    }

    let filtered = [...data];

    // Apply filter based on completion status
    if (filterType === "Completed") {
      filtered = filtered.filter(task => task.isComplete === true);
    } else if (filterType === "Incomplete") {
      filtered = filtered.filter(task => task.isComplete === false);
    }
    // If filterType is "All", no filtering is applied

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(task => 
        task.title?.toLowerCase().startsWith(searchTerm.toLowerCase()) 
        // task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [data, filterType, searchTerm]); // Re-run when data, filter, or search changes

  // HANDLE FILTER SELECTION
  const handleFilterSelect = (filter) => {
    setFilterType(filter);
    setOpen(false); // Close dropdown
  };

  // HANDLE SEARCH INPUT CHANGE
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // if (id && token) {
    getalldata(); // 🚫 No need to pass id here again, already available in scope
    // }
  }, []);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!bg-white !text-gray-800 !shadow-lg !border !border-gray-200"
        progressClassName="!bg-blue-500"
      />
      {/* Enhanced Navbar */}
      <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Welcome */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"> */}
                  {/* <CheckSquare className="w-6 h-6 text-white" /> */}
                   <img src={Logo} alt="" className='h-13 w-15'/>
                {/* </div> */}
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    TaskFlow
                  </h1>
                </div>
              </div>

              {/* Welcome Message - Hidden on mobile */}
              {/* <div className="hidden lg:flex items-center space-x-2 ml-8">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold p-16">
                      {user
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Welcome back,{" "}
                    <span className="text-blue-600 font-semibold">{user}</span>
                  </span>
                </div> */}
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Right: Search, Notifications, User Menu */}
            <div className="flex items-center space-x-3">
              {/* Search Bar - Hidden on mobile */}
              {/* <div className="hidden sm:flex items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-48"
                      />
                    </div>
                  </div> */}

              {/* Notifications */}
              {/* <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div> */}

              {/* User Dropdown - Desktop */}
              <div className="hidden md:block relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center p-5">
                    <span className="text-white font-bold">
                      {user
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium max-w-32 truncate">
                    {user}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {user}
                      </p>
                      <p className="text-sm text-gray-500">{email}</p>
                    </div>
                    <a
                      href="/todo"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <CircleUser className="w-4 h-4 mr-3" />
                      Profile
                    </a>
                    <a
                      href="/"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-2">
                {/* Mobile Search */}
                <div className="mb-4">
                  {/* <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div> */}
                </div>

                {/* Mobile User Info */}
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user}</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                })}

                <hr className="my-4" />

                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user.split(" ")[0]}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Ready to tackle your tasks today? Let's get things done!
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={openModelHandler}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200 flex items-center space-x-2 hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Task</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards - UPDATED TO USE FILTERED DATA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data ? data.length : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data ? data.filter((task) => !task.isComplete).length : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data ? data.filter((task) => task.isComplete).length : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Section Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
                <p className="text-gray-500 mt-1">
                  Manage and organize your daily tasks
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 w-48"

                    />
                  </div>
                </div>
                <div
                  className="relative inline-block text-left"
                  ref={dropdownRef}
                >
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filter ({filterType})</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <ul className="py-1 text-sm text-gray-700">
                        <li 
                          className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${filterType === 'All' ? 'bg-blue-50 text-blue-600' : ''}`}
                          onClick={() => handleFilterSelect('All')}
                        >
                          All
                        </li>
                        <li 
                          className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${filterType === 'Completed' ? 'bg-blue-50 text-blue-600' : ''}`}
                          onClick={() => handleFilterSelect('Completed')}
                        >
                          Completed
                        </li>
                        <li 
                          className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${filterType === 'Incomplete' ? 'bg-blue-50 text-blue-600' : ''}`}
                          onClick={() => handleFilterSelect('Incomplete')}
                        >
                          Incomplete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <SortAsc className="w-4 h-4" />
                  <span className="font-medium">Sort</span>
                </button>

                {/* <div className="flex bg-gray-100 rounded-lg p-1">
                      <button className="p-2 rounded-md bg-white shadow-sm text-blue-600">
                        <List className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-md text-gray-400 hover:text-gray-600">
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                    </div> */}
              </div>
            </div>
          </div>

          {/* Tasks Content - UPDATED TO USE FILTERED DATA */}
          <div className="p-6">
       
           
                <div>
                <div className="text-sm text-gray-500">
                  Showing {filteredData.length} of {data ? data.length : 0} tasks
                </div>
              </div>
            

            {filteredData && filteredData.length > 0 ? (
              <Card data={filteredData} getalldata={getalldata} />
            ) : data && data.length > 0 ? (
              // SHOW MESSAGE WHEN FILTERS RETURN NO RESULTS
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  No tasks match your current search or filter criteria. Try adjusting your filters or search terms.
                </p>
                <div className="flex gap-3 justify-center">
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Clear Search
                    </button>
                  )}
                  {filterType !== 'All' && (
                    <button
                      onClick={() => setFilterType('All')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tasks yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Get started by creating your first task. Click the "Add New
                  Task" button to begin organizing your day.
                </p>
                <button
                  onClick={openModelHandler}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200 flex items-center space-x-2 mx-auto hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create First Task</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <ModalComponent
        showmodel={showmodel}
        setShowmodel={setShowmodel}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        // setdata={setdata}
        getalldata={getalldata}
      />

      {/* Click outside to close dropdowns */}
      {(isUserDropdownOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserDropdownOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
      <Footer/>
    </div>
  );
}

export default Todo;