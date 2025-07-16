// src/redux/store.ts (or src/redux/extra.ts)
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import productsApi from "./features/products/productApi";
import orderApi from "./features/orders/orderApi";
import cartReducer from "./features/cart/cartSlice.ts";
import reviewApi from "./features/reviews/reviewApi";
import statsApi from "./features/stats/statsApi";
import contactApi from "./features/contact/contactApi";

// 👉 Configure the store
const store = configureStore({
  reducer: {
    // Add your reducers here
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart:cartReducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( authApi.middleware, productsApi.middleware, orderApi.middleware, reviewApi.middleware, statsApi.middleware, contactApi.middleware ),
});

// ✅ Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Export the store
export default store;