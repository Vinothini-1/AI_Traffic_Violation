import React, { useState } from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData.entries());

  try {
    await customFetch.post("/auth/register", userData);
    toast.success("User added successfully");
    return redirect("/AdminDashboard/user-management");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Error adding user");
    return error;
  }

  return null;
};

function AddUser() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // State for form values and errors
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Real-time validation
    switch (name) {
      case "name":
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: value ? "" : "Name is required.",
        }));
        break;
      case "lastName":
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: value ? "" : "Last name is required.",
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
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value.length >= 6 ? "" : "Password must be at least 6 characters.",
        }));
        break;
      case "location":
        setErrors((prevErrors) => ({
          ...prevErrors,
          location: value ? "" : "Location is required.",
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
          ADD USER
        </h3>

        <Form method="post">
          {/* Name Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.name ? "border-red" : "border-gray-100"
              }`}
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red text-sm">{errors.name}</p>}
          </div>

          {/* Last Name Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.lastName ? "border-red" : "border-gray-100"
              }`}
              placeholder="Last Name"
              value={formValues.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <p className="text-red text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.password ? "border-red" : "border-gray-100"
              }`}
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red text-sm">{errors.password}</p>
            )}
          </div>

          {/* Location Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              className={`w-full border-2 rounded-xl p-3 mt-1 ${
                errors.location ? "border-red" : "border-gray-100"
              }`}
              placeholder="Location"
              value={formValues.location}
              onChange={handleChange}
              required
            />
            {errors.location && (
              <p className="text-red text-sm">{errors.location}</p>
            )}
          </div>

          {/* Submit Button */}
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

export default AddUser;
