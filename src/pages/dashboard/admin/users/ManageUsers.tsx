/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { useState } from 'react'
import UpdateUserModal from "./UpdateUserModal";

const ManageUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading, error, refetch } = useGetAllUsersQuery<any>();
  const [deleteUser, ] = useDeleteUserMutation();
  if (isLoading) return <Loading />;
  if (error) return <div>Faild to load users!</div>;
  const users = data?.data || [];
  // console.log(users);

  // delete user
  const handleDeleteUser = async (id: string) => {
    try {
      const response = await deleteUser(id).unwrap();
      console.log(response);
      alert("User deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // edit user role
  const handleEdit = async (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          {/* main */}
          <div className="relative flex flex-col min-w-0 break-words bg-background w-full mb-6 shadow-lg rounded ">
            {/* header */}
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Users
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <div>
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* table */}
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.map((user: any, index: number) => (
                      <tr key={user._id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {user?.email}
                        </th>

                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span
                            className={`rounded-full py-[2px] px-3 ${
                              user?.role === "admin"
                                ? "bg-indigo-500 text-white "
                                : "bg-amber-300"
                            }`}
                          >
                            {" "}
                            {user?.role}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex gap-1 items-center hover:text-blue-700"
                          >
                            <i className="ri-edit-2-line"></i> Edit
                          </button>
                        </td>
                        <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handleDeleteUser(user?._id)}
                            className="bg-red-600 text-white px-2 py-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    Tailwind CSS
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Naimur Rahman
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
      {
        isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch}/>
      }
    </>
  );
};

export default ManageUsers;