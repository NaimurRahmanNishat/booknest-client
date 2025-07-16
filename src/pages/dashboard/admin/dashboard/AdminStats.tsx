/* eslint-disable @typescript-eslint/no-explicit-any */


const AdminStats = ({stats}:any) => {
  return (
    <div className='my-5 space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div className='bg-background shadow-md rounded-lg p-6 border border-gray-200 hover:border-[#fc5d3a] cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Earning</h2>
                <p className='text-2xl font-bold'>${stats?.totalEarnings}</p>
            </div>
            <div className='bg-background shadow-md rounded-lg p-6 border border-gray-200 hover:border-[#fc5d3a] cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>All Orders</h2>
                <p className='text-2xl font-bold'>{stats?.totalOrders}</p>
            </div>
            <div className='bg-background shadow-md rounded-lg p-6 border border-gray-200 hover:border-[#fc5d3a] cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>All Users</h2>
                <p className='text-2xl font-bold'>{stats?.totalUsers}</p>
            </div>
            <div className='bg-background shadow-md rounded-lg p-6 border border-gray-200 hover:border-[#fc5d3a] cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Products</h2>
                <p className='text-2xl font-bold'>{stats?.totalProducts}</p>
            </div>
        </div>
    </div>
  )
}

export default AdminStats;