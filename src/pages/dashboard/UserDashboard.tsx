import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";

const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard ",
  },
  {
    path: "/dashboard/orders",
    label: "Orders",
  },
  {
    path: "/dashboard/payments",
    label: "Payments",
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
  },
  {
    path: "/dashboard/reviews",
    label: "Reviews",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      alert("Logout successful!");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log("Error logout user ", error);
    }
  };
  return (
    <div className="space-y-5 bg-background p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="text-2xl font-extrabold text-[#0f172a]">
          <Link to="/" className="text-primaryLight">  
            BOOKNEST<span className="text-[#3b82f6] text-4xl">.</span>
          </Link>
          <p className="text-xs italic text-pink-500">User dashboard</p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive ? "text-[#f95937] font-semibold" : ""
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* logout */}
      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-[#f95937] px-5 py-1 font-medium rounded-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;