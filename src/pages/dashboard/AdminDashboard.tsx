import { useLogoutUserMutation } from '@/redux/features/auth/authApi';
import { logout } from '@/redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router';

interface NavItems{
  path: string;
  label: string;
}

const navItems: NavItems[] = [
  {
    path: "/dashboard/admin",
    label: "Dashboard ",
  },
  {
    path: "/dashboard/add-product",
    label: "Add Product",
  },
  {
    path: "/dashboard/manage-products",
    label: "Manage Products",
  },
  {
    path: "/dashboard/users",
    label: "Users",
  },
  {
    path: "/dashboard/manage-orders",
    label: "Manage Orders",
  },
]

const AdminDashboard = () => {
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
  }
  return (
    <div className='space-y-5 bg-background p-8 md:h-screen flex flex-col justify-between'>
      <div>
        <div className='text-2xl font-extrabold text-[#0f172a]'>
          <Link to="/" className='text-[#239c47]'>BOOKNEST<span className='text-[#3b82f6] text-4xl'>.</span></Link>
          <p className='text-xs italic text-[#3785f9]'>Admin dashboard</p>
        </div>
        <hr className='mt-5'/>
        <ul className='space-y-5 pt-5'>
          {
            navItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className={({isActive}) => isActive ? "text-[#f95937] font-semibold" : ""}>{item.label}</NavLink>
              </li>
            ))
          }
        </ul>
      </div>
      {/* logout */}
      <div className='mb-3'>
        <hr className='mb-3'/>
        <button onClick={handleLogout} className='text-white bg-[#f95937] px-5 py-1 font-medium rounded-sm cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}

export default AdminDashboard;