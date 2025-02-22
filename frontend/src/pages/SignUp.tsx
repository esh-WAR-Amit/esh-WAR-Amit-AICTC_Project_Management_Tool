import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";

// Validation Schema
const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Watch password and confirmPassword fields in real-time
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Signing up", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 dark:text-white"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 pr-10 dark:text-white"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-600 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 pr-10 dark:text-white"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-600 dark:text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {/* Real-time validation feedback */}
            {confirmPassword && password === confirmPassword && (
              <FaCheckCircle className="absolute right-10 top-10 text-green-500" />
            )}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
