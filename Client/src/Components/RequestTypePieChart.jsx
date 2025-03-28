import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import customFetch from "../utils/customFetch"; // Adjust this import path as needed
import { toast } from 'react-toastify';

// Register components for Pie chart in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function RequestTypePieChart() {
  const [categoryData, setCategoryData] = useState({}); // Initialize an object to store category counts

  useEffect(() => {
    async function fetchRequestData() {
      try {
        const { data } = await customFetch.get("/request/retriveRequest");
        console.log('data fetched:', data);

        // Initialize an object to store counts of requests per category
        const categoryCounts = {};

        // Iterate over the fetched data and count the categories
        data.forEach(request => {
          const category = request.category; // Assuming 'category' is the field name in your model

          // Increment the count for this category
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        });

        setCategoryData(categoryCounts); // Update state with the calculated category data
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Failed to fetch data');
        setCategoryData({}); // Reset data on error
      }
    }

    fetchRequestData();
  }, []); // Empty dependency array means it runs once on component mount

  // Prepare the data for the pie chart
  const categories = Object.keys(categoryData); // Get all categories (labels for the pie chart)
  const categoryCounts = Object.values(categoryData); // Get the counts for each category (data for the pie chart)

  const data = {
    labels: categories, // Use categories as labels
    datasets: [
      {
        label: 'Number of Requests per Category',
        data: categoryCounts, // Use dynamically fetched category data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ], // Different colors for different categories
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
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
        text: 'Requests per Category',
        font: {
          size: 20, // Adjust title font size
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
