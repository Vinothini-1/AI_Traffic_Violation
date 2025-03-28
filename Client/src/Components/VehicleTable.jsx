import React, { useState, useEffect, useRef } from "react";
import { IoBuild, IoTrashSharp, IoPrint } from "react-icons/io5";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { base64url } from "../../../Utils/base64url";

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showConfirm, setShowConfirm] = useState({ visible: false, id: null });
  const tableRef = useRef(); // Reference for the table

  // Fetch all vehicles initially
  const fetchVehicles = async () => {
    try {
      const { data } = await customFetch.get("/vehicle/retrivevehicles");
      setVehicles(data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await customFetch.delete(`/vehicle/deleteVehicle/${id}`);
      toast.success("Vehicle deleted successfully!");
      fetchVehicles();
      setShowConfirm({ visible: false, id: null });
    } catch (error) {
      toast.error("Failed to delete vehicle");
      console.error("Delete error", error);
    }
  };

  const openConfirmModal = (id) => {
    setShowConfirm({ visible: true, id });
  };

  const closeConfirmModal = () => {
    setShowConfirm({ visible: false, id: null });
  };

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.VehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.VehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.ChassiNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();

    // Adding a frame around the PDF content
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // Adding a company logo to the header
    doc.addImage(base64url, "PNG", 10, 10, 50, 20);

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Eco Recycle Company", 70, 15);

    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text("Eco Recycle, 123 Green Street, Recycle City, 54321", 70, 22);

    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 70, 29);

    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text("Contact: info@ecorecycle.com", 14, 45);
    doc.text("Phone: +94 772931811", 14, 50);
    doc.text("Website: www.ecorecycle.com", 14, 55);

    doc.setFontSize(16);
    doc.setTextColor(34, 153, 84);
    doc.text("Vehicle List", 14, 70);

    const startY = 75;

    const tableColumn = [
      "Vehicle Number",
      "Vehicle Name",
      "Chassi Number",
      "Vehicle Category",
      "Register Date",
    ];
    const tableRows = filteredVehicles.map((vehicle) => [
      vehicle.VehicleNumber,
      vehicle.VehicleName,
      vehicle.ChassiNumber,
      vehicle.VehicleCategory,
      vehicle.AddDate,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: startY,
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [34, 153, 84],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [234, 248, 239],
      },
      margin: { top: startY },
    });

    doc.save("vehicle_list.pdf");
  };

  return (
    <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3">
      <strong className="font-medium text-xl text-orange-600">
        All Vehicles
      </strong>

      {/* Search Input */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by Vehicle Number, Name, or Chassi Number"
          className="px-4 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Generate PDF Button */}
      <div className="mb-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded shadow-md"
        >
          <IoPrint className="inline-block mr-2" />
          Generate Report
        </button>
      </div>

      {/* Vehicle Table */}
      <table ref={tableRef} className="w-full text-gray-700">
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Vehicle Name</th>
            <th>Chassi Number</th>
            <th>Vehicle Category</th>
            <th>Register Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No vehicles found
              </td>
            </tr>
          ) : (
            filteredVehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.VehicleNumber}</td>
                <td>{vehicle.VehicleName}</td>
                <td>{vehicle.ChassiNumber}</td>
                <td>{vehicle.VehicleCategory}</td>
                <td>{vehicle.AddDate}</td>
                <td>
                  <div className="flex gap-1">
                    <Link to={`../EditVehicle/${vehicle._id}`}>
                      <button className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 rounded shadow-md">
                        <IoBuild />
                      </button>
                    </Link>
                    <button
                      className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md"
                      onClick={() => openConfirmModal(vehicle._id)}
                    >
                      <IoTrashSharp />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showConfirm.visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this vehicle?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(showConfirm.id)}
                className="px-4 py-2 bg-red text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
