import React, { useEffect, useState } from 'react';
import { useParams, Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  console.log("Vehicle ID:", params.id);  // Log ID for debugging
  try {
    const { data } = await customFetch(`/vehicle/retriveSpecificVehicle/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load data");
    return redirect("/AdminDashboard/vehicle");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.put(`/vehicle/updatevehicle/${params.id}`, data);
    
    if (response.status === 200) {
      toast.success("Vehicle updated successfully");
      return redirect("/AdminDashboard/vehicle");
    } else {
      throw new Error("Update failed with status code: " + response.status);
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function EditVehicle() {
  const today = new Date().toISOString().split('T')[0];

  // Fetch the data using useLoaderData
  const data = useLoaderData();

  return (
    <div className='bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10'>
      <div className='bg-white px-10 py-20 rounded w-2/3 overflow-auto' style={{ maxHeight: '90vh' }}>
        <h3 className='font-semibold text-orange-600 text-3xl text-center'>Edit VEHICLE</h3>

        <Form method="post">
          <div className='mt-8'>
            <label className='text-lg font-medium'>Vehicle Number</label>
            <input
              type='text'
              name='VehicleNumber'
              defaultValue={data?.VehicleNumber || ''} // Use the fetched data
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Vehicle Number'
            />
          </div>

          <div className='mt-8'>
            <label className='text-lg font-medium'>Vehicle Name</label>
            <input
              type='text'
              name='VehicleName'
              defaultValue={data?.VehicleName || ''} // Use the fetched data
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Vehicle Name'
            />
          </div>

          <div className='mt-8'>
            <label className='text-lg font-medium'>Chassi Number</label>
            <input
              type='text'
              name='ChassiNumber'
              defaultValue={data?.ChassiNumber || ''} // Use the fetched data
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Chassi Number'
            />
          </div>

          <div className='mt-8'>
            <label className='text-lg font-medium'>Vehicle Category</label>
            <select
              name='VehicleCategory'
              defaultValue={data?.VehicleCategory || ''} // Use the fetched data
              className='w-full border-2 border-gray-50 rounded-xl p-3 mt-1'
            >
              <option value="Heavy Duty">Heavy Duty</option>
              <option value="Medium Duty">Medium Duty</option>
              <option value="Compactor">Compactor</option>
              <option value="Dual Purpose">Dual Purpose</option>
            </select>
          </div>

          <div className='mt-4'>
            <label className='text-lg font-medium'>Register Date</label>
            <input
              type='date'
              name='AddDate'
              defaultValue={data?.AddDate || today} // Default to today's date if not present
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              readOnly={true}
            />
          </div>

          <div className='mt-4'>
            <button type='submit' className='bg-orange-500 text-white font-bold py-4 rounded w-full hover:bg-orange-700'>
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}