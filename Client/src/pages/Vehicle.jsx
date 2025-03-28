
import React, { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import VehicleTable from '../Components/VehicleTable' 
import { Link } from 'react-router-dom';
import { IoCar  } from "react-icons/io5";


export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/vehicle/retrivevehicles");
    console.log('Data fetched:', data);
    return { data };
  } catch (error) {
    console.error('Error fetching route data:', error); 
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const allVehicleDetailsContext = createContext();


const AllVehicles = () => {
  const { data } = useLoaderData();
  console.log(data);

  return (

    <div>
          <div className='mt-4'>

            <Link to={"../AddVehicle"}>
              <button className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 rounded shadow-md outline-none border-none select-none flex items-center">
                <IoCar  className="mr-2" />
                Add Vehicle
              </button>
            </Link>
            
          </div>
          <div className='mt-4'>
          <allVehicleDetailsContext.Provider value={{ data }}>
            <VehicleTable />
            </allVehicleDetailsContext.Provider>
          </div>
    </div>

  );
};
export const useAllVehicle = () => useContext(allVehicleDetailsContext);

export default AllVehicles;


