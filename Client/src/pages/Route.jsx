
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import RouteTable from '../Components/RouteTable';
import RouteTableApproved from '../Components/RouteTableApproved'
import RouteTableSheduled from '../Components/RouteTableSheduled'
import RouteStatusGrid from '../Components/RouteStatusGrid'
import { route } from 'express/lib/router';

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/routePath/retriveRoutePath");
    console.log('Data fetched:', data);
    return { data };
  } catch (error) {
    console.error('Error fetching route data:', error); 
    toast.error(error?.response?.data?.msg);
    return { data: [] };
  }
};

const allRouteDetailsContext = createContext({ data: [], refetch: () => {} });

const AllRoutes = () => {
  const { data: initialData } = useLoaderData();
  const [data, setData] = useState(initialData);

  const refetch = useCallback(async () => {
    try {
      const { data: refreshedData } = await customFetch.get("/routePath/retriveRoutePath");
      setData(refreshedData);
    } catch (error) {
      toast.error('Error refreshing data');
    }
  }, []);

  const totalRoute = data.length;
  const approvedRequests = data.filter(route => route.Status === 'approved').length;
  const sheduledRequests = data.filter(route => route.Status === 'Scheduled').length;

  return (
    <allRouteDetailsContext.Provider value={{ data, refetch }}>
      <div className="mb-10"> 
              <RouteStatusGrid 
              total={totalRoute}
              sheduled={sheduledRequests}
              approved={approvedRequests}
              />
          </div>
      <div className="w-full h-screen overflow-x-auto pb-1">
    
          <div className="mb-10"> 
              <RouteTableSheduled />
          </div>

          <div className="mb-10"> 
              <RouteTableApproved />
          </div>

          <div className="mb-10">
              <RouteTable />
          </div>

          <div className="h-40"></div> 
      </div>

    </allRouteDetailsContext.Provider>
  );
};

export const useAllRoutes = () => useContext(allRouteDetailsContext);

export default AllRoutes;
