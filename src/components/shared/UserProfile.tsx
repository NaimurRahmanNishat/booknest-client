/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";
import avatar from "@/assets/images/avatar.png";
import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

const userDropdownMenus = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/dashboard/profile" },
  { label: "Payments", path: "/dashboard/payments" },
  { label: "Orders", path: "/dashboard/orders" },
];

const adminDropdownMenus = [
  { label: "Admin Panel", path: "/dashboard/admin"},
  { label: "Manage Products", path: "/dashboard/manage-products"},
  { label: "All Orders", path: "/dashboard/manage-orders"},
  { label: "Add Product", path: "/dashboard/add-product"},
];

const UserProfile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownMenus = user?.role === "admin" ? adminDropdownMenus : userDropdownMenus;

const [logoutUser] = useLogoutUserMutation();

const handleLogout = async () => {
  try {
    await logoutUser().unwrap();
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  } catch (error) {
    console.log("Logout error:", error);
  }
};

  return (
    <div className="relative">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src={user?.profileImage || avatar}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover border bg-background cursor-pointer hover:shadow-md transition"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 mt-2 shadow-lg rounded-lg border dark:bg-background"
            side="bottom"
            align="end"
          >
            <DropdownMenuLabel className="text-sm font-semibold px-4 py-2">
              Hello, {user?.username || "User"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dropdownMenus.map((item, index) => (
              <DropdownMenuItem key={index} className="p-0">
                <Link
                  to={item.path}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-1.5 text-center font-semibold"
        >
          <User className="text-blue-600" size={18} />
        </button>
      )}
    </div>
  );
};

export default UserProfile;