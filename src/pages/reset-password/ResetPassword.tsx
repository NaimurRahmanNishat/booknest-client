/* eslint-disable @typescript-eslint/no-explicit-any */
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useForm } from "react-hook-form";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";

type ResetPasswordInputs = {
  email: string;
  otpCode: string;
  newPassword: string;
};

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    defaultValues: {
      email: emailFromState,
    },
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    try {
      const res = await resetPassword(data).unwrap();
      setMessage(res.message);
      setErrorMessage(null);

      // ✅ Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      setErrorMessage(err?.data?.message || "Something went wrong");
      setMessage(null);
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 md:pt-44 p-4">
      <NeonGradientCard className="w-full max-w-md bg-whitep-6 rounded-2xl shadow-lg">
        <div className="w-full max-w-md bg-background border-t-4 border-green-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter the 6-digit OTP sent to your email and set your new password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Section */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* OTP Section */}
            <div>
              <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-1">
                6-digit OTP Code
              </label>
              <input
                id="otpCode"
                type="text"
                maxLength={6}
                {...register("otpCode", {
                  required: "OTP code is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="123456"
              />
              {errors.otpCode && <p className="text-red-500 text-sm mt-1">{errors.otpCode.message}</p>}
            </div>

            {/* New Password Section */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="New Password"
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>

            {/* Message Display */}
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="font-medium text-green-600 hover:underline hover:text-green-500">
              Back to Login
            </Link>
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default ResetPassword;
