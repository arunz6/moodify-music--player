
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useAuth}  from "../hooks/useauth.js";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loding,register} = useAuth()
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await register(username, email, password);
    navigate("/");
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#06142E] to-[#0B2447] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#102542] p-8 rounded-2xl shadow-2xl border border-blue-900">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h1>

          <p className="text-blue-200 text-center mb-8">Register to continue</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-blue-100 mb-2">Username</label>

              <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl bg-[#16355C] text-white border border-blue-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-100 mb-2">Email</label>

              <input
              required
              type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-[#16355C] text-white border border-blue-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-blue-100 mb-2">Password</label>

              <input
              required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl bg-[#16355C] text-white border border-blue-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-blue-200 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-400 cursor-pointer hover:text-blue-300">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
