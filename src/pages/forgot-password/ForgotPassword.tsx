/* eslint-disable @typescript-eslint/no-explicit-any */
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate import
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";

type ForgotPasswordInput = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // ✅ initialize useNavigate

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const res = await forgotPassword(data).unwrap();
      setMessage(res.message);
      setErrorMessage(null);

      // ✅ Redirect to reset-password page after 2 seconds
      setTimeout(() => {
        navigate("/reset-password", { state: { email: data.email } });
      }, 2000); // optional delay for user to see message
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      setErrorMessage(err?.data?.message || "Something went wrong");
      setMessage(null);
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 md:pt-44 p-4">
      <NeonGradientCard className="w-full max-w-md bg-whitep-6 rounded-2xl shadow-lg">
        <div className="w-full max-w-md bg-background border-t-4 border-blue-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your email address below and we'll send you an OTP to reset your password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

            {/* Success Message */}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:underline hover:text-blue-500">
              Back to Login
            </Link>
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default ForgotPassword;
