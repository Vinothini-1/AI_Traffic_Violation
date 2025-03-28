import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { confirmModel } from "../Components";

export const action = async ({ params }) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this User?"
  );

  if (!confirmDelete) {
    toast.info("Delete action canceled");
    return redirect("/AdminDashboard/user-management");
  }
  try {
    await customFetch.delete(`users/${params.id}`);
    toast.success("User deleted successfully");
    return redirect("/AdminDashboard/user-management");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return redirect("/AdminDashboard/item");
};

function DeleteUser() {
  return <div></div>;
}

export default DeleteUser;
