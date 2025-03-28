import React, { useState } from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const companyData = Object.fromEntries(formData.entries());

  try {
    await customFetch.post("/Company", companyData);
    toast.success("Company added successfully");
    return redirect("/AdminDashboard/Company");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to add company");
    return error;
  }
};

function AddCompany() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // State for form values and errors
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companytype: "plastic",
    stocklimit: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    stocklimit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Real-time validation
    switch (name) {
      case "name":
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: value ? "" : "Company name is required.",
        }));
        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format.",
        }));
        break;
      case "phone":
        let errorMsg = "";
        if (!value) {
          errorMsg = "Telephone number is required.";
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = "Telephone number must be 10 digits.";
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: errorMsg,
        }));
        break;
      case "address":
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: value ? "" : "Address is required.",
        }));
        break;
      case "stocklimit":
        setErrors((prevErrors) => ({
          ...prevErrors,
          stocklimit:
            value && !isNaN(value) ? "" : "Stock limit must be a number.",
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10">
      <div
        className="bg-white px-10 py-20 rounded w-2/3 overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h3 className="font-semibold text-sky-600 text-3xl text-center">
          ADD COMPANY
        </h3>

        <Form method="post">
          <div className="mt-8">
            <label className="text-lg font-medium">Company Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.name ? "border-red" : "border-gray-100"
              }`}
              placeholder="Company Name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red text-sm">{errors.name}</p>}
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.email ? "border-red" : "border-gray-100"
              }`}
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red text-sm">{errors.email}</p>}
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.phone ? "border-red" : "border-gray-100"
              }`}
              placeholder="Phone"
              value={formValues.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="text-red text-sm">{errors.phone}</p>}
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.address ? "border-red" : "border-gray-100"
              }`}
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
              required
            />
            {errors.address && (
              <p className="text-red text-sm">{errors.address}</p>
            )}
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Company Type</label>
            <select
              name="companytype"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              value={formValues.companytype}
              onChange={handleChange}
              required
            >
              <option value="plastic">Plastic</option>
              <option value="metal">Metal</option>
              <option value="glass">Glass</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Stock Limit</label>
            <input
              type="text"
              name="stocklimit"
              id="stocklimit"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.stocklimit ? "border-red" : "border-gray-100"
              }`}
              placeholder="Stock Limit"
              value={formValues.stocklimit}
              onChange={handleChange}
              required
            />
            {errors.stocklimit && (
              <p className="text-red text-sm">{errors.stocklimit}</p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-sky-500 text-white font-bold py-4 rounded w-full hover:bg-sky-700"
              disabled={
                isSubmitting || Object.values(errors).some((error) => error)
              }
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddCompany;
