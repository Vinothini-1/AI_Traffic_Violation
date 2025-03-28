import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

// Action to handle timetable deletion
export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/timetable/${params.id}`);
    toast.success("Timetable deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to delete timetable");
  }

  return redirect("/AdminDashboard/time-table");
};

const DeleteTimeTable = () => {
  return <div></div>; // Empty component as this is purely an action-based operation
};

export default DeleteTimeTable;
