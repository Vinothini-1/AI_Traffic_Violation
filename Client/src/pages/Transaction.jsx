import React, { createContext, useCallback, useContext, useState } from 'react';
import CollectedWasteTableForTransaction from '../Components/CollectedWasteTableForTransaction';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';




export const loader = async () => {
  try {
    const { data } = await customFetch.get("/waste/retriveCollectedWaste");
    console.log('Data fetched: ', data);
    return { data };  
  } catch (error) {
    console.error('Error fetching collected waste data:', error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllCollectedWasteContext = createContext({ data: [], refetch: () => {} });

//kavidu
const Transaction = () => {
  const { data: initialData } = useLoaderData();
  const [data, setData] = useState(initialData);

  const refetch = useCallback(async () => {
    try {
      const { data: refreshedData } = await customFetch.get("/waste/retriveCollectedWaste");
      setData(refreshedData);
    } catch (error) {
      toast.error('Error refreshing data');
    }
  }, []);

  return (
     
    <AllCollectedWasteContext.Provider value={{ data, refetch }}>
      <CollectedWasteTableForTransaction /> 
    </AllCollectedWasteContext.Provider>
  );
};


export const useAllCollectedWaste = () => useContext(AllCollectedWasteContext);

export default Transaction;

