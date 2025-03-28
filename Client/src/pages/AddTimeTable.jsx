import React, { useState } from "react";
import customFetch from "../utils/customFetch";

const AddTimeTable = () => {
  const [formData, setFormData] = useState({
    EmployeeName: "",
    Date: "",
    Task: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await customFetch.post("/timetable", formData);
      if (response.status === 201) {
        // Check for correct status code
        setSuccess("Timetable entry added successfully!");
        setFormData({
          EmployeeName: "",
          Date: "",
          Task: "",
        });
      } else {
        setError("Error creating timetable entry. Please try again.");
      }
    } catch (error) {
      console.error(error); // Log full error for debugging
      setError(
        error.response?.data?.message ||
          "Error creating timetable entry. Please try again."
      );
    }
  };

  return (
    <div className="add-timetable bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add TimeTable Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="EmployeeName" className="block mb-1">
            Employee Name
          </label>
          <input
            type="text"
            name="EmployeeName"
            id="EmployeeName"
            value={formData.EmployeeName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Date" className="block mb-1">
            Date
          </label>
          <input
            type="date"
            name="Date"
            id="Date"
            value={formData.Date}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Task" className="block mb-1">
            Task
          </label>
          <input
            type="text"
            name="Task"
            id="Task"
            value={formData.Task}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add TimeTable Entry
        </button>
      </form>
    </div>
  );
};

export default AddTimeTable;
