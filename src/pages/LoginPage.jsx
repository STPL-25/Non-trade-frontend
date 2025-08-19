
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate,Link } from "react-router-dom";
import stplimage from "../assets/stpllogo.png"; // Update path as needed
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
const navigate = useNavigate()
  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/Dashboard')
    // Handle sign in logic here
    console.log("Signing in with:", { username, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-2xl flex overflow-hidden">
        {/* Left side - Welcome section */}
         <div className="relative hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-800 p-12 text-white md:flex">
         <img src={stplimage} alt="" />
         <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500 opacity-40"></div>
         <h2 className="text-base uppercase mb-8 
              tracking-[0.3em] font-extrabold 
              text-white dark:text-white">
           STPL NON TRADE APPLICATION
         </h2>
       </div>

        {/* Right side - Sign in form */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-12">
          <div className="mx-auto w-full max-w-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Username input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <Input
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 py-3 border-gray-200 focus:border-blue-500"
                  required
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-16 py-3 border-gray-200 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* Remember me and forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label 
                    htmlFor="remember-me" 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign in button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800 py-3 text-white font-medium"
              >
                Sign in
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

            
              {/* Sign up link */}
              <p className="text-center text-sm text-gray-600">
                {"Don't have an account? "}
                <Link 
                  to="/signup" 
                 
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
