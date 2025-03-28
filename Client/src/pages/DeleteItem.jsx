import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Item?"
  );

  if (!confirmDelete) {
    toast.info("Delete action canceled");
    return redirect("/AdminDashboard/item");
  }
  try {
    await customFetch.delete(`RItems/${params.id}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/all-Items");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return redirect("/dashboard/all-Items");
};

const DeleteItem = () => {
  return <div></div>;
};

export default DeleteItem;
