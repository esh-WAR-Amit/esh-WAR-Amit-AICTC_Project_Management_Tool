// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password visibility

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const Login: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   });

//   // State for password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = (data: LoginFormValues) => {
//     console.log("Login Data:", data);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email Field */}
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               {...register("email")}
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <label className="block text-gray-700">Password</label>
//             <input
//               {...register("password")}
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//             />
//             {/* Show/Hide Password Toggle */}
//             <button
//               type="button"
//               className="absolute right-3 top-9 text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Link to Sign Up */}
//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-500 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
//*************************************************************************************************************** */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load saved credentials if "Remember Me" was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      if (data.rememberMe) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      // Mock API login request
      setTimeout(() => {
        console.log("Login Successful", data);
        setLoading(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="mr-2"
            />
            <label className="text-gray-700 dark:text-gray-300">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login */}
        {/* <div className="text-center my-4">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Or login with</p>
          <GoogleLogin
            onSuccess={(response) => console.log(response)}
            onError={() => console.log("Login Failed")}
          />
        </div> */}

        {/* Link to Sign Up */}
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
