import React, { useEffect, useState } from "react";
import { Link, useNavigation, useOutletContext, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { FormRow } from "../Components";
import profileImg from "../assets/profile/profile.jpg";
import { useLoaderData } from "react-router-dom";
import { useDashbordContext } from "./DashboardLayout";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FaUserCircle } from "react-icons/fa";

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log("ïnside", formData)
  try {
    await customFetch.put(`/bank/${bankDetails._id}`, formData);
    toast.success("Bank Details updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }

  return null;
};

const ViewBankDetails = () => {
  const { user } = useOutletContext();
  console.log("uuuuuuuuuuu ", user);

  const fetchBankDetails = async (userId) => {
    try {
      const response = await customFetch.get(`/bank/${userId}`); // Replace with your API call
      setBankDetails(response.data); // Store bank details in state
      console.log("response", response.data)
    } catch (error) {
      console.log("Noooo response")

      toast.error("Failed to fetch bank details");
    }
  };

  // Fetch bank details when component mounts
  useEffect(() => {
    if (user?._id) {
      fetchBankDetails(user._id); // Fetch data using userId
    }
  }, [user]);

  const handleDelete = async () => {
    try {
      await customFetch.delete(); // DELETE request to your endpoint
      navigate("/dashboard/Bank-Details");
      toast.success("Bank details deleted successfully");
      // Optionally redirect or update state after deletion
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to delete bank details");
    }
  };

  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [bankDetails, setBankDetails] = useState({
    accountnumber: "",
    accountname: "",
    bankname: "",
    branchcode: ""
  });
  return (
    <div>
      <div className="flex items-center justify-center">
        {/* <!--Card Container--> */}
        <div className="relative   m-6 space-y-10 bg-white shadow-2xl  rounded-2xl  border border-black ">
          <h2 className="font-mono mb-5 text-4xl font-bold text-center mt-4">
            My Bank Details
          </h2>
          <div className="flex">

            <div className="flex justify-center items-center border flex-1">
              <Form
                method="post"
                className="grid grid-cols-2 gap-4 p-6"
                encType="multipart/form-data"
              >
                <FormRow
                  type="text"
                  name="Account Number"
                  defaulyValue={bankDetails?.accountnumber}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <FormRow
                  type="text"
                  name="Account Name"
                  defaulyValue={bankDetails?.accountname}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <FormRow
                  type="text"
                  name="Bank Name"
                  defaulyValue={bankDetails?.bankname}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <FormRow
                  type="text"
                  name="Branch Code"
                  defaulyValue={bankDetails?.Branch_Code}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <div className="col-span-1 flex justify-start">
                  <button
                    type="button"
                    style={{
                      backgroundColor: '#f56565', // Tailwind's red-500
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    disabled={isSubmitting}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "updating..." : "Update"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBankDetails;