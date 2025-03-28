import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { IoBuild, IoTrashSharp, IoSearch } from "react-icons/io5";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoPersonAddSharp } from "react-icons/io5";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Loader to fetch all timetable data
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/timetable");
    console.log(data); // Check data structure in the console log
    return { data: data.timeTables || [] }; // Ensure the data matches what you're expecting
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load timetables");
    return { data: [] }; // Return an empty array in case of error
  }
};

export default function TimeTable() {
  const { data } = useLoaderData(); // Load data using useLoaderData from React Router
  const [timetables, setTimetables] = useState([]); // Initialize state with empty array
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

  // Set timetables when data is loaded
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTimetables(data); // Update state only if data is a valid array
    }
  }, [data]);

  // Filter timetables based on search term (employee name or task)
  const filteredTimetables = timetables.filter(
    (timetable) =>
      timetable.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timetable.Task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate a PDF report of the timetable
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Timetable Report", 14, 10);

    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 20);

    const tableColumn = ["Employee Name", "Date", "Task"];

    // Define table rows by mapping the timetables' data
    const tableRows = timetables.map((timetable) => [
      timetable.EmployeeName,
      new Date(timetable.Date).toLocaleDateString(),
      timetable.Task,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 30 },
    });

    // Save the PDF
    doc.save("timetables.pdf");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link to={"../add-time-table"}>
          <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded shadow-md outline-none border-none select-none flex items-center">
            <IoPersonAddSharp className="mr-2" />
            Add Timetable
          </button>
        </Link>
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded shadow-md outline-none border-none select-none flex items-center"
        >
          Generate PDF
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search timetables by employee name or task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          className="border rounded px-4 py-2 shadow-md outline-none w-full"
        />
        <IoSearch className="absolute right-3 top-3 text-gray-500" />{" "}
        {/* Search Icon */}
      </div>

      <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3">
        <strong className="font-medium text-xl text-sky-600">
          All Timetables
        </strong>
        <div className="mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Task</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTimetables.map((timetable) => (
                <tr key={timetable._id}>
                  <td>{timetable.EmployeeName}</td>
                  <td>{new Date(timetable.Date).toLocaleDateString()}</td>
                  <td>{timetable.Task}</td>
                  <td>
                    <div className="flex flex-row gap-1">
                      <Link to={`../edit-timetable/${timetable._id}`}>
                        <button className="bg-sky-500 text-white px-4 py-2 hover:bg-sky-600 rounded shadow-md outline-none border-none select-none">
                          <IoBuild />
                        </button>
                      </Link>
                      <Form
                        method="post"
                        action={`../delete-time-table/${timetable._id}`}
                      >
                        <button className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none">
                          <IoTrashSharp />
                        </button>
                      </Form>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTimetables.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-red-500">
                    No timetables found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
