import React, { useState } from "react";
import { useAllCollectedWaste } from "../pages/Transaction";
import { IoCash } from "react-icons/io5";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";


export default function CollectedWasteTableForTransaction() {
  const { data: waste, refetch } = useAllCollectedWaste();
  const [showConfirm, setShowConfirm] = useState({ visible: false, id: null });
  const [showWarning, setShowWarning] = useState(false); // For warning before deletion
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = waste.filter(
    (w) =>
      w.CustomerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.CustomerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto bg-white border border-gray-200">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by Customer ID or Customer Name"
          className="w-full px-4 py-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table id="tableToExport" className="min-w-[1000px] w-full text-gray-700">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Waste Category</th>
            <th>Collected Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((waste) => (
            <tr key={waste._id}>
              <td>{waste.CustomerId}</td>
              <td>{waste.CustomerName}</td>
              <td>{waste.Price}</td>
              <td>{waste.Weight}</td>
              <td>{waste.WasteCategory}</td>
              <td>{waste.CollectedDate}</td>
              <td>
                <div className="flex flex-row gap-1 no-print">
                    <Link to={`../payment/${waste._id}?cusId=${waste.CustomerId}`}>
                        <button className="px-4 py-2 text-white bg-green-500 rounded shadow-md hover:bg-green-600">
                            <IoCash />
                        </button>
                    </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
