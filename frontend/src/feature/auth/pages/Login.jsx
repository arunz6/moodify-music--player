import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useauth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, login } = useAuth();
  let [emailo, setemailo] = useState("");
  let [passwordo, setpasswordo] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(emailo, passwordo);

    await login(emailo, passwordo);
    navigate("/");
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#06142E] to-[#0B2447] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#102542] p-8 rounded-2xl shadow-2xl border border-blue-900">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-blue-200 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-blue-100 mb-2">Email</label>

              <input
              required
                onChange={(e) => setemailo(e.target.value)}
                value={emailo}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-[#16355C] text-white border border-blue-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-blue-100 mb-2">Password</label>

              <input
              required
                onChange={(e) => setpasswordo(e.target.value)}
                value={passwordo}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-[#16355C] text-white border border-blue-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-300 hover:text-blue-100"
              >
                Forgot Password?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-blue-200 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register">
              <span className="text-blue-400 cursor-pointer hover:text-blue-300">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
