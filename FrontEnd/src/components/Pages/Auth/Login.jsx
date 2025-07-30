import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Check, X, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getErrorMsg } from "../../../../utils/ErrorHandler.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [completedFields, setCompletedFields] = useState({});
  const [loading, setLoading] = useState(false); // NEW

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (!error && value.trim()) {
      setCompletedFields((prev) => ({ ...prev, [name]: true }));
    } else {
      setCompletedFields((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (isFormValid) {
      setLoading(true); // Start spinner
      try {
        const res = await axios.post(
          "https://mern-stack-taskflow.onrender.com/api/user/login",
          formData
        );

        toast.success("🎉 Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          const expiryTime = Date.now() + 60 * 60 * 1000;
          const userWithExpiry = {
            user: res.data.user,
            token: res.data.token,
            expiry: expiryTime,
          };
          localStorage.setItem("todo-user", JSON.stringify(userWithExpiry));
          navigate("/todo");
        }, 500);

        setFormData({ email: "", password: "" });
      } catch (err) {
        toast.error(getErrorMsg(err));
      } finally {
        setLoading(false); // Stop spinner
      }
    }
  };

  const isFormValid =
    completedFields.email &&
    completedFields.password &&
    !errors.email &&
    !errors.password;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ToastContainer />
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                {completedFields.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.email && touched.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="text-right">
              <a href="/" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full mt-6 py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                !isFormValid || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8 8z"
                    />
                  </svg>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
