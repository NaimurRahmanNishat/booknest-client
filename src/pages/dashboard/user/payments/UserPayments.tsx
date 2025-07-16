/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import { useGetOrderByEmailQuery } from "@/redux/features/orders/orderApi";
import { useSelector } from "react-redux";

const UserPayments = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading, error } = useGetOrderByEmailQuery(user?.email);
  if (isLoading) return <Loading />;
  if (error) return <div>Faild to fetch data</div>;

  const orders = data?.data || [];

  const totalPayment = orders.reduce((acc: number, order: any) => acc + order.amount, 0);

  return (
    <div className="pt-24">
      <div className="py-6 px-4">
        <h3 className="text-xl font-semibold text-blueGray-700 mb-4">
          Total Payments
        </h3>
        <div className="bg-background p-8 shadow-lg rounded">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-5">
            Total Spent: ${totalPayment ? totalPayment : 0}
          </p>
          <ul>
            {orders &&
              orders.map((item: any, index: number) => (
                <li key={index} className="space-y-2">
                  <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Order #{index + 1}
                  </h5>
                  <div key={index} className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-200">Order Id: {item._id}</p>
                    <p className="text-gray-600 dark:text-gray-200">Price: ${item?.amount}</p>
                  </div>
                  <div className="flex md:flex-row items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-200">
                      Date: {new Date(item.createdAt).toLocaleString()}
                    </span>
                    <p className="text-gray-600 dark:text-gray-200">
                      Status:
                      <span
                        className={`ml-2 py-[2px] px-2 text-sm rounded ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                            ? "bg-red-200 text-red-700"
                            : item.status === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-200 text-blue-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>
                  <hr className="my-2" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPayments;