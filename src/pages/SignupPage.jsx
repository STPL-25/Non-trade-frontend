import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpFields } from "../Data/SignUpData"; // Update path as needed
import stplimage from "../assets/stpllogo.png"; 
export default function SignUp() {
  const signUpFields = useSignUpFields();
  const navigate = useNavigate();

  // Initialize form fields dynamically based on the hook
  const initialFormFields = signUpFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formFields, setFormFields] = useState(initialFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    signUpFields.forEach((field) => {
      if (field.required && !formFields[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Handle password confirmation validation
      if (field.validation?.matchField) {
        if (formFields[field.name] !== formFields[field.validation.matchField]) {
          newErrors[field.name] = field.validation.message;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log("Signed up:", formFields);
    navigate("/");
  };

  const isFormValid = () =>
    Object.values(formFields).every((val) => val.trim() !== "") &&
    formFields.password === formFields.confirmPassword;

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "password":
        return (
          <div key={field.name} className={field.type === "password" ? "relative" : ""}>
            <Label className="text-sm font-medium text-gray-700">
              {field.label}
            </Label>
            <Input
              type={
                field.type === "password"
                  ? field.name === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : showConfirmPassword
                    ? "text"
                    : "password"
                  : field.type
              }
              name={field.name}
              placeholder={field.placeholder}
              value={formFields[field.name]}
              onChange={handleChange}
              className={`mt-1 ${field.showToggle ? "pr-16" : ""}`}
              required={field.required}
            />
            {field.showToggle && (
              <button
                type="button"
                onClick={() => {
                  if (field.name === "password") {
                    setShowPassword(!showPassword);
                  } else if (field.name === "confirmPassword") {
                    setShowConfirmPassword(!showConfirmPassword);
                  }
                }}
                className="absolute right-3 bottom-2 text-blue-600 text-sm font-medium"
              >
                {field.name === "password"
                  ? showPassword
                    ? "HIDE"
                    : "SHOW"
                  : showConfirmPassword
                  ? "HIDE"
                  : "SHOW"}
              </button>
            )}
            {errors[field.name] && (
              <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.name}>
            <Label className="text-sm font-medium text-gray-700">
              {field.label}
            </Label>
            <select
              name={field.name}
              value={formFields[field.name]}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-400"
              required={field.required}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option) => (
                <option key={option.value || option} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-4">
      <div className="w-full max-w-5xl rounded-lg bg-white shadow-2xl flex overflow-hidden">
        {/* Left side - Welcome Panel */}
       <div className="relative hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-800 p-12 text-white md:flex">
  <img src={stplimage} alt="" />
  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500 opacity-40"></div>
  <h2 className="text-base uppercase mb-8 
       tracking-[0.3em] font-extrabold 
       text-white dark:text-white">
    STPL NON TRADE APPLICATION
  </h2>
</div>


        {/* Right side - Signup form */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-12">
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {signUpFields.map(renderField)}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid()}
                className="w-full bg-blue-900 hover:bg-blue-800 py-3 text-white font-medium"
              >
                Create Account
              </Button>

              {/* Link to Sign In */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
