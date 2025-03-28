import React, { useEffect, useState } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useParams, useSearchParams } from 'react-router-dom';


export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.post('vehicle/addVehicle', Object.fromEntries(formData));
    toast.success('Vehicle Added Successfully');
    return redirect("../vehicle");
  } catch (error) {
    console.error(error);  // Log error for debugging
    toast.error(error?.response?.data?.msg || 'An error occurred');
    return redirect("../vehicle");
  }
};




export default function AddVehicle() {

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10'>
      <div className='bg-white px-10 py-20 rounded w-2/3 overflow-auto' style={{ maxHeight: '90vh' }}>
        <h3 className='font-semibold text-orange-600 text-3xl text-center'>ADD VEHICLE</h3>

        <Form method="post">
          <div className='mt-8'>
            <label className='text-lg font-medium'>Vehicle Number</label>
            <input
              type='text'
              name='VehicleNumber'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Vehicle Number'
            />
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Vehicle Name</label>
            <input
              type='text'
              name='VehicleName'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Vehicle Name'
            />
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Chassi Number</label>
            <input
              type='text'
              name='ChassiNumber'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Chassi Number'
            />
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Vehicle Category</label>
            <select
              name='VehicleCategory'
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
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              value={today} 
              readOnly={false}
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
  )
}
