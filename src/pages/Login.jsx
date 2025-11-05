import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/login";
import { loginUser } from "../http";

const Login = () => {
  const navgeate = useNavigate();
  const dispatch = useDispatch();
  const [loding, setLoding] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe && savedEmail) {
      setFormData({ email: savedEmail, password: savedPassword || "" });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
const { mutate } = useMutation({

   mutationFn: loginUser ,
    onSuccess: (data) => {
      console.log("Login successful:", data);
        dispatch(
  login({
    token: data.access_token,
    user: data.user,
  })
);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
        localStorage.setItem("rememberedPassword", formData.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }

      navgeate("/");
    
    },
    onError: (error) => {
      console.error("Login failed:", error);
      return;
    }

});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if (loding) return;
    setLoding(true);
     
 mutate({
      email: formData.email,
      password: formData.password,
 });
     
     
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
          Please log in to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-orange-500 focus:outline-none
                         text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-orange-500 focus:outline-none
                         text-sm sm:text-base"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm mt-2">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="rounded accent-orange-500"
              />{" "}
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg mt-4
                       hover:bg-orange-600 transition duration-200 font-semibold text-sm sm:text-base"
          >
           {loding ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-orange-500 hover:text-orange-600 transition-colors"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
