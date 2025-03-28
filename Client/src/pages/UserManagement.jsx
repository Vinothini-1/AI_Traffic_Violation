import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoPersonAddSharp, IoBuild, IoTrashSharp } from "react-icons/io5";
import { Form } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { IoSearch } from "react-icons/io5";
import { base64url } from "../../../Utils/base64url";

// Loader to fetch all users
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/getAllusers");
    console.log(data);
    return { users: data.users }; // Return all users
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load Users");
    return { users: [] }; // Return an empty list in case of error
  }
};

function UserManagement() {
  const { users } = useLoaderData(); // Load the user data
  const [userList, setUserList] = useState(users || []);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // UseEffect to update state on data change
  useEffect(() => {
    setUserList(users);
  }, [users]);

  // Function to generate PDF
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
    doc.text("User List", 14, 70);

    const startY = 75;

    const tableColumn = [
      "User ID",
      "Name",
      "Last Name",
      "Email",
      "Location",
      "Role",
    ];
    const tableRows = [];

    userList.forEach((user) => {
      const userData = [
        user._id.slice(0, 6),
        user.name,
        user.lastName,
        user.email,
        user.location,
        user.role,
      ];
      tableRows.push(userData);
    });

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

    doc.save("Users.pdf"); // Save the PDF
  };

  // Filter the users based on the search term
  const filteredUsers = userList.filter((user) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm) ||
      user.lastName.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link to={"../add-user"}>
          <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded shadow-md outline-none border-none select-none flex items-center">
            <IoPersonAddSharp className="mr-2" />
            Add User
          </button>
        </Link>
        {/* Search Input */}
        <div className="relative flex items-center w-full max-w-md">
          {/* Search Icon */}
          <IoSearch className="absolute left-3 text-gray-400 text-xl" />

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
            className="pl-10 pr-4 py-2 w-full border rounded-full shadow-md outline-none text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
          />
        </div>
        {/* Generate PDF Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded shadow-md outline-none border-none select-none flex items-center"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </div>
      <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3 mb-16">
        <strong className="font-medium text-xl text-sky-600">All Users</strong>
        <div
          className="overflow-y-auto mt-3"
          style={{ maxHeight: "600px", paddingBottom: "50px" }}
        >
          <table className="min-w-full text-gray-700">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id.slice(0, 6)}</td> {/* Shortened ID */}
                    <td>
                      <img
                        src={user.avatar}
                        alt={`${user.name} ${user.lastName}`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.location}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Form
                          method="post"
                          action={`../delete-user/${user._id}`}
                        >
                          <button className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none">
                            <IoTrashSharp />
                          </button>
                        </Form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-red-500">
                    No Users Found
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

export default UserManagement;
