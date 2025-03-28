import React, { useState } from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import signup from "../assets/Images/city-background-design_1300-384.avif";
import { NavBar } from "../Components/index"; // Ensure NavBar is correctly imported

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Register successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // State for form fields and errors
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value) errorMsg = "Name is required.";
        break;
      case "lastName":
        if (!value) errorMsg = "Last Name is required.";
        break;
      case "location":
        if (!value) errorMsg = "Location is required.";
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMsg = "Email is required.";
        } else if (!emailPattern.test(value)) {
          errorMsg = "Email is invalid.";
        }
        break;
      case "password":
        if (!value) {
          errorMsg = "Password is required.";
        } else if (value.length < 6) {
          errorMsg = "Password must be at least 6 characters.";
        }
        break;
      case "confirm_password":
        if (!value) {
          errorMsg = "Confirm Password is required.";
        } else if (value !== formValues.password) {
          errorMsg = "Passwords do not match.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl shadow-black rounded-2xl md:flex-row md:space-y-0 md:mb-15 md:p-0 border border-black">
          <div className="p-6 md:p-10 md:w-[28rem]">
            <h2 className=" mb-5 text-4xl font-bold">Register</h2>

            <Form method="post">
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-3 mt-4 ${
                  errors.name ? "border-red" : "border-gray-100"
                }`}
                placeholder="First Name"
              />
              {errors.name && <p className="text-red">{errors.name}</p>}

              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full border-2 rounded-xl p-3 mt-4 ${
                  errors.lastName ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.lastName && <p className="text-red">{errors.lastName}</p>}

              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                placeholder="Location"
                className={`w-full border-2 rounded-xl p-3 mt-4 ${
                  errors.location ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.location && <p className="text-red">{errors.location}</p>}

              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border-2 rounded-xl p-3 mt-4 ${
                  errors.email ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red">{errors.email}</p>}

              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full border-2 rounded-xl p-3 mt-4 ${
                  errors.password ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-red">{errors.password}</p>}

              <input
                type="password"
                name="confirm_password"
                value={formValues.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full border-2 rounded-xl p-3 mt-4 ${
                  errors.confirm_password ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.confirm_password && (
                <p className="text-red">{errors.confirm_password}</p>
              )}

              <div className="flex flex-col items-center justify-between space-y-6 md:flex-row">
                <div className="text-cyan-700">
                  Are you already a member? <Link to="/login">Log in</Link>
                </div>

                <button
  type="submit"
  className="w-full md:w-auto bg-pink-500 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
  disabled={isSubmitting}
>
  <span className="text-white">
    {isSubmitting ? "Registering..." : "Register"}
  </span>
</button>

              </div>
            </Form>
            <div className="mt-12 border-b border-b-gray-300"></div>
          </div>

          <img src={signup} alt="Sign Up" className="rounded-2xl md:max-w-xl" />
        </div>
      </div>
    </div>
  );
};

export default Register;
