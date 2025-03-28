import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { IoBuild, IoTrashSharp, IoSearch, IoTimeSharp } from "react-icons/io5";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoPersonAddSharp } from "react-icons/io5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { base64url } from "../../../Utils/base64url";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/employees");
    console.log(data);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load employees");
    return { employee: [] };
  }
};

export default function Staf() {
  const { data } = useLoaderData(); // Load data using useLoaderData from React Router
  const [employees, setEmployees] = useState(data.employee || []);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

  useEffect(() => {
    setEmployees(data.employee || []);
  }, [data]);

  // Filter employees based on search term (name or email)
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    doc.text("Employee List", 14, 70);

    const startY = 75;

    const tableColumn = [
      "Employee ID",
      "Name",
      "Email",
      "Join Date",
      "City",
      "Type",
    ];

    const tableRows = employees.map((employee) => [
      employee.EmployeeId,
      employee.Name,
      employee.Email,
      new Date(employee.JoinDate).toLocaleDateString(),
      employee.City,
      employee.Type,
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

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("All rights reserved © Eco Recycle Company", 14, footerY);
    doc.text(
      `Page ${doc.internal.getNumberOfPages()}`,
      pageWidth - 30,
      footerY,
      { align: "right" }
    );

    doc.save("employees.pdf");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link to={"../add-employee"}>
          <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded shadow-md outline-none border-none select-none flex items-center">
            <IoPersonAddSharp className="mr-2" />
            Add Employee
          </button>
        </Link>

        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded shadow-md outline-none border-none select-none flex items-center"
        >
          Generate PDF
        </button>
      </div>
      <Link to={"../time-table"}>
        <button className="bg-red-400 text-white px-4 mb-4 py-2 hover:bg-red-800 rounded shadow-md outline-none border-none select-none flex items-center">
          <IoTimeSharp className="mr-2" />
          View TimeTable
        </button>
      </Link>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search employees by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          className="border rounded px-4 py-2 shadow-md outline-none w-full"
        />
        <IoSearch className="absolute right-3 top-3 text-gray-500" />{" "}
        {/* Search Icon */}
      </div>

      <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3">
        <strong className="font-medium text-xl text-sky-600">
          All Employees
        </strong>
        <div className="mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Email</th>
                <th>Name</th>
                <th>Join Date</th>
                <th>Street</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.EmployeeId}>
                  <td>{employee.EmployeeId}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.Name}</td>
                  <td>{new Date(employee.JoinDate).toLocaleDateString()}</td>
                  <td>{employee.Street}</td>
                  <td>{employee.City}</td>
                  <td>{employee.PostalCode}</td>
                  <td>{employee.Type}</td>
                  <td>
                    <div className="flex flex-row gap-1">
                      <Link to={`../edit-employee/${employee._id}`}>
                        <button className="bg-sky-500 text-white px-4 py-2 hover:bg-sky-600 rounded shadow-md outline-none border-none select-none">
                          <IoBuild />
                        </button>
                      </Link>
                      <Form
                        method="post"
                        action={`../delete-employee/${employee._id}`}
                      >
                        <button className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none">
                          <IoTrashSharp />
                        </button>
                      </Form>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-red-500">
                    No employees found.
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
