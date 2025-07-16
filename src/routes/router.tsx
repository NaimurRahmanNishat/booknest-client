import App from "@/App";
import ErrorPage from "@/components/shared/ErrorPage";
import About from "@/pages/about-us/About";
import AllProducts from "@/pages/all-products/AllProducts";
import SingleProducts from "@/pages/all-products/productDetails/SingleProducts";
import Contact from "@/pages/contact/Contact";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import ResetPassword from "@/pages/reset-password/ResetPassword";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./ProtectedRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import UserDMain from "@/pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "@/pages/dashboard/user/orders/UserOrders";
import UserPayments from "@/pages/dashboard/user/payments/UserPayments";
import UserProfile from "@/pages/dashboard/user/profile/UserProfile";
import UserReviews from "@/pages/dashboard/user/reviews/UserReviews";
import AdminDMain from "@/pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "@/pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "@/pages/dashboard/admin/manageProduct/ManageProduct";
import ManageOrders from "@/pages/dashboard/admin/orders/ManageOrders";
import ManageUsers from "@/pages/dashboard/admin/users/ManageUsers";
import UpdateProduct from "@/pages/dashboard/admin/manageProduct/UpdateProduct";
import PaymentSuccess from "@/components/shared/PaymentSuccess";
import OrderDetails from "@/pages/dashboard/user/orders/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/all-products/:id",
        element: <SingleProducts />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
    {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user routes
      {
        path: "",
        element: <UserDMain />,
      },
      {
        path: "orders", // children relative path
        element: <UserOrders />,
      },
      {
        path: "payments", // children relative path
        element: <UserPayments />,
      },
      {
        path: "profile", // children relative path
        element: <UserProfile />,
      },
      {
        path: "reviews", // children relative path
        element:<UserReviews />,
      },
      // admin routes
      {
        path: "admin", // children relative path
        element: (
          <PrivateRoute role="admin">
            <AdminDMain />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product", // children relative path
        element: (
          <PrivateRoute role="admin">
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products", // children relative path
        element: (
          <PrivateRoute role="admin">
            <ManageProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id", // children relative path
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders", // children relative path
        element: (
          <PrivateRoute role="admin">
            <ManageOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "users", // children relative path
        element: (
          <PrivateRoute role="admin">
            <ManageUsers />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
