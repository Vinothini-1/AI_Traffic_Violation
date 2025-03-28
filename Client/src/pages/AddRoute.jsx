
import React, { useEffect, useState } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

// Loader function to fetch data
export const loader = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    const reqId = url.searchParams.get('reqId'); // Get request ID from query params

    // Fetch customer and vehicle data in parallel
    const [customerResponse, vehicleResponse, requestResponce] = await Promise.all([
      customFetch(`/users/${params.id}`),  // Fetch customer details using `params.id`
      customFetch(`/vehicle/retrivevehicles`),  // Fetch all vehicles
      customFetch(`/request/retrieveSpecificRequest/${reqId}`),
    ]);

    // Return the fetched data
    return {
      customer: customerResponse.data,
      vehicles: vehicleResponse.data,
      request: requestResponce.data,
      reqId,
      cusId: params.id,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Failed to load data');
    return redirect("/AdminDashboard/request");  // Redirect in case of failure
  }
};

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.formData());

  // Extract Reqid from form data
  const Reqid = formData.get('RequestId');

  try {
    // Add the route
    await customFetch.post('routePath/addRoutePath', Object.fromEntries(formData));
    toast.success('Route Added Successfully');

    //  update status in request
    if (Reqid) {
      try {
        const response = await customFetch.put(`/request/updateRequestStatus/${Reqid}`, {
          status: 'done',
        });
        if (response.status !== 200) {
          throw new Error('Update failed with status code: ' + response.status);
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    } else {
      throw new Error('Request ID is missing');
    }

    return redirect('/AdminDashboard/request');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Failed to add route');
    return null;
  }
};

export default function AddRoute() {
  const { vehicles, customer, request, reqId, cusId } = useLoaderData();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    if (vehicles && Array.isArray(vehicles)) {
      setVehicleOptions(vehicles);  // Set vehicle options
    }

    // Set the minimum date to today
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];  // Format as yyyy-mm-dd
    setMinDate(formattedToday);
  }, [vehicles]);

  // Check if customer data is still loading or missing
  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10'>
      <div className='bg-white px-10 py-20 rounded w-2/3 overflow-auto' style={{ maxHeight: '90vh' }}>
        <h3 className='font-semibold text-green-600 text-3xl text-center'>ADD ROUTE</h3>

        <Form method="post">
          {/* Request ID */}
          <div className='mt-8'>
            <input
              type='text'
              name='RequestId'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              value={reqId || ''}  // Use reqId from loader data with fallback
              readOnly
              hidden
            />
          </div>
          <div className='mt-8'>
            {/* customer ID */}
            <input
              type='text'
              name='CustomerId'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              value={cusId}
              readOnly
              hidden
            />
          </div>

          {/* Display the Customer Name */}
          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Name</label>
            <input
              type='text'
              name='CustomerName'
              defaultValue={customer.user.name + ' ' + customer.user.lastName}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Name'
              readOnly
            />
          </div>

          {/* Display the Phone number */}
          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Number</label>
            <input
              type='text'
              name='ContactNumber'
              defaultValue={request.phoneNo}
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Contact Number'
            />
          </div>

          {/* Google Maps Route Selection */}
          <div className="mt-8">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block p-2 w-1/2 border-2 border-gray-700 text-gray-700 font-bold py-4 rounded hover:bg-green-500 hover:text-white hover:no-underline text-center"
            >
              Select New Route Pin From Google Map
            </a>
          </div>

          {/* Pickup Path */}
          <div className='mt-8'>
            <label className='text-lg font-medium'>Pickup Path Pin</label>
            <input
              type='text'
              name='PickupPath'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Path'
            />
          </div>

          {/* Arrive Date */}
          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Date</label>
            <input
              type='date'
              name='ArriveDate'
              min={minDate}  // Set the minimum date to today
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>

          {/* Arrive Time */}
          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Time</label>
            <input
              type='time'
              name='ArriveTime'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>

          {/* Vehicle Selection */}
          <div className='mt-4'>
            <label className='text-lg font-medium'>Vehicle</label>
            <select
              name='Vehicle'
              className='w-full border-2 border-gray-50 rounded-xl p-3 mt-1'
            >
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

          {/* Submit Button */}
          <div className='mt-4'>
            <button type='submit' className='bg-green-500 text-white font-bold py-4 rounded w-full hover:bg-green-700'>
              ADD
            </button>
          </div>
        </Form>
      </div>
    </div>
  );

}
