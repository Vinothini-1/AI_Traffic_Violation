
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import AdminStatusGrid from '../Components/AdminStatusGrid';
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import RequestBarChart from "../Components/RequestBarChart";
import CollectedWasteBarchart from "../Components/CollectedWasteBarchart";
import VehicleBarchart from "../Components/VehicleBarchart";
import RequestTypePieChart from "../Components/RequestTypePieChart";

// Fetch all the necessary data when the page loads
export const loader = async () => {
  try {
    const [employeeResponse, vehicleResponse, requestResponse, userResponse] = await Promise.all([
      customFetch(`/employees`),  // Fetch employees
      customFetch(`/vehicle/retrivevehicles`),  // Fetch all vehicles
      customFetch(`/request/retriveRequest`),  // Fetch requests
      customFetch(`/users/getAllusers`),  // Fetch users
    ]);

    // Count the number of rows for each data set
    const employeeCount = employeeResponse.data.length;
    const vehicleCount = vehicleResponse.data.length;
    const requestCount = requestResponse.data.length;
    const userCount = userResponse.data.length;

    // Return the fetched data and the counts
    return {
      employee: employeeResponse.data,
      vehicles: vehicleResponse.data,
      request: requestResponse.data,
      user: userResponse.data,
      counts: {
        employeeCount,
        vehicleCount,
        requestCount,
        userCount,
      },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Error fetching data.");
    return { 
      employee: [], 
      vehicles: [], 
      request: [], 
      user: [], 
      counts: { 
        employeeCount: 0, 
        vehicleCount: 0, 
        requestCount: 0, 
        userCount: 0 
      } 
    };
  }
};

// Create context for shared state management
const allDetailsContext = createContext({ data: [], refetch: () => {} });

const AllDetails = () => {
  const { employee, vehicles, request, user, counts } = useLoaderData();
  const [data, setData] = useState({ employee, vehicles, request, user });
  const [loading, setLoading] = useState(false);

  // Function to refetch data when needed
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const [employeeResponse, vehicleResponse, requestResponse, userResponse] = await Promise.all([
        customFetch(`/employees`),
        customFetch(`/vehicle/retrivevehicles`),
        customFetch(`/request/retriveRequest`),
        customFetch(`/users/getAllusers`),
      ]);
      console.log("Employee Response:", employeeResponse.data);
      console.log("User Response:", userResponse.data);
      
      setData({
        employee: employeeResponse.data,
        vehicles: vehicleResponse.data,
        request: requestResponse.data,
        user: userResponse.data,
      });
    } catch (error) {
      toast.error('Error refreshing data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Display a loading state if necessary
  if (loading || !data || !counts) {
    return <div>Loading...</div>; // Simple loading state, can be replaced with a spinner
  }

  return (
    <allDetailsContext.Provider value={{ data, refetch }}>
      <div className='flex flex-col gap-4 mb-4'>
        {/* Pass the counts as props to AdminStatusGrid */}
        
        <AdminStatusGrid 
          employeeCount={counts.employeeCount} 
          vehicleCount={counts.vehicleCount} 
          requestCount={counts.requestCount} 
          userCount={counts.userCount} 
        />
      </div>

      <div className='flex flex-row gap-4 w-full h-auto overflow-y-auto'>
        <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
          <RequestBarChart />
        </div>

        {/* Adjusted the size for the pie chart */}
        <div className='flex flex-row gap-4 w-full h-50 bg-white pb-2 mb-4'>
          <div className="w-1/2 h-64 mx-auto">
            <RequestTypePieChart />
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-4 w-full h-auto overflow-x-auto'>
        <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
          <VehicleBarchart />
        </div>
        <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
          <CollectedWasteBarchart />
        </div>
      </div>
    </allDetailsContext.Provider>
  );
};

// Hook to use the context easily in other components
export const useAllDetailsContext = () => useContext(allDetailsContext);

export default AllDetails;
