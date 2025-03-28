import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import customFetch from "../utils/customFetch"; // Adjust this import to your actual customFetch path
import { toast } from 'react-toastify';

// Register components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EmployeeBarchart() {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0)); // Initialize an array for 12 months with 0 values

  useEffect(() => {
    async function fetchRequestData() {
      try {
        const { data } = await customFetch.get("/employees");
        console.log('data fetched:', data);

        // Initialize an array to store counts of users per month
        const monthCounts = new Array(12).fill(0);

        // Iterate over the fetched data and convert joinDate to Date object
        data.forEach(user => {
          const requestDate = new Date(user.JoinDate); // Parse the joinDate string
          
          if (!isNaN(requestDate)) { // Ensure valid date parsing
            const month = requestDate.getMonth(); // Get month (0 = January, 11 = December)
            monthCounts[month] += 1; // Increment the count for the respective month
          }
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
        label: 'Number of Users Joined',
        data: monthlyData, // Use dynamically fetched data
        backgroundColor: 'rgba(0, 128, 4, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Users Joined per Month',
        font: {
          size: 20, // Adjust title font size
        },
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
