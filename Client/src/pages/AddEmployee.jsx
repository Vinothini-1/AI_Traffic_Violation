import React, { useState } from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const employeeData = Object.fromEntries(formData.entries());

  try {
    await customFetch.post("/employees", employeeData);
    toast.success("Employee added successfully");
    return redirect("/AdminDashboard/staf");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }

  return null;
};

function AddEmployee() {
  const today = new Date().toISOString().split("T")[0];
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // State for form fields and errors
  const [formValues, setFormValues] = useState({
    EmployeeId: "",
    Name: "",
    Email: "",
    JoinDate: today,
    phone: "",
    Street: "",
    City: "",
    PostalCode: "",
    Type: "Driver",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date

    switch (name) {
      case "EmployeeId":
        if (!value) {
          errorMsg = "Employee ID is required.";
        } else if (!value.startsWith("EMP")) {
          errorMsg = "Employee ID must start with 'EMP'.";
        }
        break;
      case "Name":
        if (!value) errorMsg = "Name is required.";
        break;
      case "Email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMsg = "Email is required.";
        } else if (!emailPattern.test(value)) {
          errorMsg = "Email is invalid.";
        }
        break;
      case "phone":
        if (!value) {
          errorMsg = "Telephone number is required.";
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = "Telephone number must be 10 digits.";
        }
        break;
      case "Street":
        if (!value) errorMsg = "Street is required.";
        break;
      case "City":
        if (!value) errorMsg = "City is required.";
        break;
      case "PostalCode":
        if (!value) {
          errorMsg = "Postal code is required.";
        } else if (!/^\d{5}$/.test(value)) {
          errorMsg = "Postal code must be exactly 4 digits.";
        }
        break;
      case "JoinDate":
        if (value > todayDate) {
          errorMsg = "Join Date cannot be in the future.";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  return (
    <div className="bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10">
      <div
        className="bg-white px-10 py-20 rounded w-2/3 overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h3 className="font-semibold text-sky-600 text-3xl text-center">
          ADD EMPLOYEE
        </h3>

        <Form method="post">
          <div className="mt-8">
            <label className="text-lg font-medium">Employee ID</label>
            <input
              type="text"
              name="EmployeeId"
              id="EmployeeId"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.EmployeeId ? "border-red" : "border-gray-100"
              }`}
              placeholder="Employee ID"
              value={formValues.EmployeeId}
              onChange={handleChange}
            />
            {errors.EmployeeId && (
              <p className="text-red">{errors.EmployeeId}</p>
            )}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              name="Name"
              id="Name"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.Name ? "border-red" : "border-gray-100"
              }`}
              placeholder="Name"
              value={formValues.Name}
              onChange={handleChange}
            />
            {errors.Name && <p className="text-red">{errors.Name}</p>}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="Email"
              id="Email"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.Email ? "border-red" : "border-gray-100"
              }`}
              placeholder="Email"
              value={formValues.Email}
              onChange={handleChange}
            />
            {errors.Email && <p className="text-red">{errors.Email}</p>}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Join Date</label>
            <input
              type="date"
              name="JoinDate"
              id="JoinDate"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.JoinDate ? "border-red" : "border-gray-100"
              }`}
              value={formValues.JoinDate}
              onChange={handleChange}
            />
            {errors.JoinDate && <p className="text-red">{errors.JoinDate}</p>}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Telephone No</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.phone ? "border-red" : "border-gray-100"
              }`}
              placeholder="Telephone No"
              value={formValues.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red">{errors.phone}</p>}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Street</label>
            <input
              type="text"
              name="Street"
              id="Street"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.Street ? "border-red" : "border-gray-100"
              }`}
              placeholder="Street"
              value={formValues.Street}
              onChange={handleChange}
            />
            {errors.Street && <p className="text-red">{errors.Street}</p>}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">City</label>
            <input
              type="text"
              name="City"
              id="City"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.City ? "border-red" : "border-gray-100"
              }`}
              placeholder="City"
              value={formValues.City}
              onChange={handleChange}
            />
            {errors.City && <p className="text-red">{errors.City}</p>}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Postal Code</label>
            <input
              type="text"
              name="PostalCode"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.PostalCode ? "border-red" : "border-gray-100"
              }`}
              placeholder="Postal Code"
              value={formValues.PostalCode}
              onChange={handleChange}
            />
            {errors.PostalCode && (
              <p className="text-red">{errors.PostalCode}</p>
            )}
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium">Type</label>
            <select
              name="Type"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              value={formValues.Type}
              onChange={handleChange}
            >
              <option value="Driver">Driver</option>
              <option value="Collector">Collector</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-sky-500 text-white font-bold py-4 rounded w-full hover:bg-sky-700"
              disabled={
                isSubmitting || Object.values(errors).some((error) => error)
              }
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddEmployee;
