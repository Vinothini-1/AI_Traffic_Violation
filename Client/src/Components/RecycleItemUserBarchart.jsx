import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// Register components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RecycleItemsBarChart() {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0)); // Initialize an array for 12 months with 0 values
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchRecycleData() {
      try {
        const response = await customFetch.get("/RItems"); // Fetch recycle item data from your backend
        console.log("Full response:", response);
        const { rItems } = response.data; // Access the rItems array from the response

        // Initialize an array to store counts of recycle items for each month
        const monthCounts = new Array(12).fill(0);

        // Iterate over the fetched rItems data
        rItems.forEach((item) => {
          const submitDate = new Date(item.createdAt); // Assuming `createdAt` is the correct date field
          const month = submitDate.getMonth(); // Get month (0 = January, 11 = December)
          monthCounts[month] += 1; // Increment the count for the respective month
        });

        setMonthlyData(monthCounts); // Update state with the calculated month data
      } catch (error) {
        console.error("Error fetching recycle items data:", error);
        toast.error(
          error?.response?.data?.msg || "Failed to fetch recycle items data"
        );
        setMonthlyData(new Array(12).fill(0)); // Reset data on error
      }
    }

    fetchRecycleData();
  }, []); // Empty dependency array means it runs once on component mount

  // Prepare the data for the chart
  const data = {
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
        label: "Recycle Items Submitted",
        data: monthlyData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }

          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "#E0B1F1");
          gradient.addColorStop(1, "#6D0D90");

          return gradient;
        },
        borderColor: "#E0B1F1",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Arial, sans-serif",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Recycle Items Submitted per Month",
        font: {
          family: "Arial, sans-serif",
          size: 24,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#388E3C",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
      x: {
        ticks: {
          color: "#388E3C",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "500px", margin: "0 auto" }}>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
}
