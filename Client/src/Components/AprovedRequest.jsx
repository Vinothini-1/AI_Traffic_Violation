import React from 'react'
import RequestStatus from '../utils/RequestStatus'
import { useAllRequest } from '../pages/Request'
import { Link } from 'react-router-dom';


export default function AprovedRequest() {

    const { data } = useAllRequest();

    const aproveRequest = data ? data.filter(request => request.status == 'approved') : [];

    if (!data || data.length === 0) {
        return <h1>No Items to display...</h1>;
    }

  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-gray-200 w-full  pt-3'>
        <strong className=' font-medium text-xl text-green-600'>Aproved Request</strong>


        <div className='mt-3'>
            <table className='w-full text-gray-700'>
                <thead>
                    <tr>
                        <th>Request Id</th>

                        <th></th>
                        <th>Title</th>
                        <th>Request Date, Time</th>
                        <th>Request Type</th>
                        <th>Weight (KG)</th>
                        <th>Location</th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {aproveRequest.map((request)=>(
                    <tr key={request._id}>
                        <td>REQ{request._id.slice(0, 6)}</td>
                        <td>
                        <img
                            src={request.itemPhoto || 'default-placeholder.jpg'}
                            alt="Request"
                            className="object-fill rounded h-12 w-12 transform hover:scale-105 hover:h-28 hover:w-28 duration-200"
                        />
                        </td>
                        <td>{request.name}</td>
                        <td>{request.requestDate}</td>
                        <td>{request.category}</td>
                        <td>{request.weight}</td>
                        <td>{request.Location}</td>
                        <td>
                        <Link to={`../addRoute/${request.createdBy}?reqId=${request._id}`}>
                            <button className='bg-sky-500 mr-3 text-white px-4 py-2 hover:bg-green-700 rounded shadow-md outline-none border-none select-none'>
                                ADD ROUTE
                            </button>
                        </Link>

                            
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    </div>
  )
}
