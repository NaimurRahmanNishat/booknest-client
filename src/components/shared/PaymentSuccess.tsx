import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import TimelineStep from "./TimelineStep";
import { getBaseUrl } from "@/utils/getBaseUrl ";
import { TextAnimate } from "./TextAnimate";

type OrderStatus = "pending" | "processing" | "shipped" | "completed";

type Order = {
  _id: string;
  orderId: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  email: string;
  amount: number;
  status: OrderStatus;
};

type Step = {
  status: OrderStatus;
  label: string;
  description: string;
  icon: {
    iconName: string;
    bgColorClass: string;
    textColorClass: string;
  };
};

const steps: Step[] = [
  {
    status: "pending",
    label: "Pending",
    description: "Your order has been created and is awaiting processing.",
    icon: {
      iconName: "edit-2-line",
      bgColorClass: "bg-red-600 dark:bg-red-600",
      textColorClass: "text-gray-400 dark:text-white",
    },
  },
  {
    status: "processing",
    label: "Processing",
    description: "Your order is currently being processed.",
    icon: {
      iconName: "loader-line",
      bgColorClass: "bg-yellow-500",
      textColorClass: "text-yellow-800",
    },
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "Your order has been shipped.",
    icon: {
      iconName: "truck-line",
      bgColorClass: "bg-blue-800",
      textColorClass: "text-blue-100",
    },
  },
  {
    status: "completed",
    label: "Completed",
    description: "Your order has been successfully completed.",
    icon: {
      iconName: "check-line",
      bgColorClass: "bg-green-800",
      textColorClass: "text-white",
    },
  },
];

const PaymentSuccess = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessioId = query.get("session_id");

    if (sessioId) {
      const makeRequest = async () => {
        const response = await axios.post(
          `${getBaseUrl()}/api/orders/confirm-payment`,
          { session_id: sessioId },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response?.data) {
          setLoading(false);
          setOrder(response?.data.data as Order);
        }
      };
      makeRequest();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  const iscompleted = (status: OrderStatus): boolean =>
    steps.findIndex((step) => step.status === status) <=
    steps.findIndex((step) => step.status === order?.status);

  const isCurrent = (status: OrderStatus): boolean => status === order?.status;

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-2xl font-semibold mb-4 flex gap-2 text-primaryLight">
          Payment:
          <TextAnimate
            animation="blurInUp"
            by="character"
            duration={1}
            className="text-[#c72d8f]"
          >
            {String(order?.status)}
          </TextAnimate>
        </h2>
        <p className="mb-4 flex gap-2">
          Order ID:
          <TextAnimate
            animation="slideLeft"
            by="character"
            className="text-[#c7842d]"
          >
            {String(order?.orderId)}
          </TextAnimate>
        </p>
        <p className="mb-8">Status: {order?.status}</p>
        <ol className="sm:flex items-center relative">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              isCompleted={iscompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLastStep={index === steps.length - 1}
              icon={step.icon}
              description={step.description}
              order={null}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PaymentSuccess;
