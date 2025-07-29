import React, { useState, useEffect } from 'react';
import { createtodos } from '../../../../Services/TodoServices';
import { toast } from 'react-toastify';
// import getalldata from "./Todo";

const ModalComponent = ({showmodel,setShowmodel,title,setTitle,description,setDescription,getalldata}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Reset states when modal opens
  useEffect(() => {
    if (showmodel) {
      setIsClosing(false);
      setFocusedField(null);
      setIsSaving(false);
    }
  }, [showmodel]);

  const handleCloseModel=()=>{
    setIsClosing(true);
    setTimeout(() => {
      setShowmodel(false);
      setIsClosing(false);
    }, 200);
  }

  const onSave=async ()=>{
    try {
      setIsSaving(true);
      
      const userData=JSON.parse(localStorage.getItem("todo-user"))
      const createdBy=userData&& userData.user.id
      const data={title,description,createdBy}

      if(!title || !description){
        alert("fill this")
        setIsSaving(false);
        return
      }

      const res=await createtodos(data)
     toast.success(" Task Create Successfully")
     getalldata()
      // console.log(res)
      
      // Show loader for 2 seconds
      setTimeout(async() => {
        setTitle("")
        setDescription("")
        setIsSaving(false);
        setShowmodel(false)

        // await getalldata(setdata,id,token)
      }, 2000);
      
    } catch (error) {
      console.log(error)
      setIsSaving(false);
    }
  }

  return (
    <>
    {showmodel && (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/30 to-blue-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleCloseModel}
    >
      <div 
        className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md transform transition-all duration-300 ${
          isClosing ? 'scale-90 opacity-0 translate-y-8' : 'scale-100 opacity-100 translate-y-0'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: showmodel && !isClosing ? 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : ''
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Modal Title
            </h2>
          </div>
          <button
            onClick={handleCloseModel}
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 group"
          >
            <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              type="text"
              placeholder="Enter some text"
              className={`w-full border-2 rounded-xl p-4 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                focusedField === 'title'
                  ? 'border-purple-400 focus:border-purple-500 focus:ring-purple-200 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              } focus:outline-none focus:ring-4 placeholder-gray-400`}
            />
            {focusedField === 'title' && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 -z-10 blur-xl transition-opacity duration-300"></div>
            )}
          </div>
        </div>

        {/* Description Textarea */}
        <div className="mb-8">
          <div className="relative">
            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter more details"
              className={`w-full border-2 rounded-xl p-4 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none ${
                focusedField === 'description'
                  ? 'border-purple-400 focus:border-purple-500 focus:ring-purple-200 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              } focus:outline-none focus:ring-4 placeholder-gray-400`}
              rows="4"
            ></textarea>
            {focusedField === 'description' && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 -z-10 blur-xl transition-opacity duration-300"></div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95 border-2 border-transparent hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCloseModel}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
     )}
      </>
  );
};

export default ModalComponent;