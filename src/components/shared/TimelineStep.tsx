import React from "react";

type Order = {
  updatedAt: string;
};

type Icon = {
  iconName: string;
  bgColorClass: string;
  textColorClass: string;
};


type Step = {
  label: string;
  status: string;
};

type Props = {
  step: Step;
  order: Order | null;
  isCompleted: boolean;
  isCurrent: boolean;
  icon: Icon;
  description: string;
  isLastStep: boolean;
};

const TimelineStep: React.FC<Props> = ({
  step,
  order,
  isCompleted,
  isCurrent,
  icon,
  description,
  isLastStep,
}) => {
  const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColorClass}` : "bg-gray-200";
  const iconTextColor = isCompleted || isCurrent ? `text-${icon.textColorClass}` : "text-gray-500";
  const connectorColor = isCompleted ? "bg-blue-500" : "bg-gray-200";
  const labelTextColor = isCompleted || isCurrent ? "text-gray-900" : "text-gray-500";
  const descriptionTextColor = isCompleted || isCurrent ? "text-gray-900" : "text-gray-500";

  return (
    <li className="relative mb-6 sm:mb-0 sm:pl-10">
      <div className="flex items-center">
        <div
          className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white shrink-0 ${iconBgColor} ${iconTextColor}`}
        >
          <i className={`ri-${icon.iconName} text-xl`}></i>
        </div>
        {!isLastStep && (
          <div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`}></div>
        )}
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className={`font-semibold text-lg dark:text-gray-700 text-gray-400 ${labelTextColor}`}>
          {step.label}
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
          {order?.updatedAt ? new Date(order.updatedAt).toLocaleString() : "Time"}
        </time>
        <p className={`text-base font-normal dark:text-gray-300 text-gray-500 ${descriptionTextColor}`}>
          {description}
        </p>
      </div>
    </li>
  );
};

export default TimelineStep;
