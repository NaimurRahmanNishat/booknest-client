// src/redux/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ✅ User type
export interface User {
  _id: string;
  username: string;
  email: string;
  birthdate?: string;
  role?: string;
  profileImage?: string;
  bio?: string;
  profession?: string;
}

// ✅ Auth state
interface AuthState {
  user: User | null;
}

// ✅ Load from localStorage
const loadUserFromLocalStorage = (): AuthState => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? { user: JSON.parse(storedUser) } : { user: null };
  } catch {
    return { user: null };
  }
};

// ✅ Initial state
const initialState: AuthState = loadUserFromLocalStorage();

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
