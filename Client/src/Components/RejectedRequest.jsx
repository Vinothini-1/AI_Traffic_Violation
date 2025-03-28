import React, { useState } from 'react';
import { useAllRequest } from '../pages/Request';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RejectedRequest() {
  const { data, refetch } = useAllRequest();
  const [showConfirm, setShowConfirm] = useState({ visible: false, id: null });
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const navigate = useNavigate();

  // Function to handle approval after validation
  const handleApprove = async (id) => {
    try {
      const response = await customFetch.put(`/request/updateRequestStatus/${id}`, {
        status: 'available',
      });
      if (response.status === 200) {
        toast.success('Request approved successfully');
        setShowConfirm({ visible: false, id: null }); 
        setIsRefreshing(true); 
        await refetch(); 
        setIsRefreshing(false);
      } else {
        throw new Error('Update failed with status code: ' + response.status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error approving request.');
    }
  };

  // Filter out rejected requests
  const rejectedRequest = data ? data.filter(request => request.status === 'reject') : [];

  // Display message if there are no rejected requests
  if (rejectedRequest.length === 0) {
    return (
      <div className="flex items-center justify-center  bg-gray-200">
        <p className="text-xl font-semibold text-red bg-white px-6 py-4 rounded-lg  mt-4 mb-4">
          No Rejected Request
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3 mb-4'>
      <strong className='font-medium text-xl text-red'>Rejected Requests</strong>

      <div className='table-container mt-3 mb-4'>
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
            {rejectedRequest.map((request) => (
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
                <td>
                  <button
                    className='bg-green-500 text-white px-4 py-2 hover:bg-green-700 rounded shadow-md outline-none border-none select-none'
                    onClick={() => setShowConfirm({ visible: true, id: request._id })}
                  >
                    Approve
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
              Are you sure you want to approve this request?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleApprove(showConfirm.id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm({ visible: false, id: null })}
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
