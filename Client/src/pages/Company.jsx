import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { IoBuild, IoTrashSharp, IoSearch } from "react-icons/io5";
import { IoBusinessSharp } from "react-icons/io5";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { base64url } from "../../../Utils/base64url";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/Company");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load Companies");
    return { data: { company: [] } };
  }
};

export default function Company() {
  const { data } = useLoaderData();
  const [companys, setCompanys] = useState(data.company || []);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    setCompanys(data.company || []);
  }, [data]);

  // Filter companies based on search term
  const filteredCompanies = companys.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    doc.text("Company List", 14, 70);

    const startY = 75;

    // Define table columns and rows
    const tableColumn = [
      "Company Name",
      "Email",
      "Phone",
      "Address",
      "Company Type",
      "Stock Limit",
    ];

    const tableRows = filteredCompanies.map((company) => [
      company.name,
      company.email,
      company.phone,
      company.address,
      company.companytype,
      company.stocklimit,
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

    doc.save("Company.pdf"); // Save the PDF
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link to={"../add-company"}>
          <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded shadow-md outline-none border-none select-none flex items-center">
            <IoBusinessSharp className="mr-2" />
            Add Company
          </button>
        </Link>

        {/* PDF generation button */}
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded shadow-md outline-none border-none select-none flex items-center"
        >
          Generate PDF
        </button>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search companies by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 shadow-md outline-none w-full"
        />
        <IoSearch className="absolute right-3 top-3 text-gray-500" />
      </div>

      <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3">
        <strong className="font-medium text-xl text-sky-600">
          All Companies
        </strong>
        <div className="mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Company Type</th>
                <th>Stock Limit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                  <td>{company.address}</td>
                  <td>{company.companytype}</td>
                  <td>{company.stocklimit}</td>
                  <td>
                    <div className="flex flex-row gap-1">
                      <Link to={`../edit-company/${company._id}`}>
                        <button className="bg-sky-500 text-white px-4 py-2 hover:bg-sky-600 rounded shadow-md outline-none border-none select-none">
                          <IoBuild />
                        </button>
                      </Link>

                      <Form
                        method="post"
                        action={`../delete-company/${company._id}`}
                      >
                        <button className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none">
                          <IoTrashSharp />
                        </button>
                      </Form>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-red-500">
                    No companies found.
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
