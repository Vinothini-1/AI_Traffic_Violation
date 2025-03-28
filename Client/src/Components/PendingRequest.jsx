import React, { useState } from 'react';
import RequestStatus from '../utils/RequestStatus';
import { useAllRequest } from '../pages/Request';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export default function PendingRequest() {
  const { data, refetch, isLoading, isError } = useAllRequest();
  const [showConfirm, setShowConfirm] = useState({ visible: false, type: '', id: null });
  const [refresh, setRefresh] = useState(false); 

  // Function to trigger a refresh of data after update
  const handleRefresh = async () => {
    setRefresh((prev) => !prev); 
    await refetch();
  };

  // Function to handle approval
  const handleApprove = async (id) => {
    try {
      const response = await customFetch.put(`/request/updateRequestStatus/${id}`, { status: 'approved' });
      if (response.status === 200) {
        toast.success('Request approved successfully');
        setShowConfirm({ visible: false, type: '', id: null });
        handleRefresh(); 
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'An error occurred during approval.');
    }
  };

  // Function to handle rejection
  const handleReject = async (id) => {
    try {
      const response = await customFetch.put(`/request/updateRequestStatus/${id}`, { status: 'reject' });
      if (response.status === 200) {
        toast.success('Request rejected successfully');
        setShowConfirm({ visible: false, type: '', id: null });
        handleRefresh();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'An error occurred during rejection.');
    }
  };

  const pendingRequests = Array.isArray(data) ? data.filter((request) => request.status === 'available') : [];


  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  if (pendingRequests.length === 0) {
    return (
      <div className="flex items-center justify-center  bg-gray-200">
        <p className="text-xl font-semibold text-sky-500 bg-white px-6 py-4 rounded-lg  mt-4 mb-4">
          No Pending Request
        </p>
      </div>
    );
  }
  return (
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3'>
      <strong className='font-medium text-xl text-sky-600'>Pending Requests</strong>

      <div className='mt-3'>
        <table className='w-full text-gray-700'>
          <thead>
            <tr>
              <th>Request Id</th>
              <th></th>
              <th>Title</th>
              <th>Discription</th>
              <th>Request Date, Time</th>
              <th>Request Type</th>
              <th>Weight (KG)</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr className='hover:bg-gray-50' key={request._id}>
                <td>REQ{request._id.slice(0, 6)}</td>
                <td>
                  <img
                    src={request.itemPhoto || 'default-placeholder.jpg'}
                    alt="Request"
                    className="object-fill rounded h-12 w-12 transform hover:scale-105 hover:h-28 hover:w-28 duration-200"
                  />
                </td>
                <td>{request.name}</td>
                <td>{request.description}</td>
                <td>{request.requestDate}</td>
                <td>{request.category}</td>
                <td>{request.weight}</td>
                <td>{request.Location}</td>
                <td className='flex flex-col gap-2'>
                  <button
                    className='bg-green-500 text-white px-4 py-2 hover:bg-green-700 rounded shadow-md'
                    onClick={() => setShowConfirm({ visible: true, type: 'approve', id: request._id })}
                  >
                    Approve
                  </button>
                  <button
                    className='bg-red text-white px-4 py-2 hover:bg-red-700 rounded shadow-md'
                    onClick={() => setShowConfirm({ visible: true, type: 'reject', id: request._id })}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirm.visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4 text-gray-700">
              Are you sure you want to {showConfirm.type} this request?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => (showConfirm.type === 'approve' ? handleApprove(showConfirm.id) : handleReject(showConfirm.id))}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm({ visible: false, type: '', id: null })}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
