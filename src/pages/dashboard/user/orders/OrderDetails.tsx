import Loading from "@/components/shared/Loading";
import TimelineStep from "@/components/shared/TimelineStep";
import { useGetOrderByIdQuery } from "@/redux/features/orders/orderApi";
import { useParams } from "react-router";

type Order = {
  orderId: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed';
  updatedAt: string;
};

type Icon = {
  iconName: string;
  bgColorClass: string;
  textColorClass: string;
};

// TimelineStep.tsx
type Step = {
  status: string;
  label: string;
  description: string;
  icon: Icon;
};

const steps: Step[] = [
  {
    status: "pending",
    label: "Pending",
    description: "Your order has been created and is awaiting processing.",
    icon: {
      iconName: "edit-2-line",
      bgColorClass: "red-500",
      textColorClass: "gray-800",
    },
  },
  {
    status: "processing",
    label: "Processing",
    description: "Your order is currently being processed.",
    icon: {
      iconName: "loader-line",
      bgColorClass: "yellow-500",
      textColorClass: "yellow-800",
    },
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "Your order has been shipped.",
    icon: {
      iconName: "truck-line",
      bgColorClass: "blue-800",
      textColorClass: "blue-100",
    },
  },
  {
    status: "completed",
    label: "Completed",
    description: "Your order has been successfully completed.",
    icon: { iconName: "check-line", bgColorClass: "green-800", textColorClass: "white" },
  },
];

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data, isLoading, isError } = useGetOrderByIdQuery(orderId!, {
    skip: !orderId,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading order details</div>;

  const order: Order = data?.data as Order; 

  const iscompleted = (status: string) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status: string) => order.status === status;

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-2xl font-semibold mb-4">Payment {order.status}</h2>
        <p className="mb-4">Order ID: {order.orderId}</p>
        <p className="mb-8">Status: {order.status}</p>
        <ol className="sm:flex items-center relative">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              isCompleted={iscompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLastStep={index === steps.length - 1}
              icon={step.icon}
              description={step.description} order={null}            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default OrderDetails;
