
import { getBaseUrl } from "@/utils/getBaseUrl ";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  username: string;
  email: string;
  otpCode?: string;
  otpExpire?: Date;
  passwordChangedAt?: Date;
  profileImage?: string;
  bio?: string;
  profession?: string;
  role: string;
}

export interface UserResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  otpCode: string;
  newPassword: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserProfileInput {
  username?: string;
  profileImage?: string;
  bio?: string;
  profession?: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // ✅ Register
    registerUser: builder.mutation<UserResponse, RegisterUserInput>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    // ✅ Login
    loginUser: builder.mutation<UserResponse, LoginUserInput>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // ✅ Logout
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    // ✅ Forgot Password (send OTP)
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordInput>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Reset Password using OTP
    resetPassword: builder.mutation<{ message: string }, ResetPasswordInput>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Update Password (must be logged in)
    updatePassword: builder.mutation<{ message: string }, UpdatePasswordInput>({
      query: (data) => ({
        url: "/update-password",
        method: "PATCH",
        body: data,
      }),
    }),

    // ✅ Get all users
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // ✅ Delete user
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // ✅ Update user role
    updateUserRole: builder.mutation<{ message: string; user: User }, { userId: string; role: string }>({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),

    // ✅ Update user profile
    editUserProfile: builder.mutation<{ message: string; user: User }, { userId: string; role: UpdateUserProfileInput }>({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditUserProfileMutation,
} = authApi;
