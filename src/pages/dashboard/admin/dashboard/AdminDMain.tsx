/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from 'react-redux';
import Loading from '@/components/shared/Loading';
import { useGetAdminStatsQuery } from '@/redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';



const AdminDMain = () => {
    const {user} = useSelector((state: any) => state.auth);

    const {data:adminData, isLoading, error} = useGetAdminStatsQuery<any>();
    if(isLoading) return <Loading/>
    if(error) return <div>Faild to fetch data</div>;
    const stats = adminData?.data || {};
    if(!stats) return <div>No admin stats found</div>;

  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
            <p className='text-gray-500'>Hi, {user?.username}! Welcome to your {user?.role} dashboard.</p>
        </div>
        <AdminStats stats={stats}/>
        {/* component file */}
        <AdminStatsChart stats={stats}/>
    </div>
  )
}

export default AdminDMain;