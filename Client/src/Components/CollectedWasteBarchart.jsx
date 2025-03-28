
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import customFetch from "../utils/customFetch";// Adjust this import to your actual customFetch path
import { toast } from 'react-toastify';

// Register components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CollectedWasteBarchart() {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0)); // Initialize an array for 12 months with 0 values

  useEffect(() => {
    async function fetchRequestData() {
      try {
        const { data } = await customFetch.get("/waste/retriveCollectedWaste");
        console.log('data fetched :', data);

        // Initialize an array to store counts of requests for each month
        const monthCounts = new Array(12).fill(0);

        // Iterate over the fetched data
        data.forEach(request => {
          const requestDate = new Date(request.CollectedDate);
          const month = requestDate.getMonth(); // Get month (0 = January, 11 = December)
          monthCounts[month] += 1; // Increment the count for the respective month
        });

        setMonthlyData(monthCounts); // Update state with the calculated month data
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Failed to fetch data');
        setMonthlyData(new Array(12).fill(0)); // Reset data on error
      }
    }

    fetchRequestData();
  }, []); // Empty dependency array means it runs once on component mount

  // Prepare the data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Number of Collected Requests',
        data: monthlyData, // Use dynamically fetched data
        backgroundColor: 'rgba(89, 245, 39, 0.8)',
        borderColor: 'rgba(89, 245, 39, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Collected Requests per Month',
        font: {
            size: 20, // Change this to adjust title font size
          }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
