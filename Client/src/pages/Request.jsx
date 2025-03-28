
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import RequestStatusGrid from '../Components/RequestStatusGrid';
import AprovedRequest from '../Components/AprovedRequest';
import PendingRequest from '../Components/PendingRequest';
import RejectedRequest from '../Components/RejectedRequest';
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/request/retriveRequest");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { data: [] };
  }
};

const allRequestDetailsContext = createContext({ data: [], refetch: () => {} });

const AllRequest = () => {
  const { data: initialData } = useLoaderData();
  const [data, setData] = useState(initialData);

  const refetch = useCallback(async () => {
    try {
      const { data: refreshedData } = await customFetch.get("/request/retriveRequest");
      setData(refreshedData);
    } catch (error) {
      toast.error('Error refreshing data');
    }
  }, []);

  // Calculate counts based on the request statuses
  const totalRequests = data.length;
  const pendingRequests = data.filter(request => request.status === 'available').length;
  const approvedRequests = data.filter(request => request.status === 'approved').length;
  const rejectedRequests = data.filter(request => request.status === 'reject').length;
  const doneRequests = data.filter(request => request.status === 'done').length;


  return (
    <allRequestDetailsContext.Provider value={{ data, refetch }}>
      <div className='flex flex-col gap-4 h-screen'>
        <RequestStatusGrid 
        total={totalRequests} 
        pending={pendingRequests} 
        approved={approvedRequests} 
        rejected={rejectedRequests} 
        done={doneRequests} 
        />
        <div className='flex flex-col gap-4 w-full overflow-y-auto'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='bg-white shadow-md rounded-sm p-4 border'>
              <AprovedRequest />
            </div>
            <div className='bg-white shadow-md rounded-sm p-4 border'>
              <PendingRequest />
            </div>
            <div className='bg-white shadow-md rounded-sm p-4 border'>
              <RejectedRequest />
            </div>
            <div className="h-40"></div> 
          </div>
        </div>
      </div>
    </allRequestDetailsContext.Provider>
  );
};

export const useAllRequest = () => useContext(allRequestDetailsContext);
export default AllRequest;

