import React, { useState } from 'react';
import { updateTodos } from '../../../../Services/TodoServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edittask({ item, setEditmodel, getalldata }) {
  const [title, setTitle] = useState(item?.title);
  const [description, setDescription] = useState(item?.description);
  const [isComplete, setIsComplete] = useState(item?.isComplete);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const id = item?._id;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("todo-user"));
      const createdBy = userData?.user?.id;
      const data = { title, description, createdBy, isComplete };

      if (!title || !description) {
        alert("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      await updateTodos(id, data);
      toast.success("Task updated successfully");
      getalldata();
      
      setTimeout(() => {
        setEditmodel(false);
      }, 1000);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Animated backdrop */}
      <div 
        className="fixed inset-0 bg-black transition-opacity duration-300 ease-out z-50"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={() => setEditmodel(false)}
      >
        {/* Modal container with enhanced animations */}
        <div 
          className="flex items-center justify-center min-h-screen p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out"
            style={{
              animation: 'modalSlideIn 0.3s ease-out',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">✏️</span>
                Edit Task
              </h2>
            </div>

            {/* Form content */}
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">📝</span>
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 ease-in-out
                      ${focusedField === 'title' 
                        ? 'border-blue-500 ring-4 ring-blue-100 shadow-md transform scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    placeholder="Enter task title..."
                    required
                  />
                  {focusedField === 'title' && (
                    <div className="absolute right-3 top-3 text-blue-500 animate-pulse">
                      ✨
                    </div>
                  )}
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">📄</span>
                  Description
                </label>
                <div className="relative">
                  <textarea
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 ease-in-out resize-none
                      ${focusedField === 'description' 
                        ? 'border-blue-500 ring-4 ring-blue-100 shadow-md transform scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    placeholder="Describe your task..."
                    required
                  />
                  {focusedField === 'description' && (
                    <div className="absolute right-3 top-3 text-blue-500 animate-pulse">
                      ✨
                    </div>
                  )}
                </div>
              </div>

              {/* Status Select with enhanced styling */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">🎯</span>
                  Status
                </label>
                <div className="relative">
                  <select
                    value={isComplete}
                    onChange={(e) => setIsComplete(e.target.value === 'true')}
                    onFocus={() => setFocusedField('status')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 ease-in-out appearance-none cursor-pointer
                      ${focusedField === 'status' 
                        ? 'border-blue-500 ring-4 ring-blue-100 shadow-md transform scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    required
                  >
                    <option value="">Select Status...</option>
                    <option value={true}>✅ Completed</option>
                    <option value={false}>⏳ Incomplete</option>
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action buttons with enhanced interactivity */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-200 hover:shadow-md active:scale-95"
                  onClick={() => setEditmodel(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center space-x-2
                    ${isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
                    } text-white`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      <span>Update Task</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export default Edittask;