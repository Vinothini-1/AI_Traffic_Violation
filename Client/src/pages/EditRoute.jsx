import React, { useEffect, useState } from 'react';
import { useParams, Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

// Loader function to fetch route and vehicle data
export const loader = async ({ params }) => {
  try {
    const [routeResponse, vehicleResponse] = await Promise.all([
      customFetch(`/routePath/retriveSpecificRoutePath/${params.id}`),
      customFetch(`/vehicle/retrivevehicles`)
    ]);

    return {
      route: routeResponse.data,
      vehicles: vehicleResponse.data
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load data");
    return redirect("/AdminDashboard/route");
  }
};

// Action function for handling form updating
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.put(`/routePath/updateRoutePath/${params.id}`, data);
    
    if (response.status === 200) {
      toast.success("Route updated successfully");
      return redirect("../route");
    } else {
      throw new Error("Update failed with status code: " + response.status);
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function EditRoute() {
  const { route, vehicles } = useLoaderData();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [minDate, setMinDate] = useState('');

  // Populate vehicle options when data is fetched
  useEffect(() => {
    if (vehicles && Array.isArray(vehicles)) {
      setVehicleOptions(vehicles);
      //console.log('Vehicle Options:', vehicles); // Debugging
    }

     // Set the minimum date to today
     const today = new Date();
     const formattedToday = today.toISOString().split("T")[0];  // Format as yyyy-mm-dd
     setMinDate(formattedToday);
  }, [vehicles]);

  if (!route) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10'>
      <div className='bg-white px-10 py-20 rounded w-2/3 overflow-auto' style={{ maxHeight: '90vh' }}>
        <h3 className='font-semibold text-green-600 text-3xl text-center'>UPDATE ROUTE</h3>

        <Form method="post">
          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Name</label>
            <input
              type='text'
              name='CustomerName'
              defaultValue={route.CustomerName}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Name'
            />
          </div>

          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Number</label>
            <input
              type='text'
              name='ContactNumber'
              defaultValue={route.ContactNumber}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Number'
            />
          </div>

          <div className="mt-8">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block p-2 w-1/2 border-2 border-gray-700 text-gray-700 font-bold py-4 rounded hover:bg-sky-400 hover:text-white hover:no-underline text-center"
            >
              Select New Route Pin From Google Map
            </a>
          </div>

          <div className='mt-8'>
            <label className='text-lg font-medium'>Pickup Path Pin</label>
            <input
              type='text'
              name='PickupPath'
              defaultValue={route.PickupPath}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Path'
            />
          </div>

          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Date</label>
            <input
              type='date'
              name='ArriveDate'
              min={minDate} 
              defaultValue={route.ArriveDate}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>

          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Time</label>
            <input
              type='time'
              name='ArriveTime'
              defaultValue={route.ArriveTime}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>

          {/* Vehicle selection */}
          <div className='mt-4'>
            <label className='text-lg font-medium'>Vehicle</label>
            <select
              name='Vehicle'
              defaultValue={route.Vehicle}
              className='w-full border-2 border-gray-50 rounded-xl p-3 mt-1'
            >
              <option value={route.Vehicle}>{route.Vehicle}</option>
              {vehicleOptions.length > 0 ? (
                vehicleOptions.map(vehicle => (
                  <option key={vehicle._id} value={vehicle.VehicleNumber}>
                    {vehicle.VehicleNumber} - {vehicle.VehicleName}
                  </option>
                ))
              ) : (
                <option disabled>No vehicles available</option>
              )}
            </select>
          </div>

          <div className='mt-4'>
            <button type='submit' className='bg-green-500 text-white font-bold py-4 rounded w-full hover:bg-green-700'>
              SUBMIT
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
