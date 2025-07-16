/* eslint-disable @typescript-eslint/no-explicit-any */
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (data: LoginInputs) => {
    try {
      const response = await loginUser(data).unwrap();
      // ✅ Correct destructuring based on LoginApiResponse
      const { user } = response;
      // ✅ Set user in Redux and localStorage
      dispatch(setUser({ user }));
      toast.success("Login successful");
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage(error?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 md:pt-44 p-4">
      <NeonGradientCard className="w-full max-w-md bg-whitep-6 rounded-2xl shadow-lg">
        <div className="w-full max-w-md bg-background border-t-4 border-green-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default Login;
