import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here, e.g., send reset email
    console.log("Forgot password for email:", email);
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
          Enter your email address and we'll send you a link to reset your password.
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
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-orange-500 focus:outline-none
                         text-sm sm:text-base"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg mt-4
                       hover:bg-orange-600 transition duration-200 font-semibold text-sm sm:text-base"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 transition-colors"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
