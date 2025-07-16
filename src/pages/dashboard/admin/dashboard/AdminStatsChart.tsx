/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }: any) => {
  const pieData = {
    labels: ["Total Orders", "Total Products", "Total Reviews", "All Users"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats.totalOrders,
          stats.totalProducts,
          stats.totalReviews,
          stats.totalUsers,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",  
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
        ],
      },
    ],
  };

  // line chart
  const monthlyData = new Array(12).fill(0);
  stats.monthlyEarnings.forEach((item : any)=> {
    const monthIndex = new Date().getMonth();
    monthlyData[monthIndex] = item.earnings || item.month;
});

  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Earnings",
        data: monthlyData,
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="mt-12 space-y-8">
      <h2>Admin Stats overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* pie chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Pie data={pieData} options={options} />
        </div>
        {/* line chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsChart;