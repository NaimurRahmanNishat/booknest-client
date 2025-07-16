/* eslint-disable @typescript-eslint/no-explicit-any */
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // ✅ response from `user` & `token` to take out
      const res = await registerUser(data).unwrap();
      const { user } = res;

      // ✅ local storage and Redux set up
      dispatch(setUser({ user }));
      navigate("/login");
      toast.success("Registration successful");
    } catch (err: any) {
      console.error("Registration Error:", err);
      alert(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 md:pt-44 p-4">
      <NeonGradientCard className="w-full max-w-md bg-whitep-6 rounded-2xl shadow-lg">
        <div className="w-full max-w-md bg-background border-t-4 border-green-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                placeholder="Enter your user name"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-600">Username is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
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
                <p className="text-red-500 mt-1">Password is required</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default Register;
