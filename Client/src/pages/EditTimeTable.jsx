import React from "react";
import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

// Loader to fetch the timetable entry by its ID
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch(`/timetable/${params.id}`);
    console.log(data);
    return data.timeTable;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load timetable data");
    return redirect("/dashboard/timetable");
  }
};

// Action to handle form submission and update the timetable entry
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const timetableData = Object.fromEntries(formData.entries());

  try {
    await customFetch.patch(`/timetable/${params.id}`, timetableData);
    toast.success("Timetable updated successfully");
    return redirect("/AdminDashboard/time-table");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to update timetable");
    return error;
  }
};

function EditTimeTable() {
  const timeTable = useLoaderData(); // Fetch timetable data from the loader

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10">
      <div
        className="bg-white px-10 py-20 rounded w-2/3 overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h3 className="font-semibold text-sky-600 text-3xl text-center">
          Update TimeTable
        </h3>

        <Form method="post">
          <div className="mt-8">
            <label className="text-lg font-medium">Employee Name</label>
            <input
              type="text"
              name="EmployeeName"
              id="EmployeeName"
              defaultValue={timeTable.EmployeeName}
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Employee Name"
              required
            />
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Date</label>
            <input
              type="date"
              name="Date"
              id="Date"
              defaultValue={new Date(timeTable.Date).toISOString().slice(0, 10)}
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              required
            />
          </div>

          <div className="mt-8">
            <label className="text-lg font-medium">Task</label>
            <textarea
              name="Task"
              id="Task"
              defaultValue={timeTable.Task}
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Task Description"
              required
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className={`bg-sky-500 text-white font-bold py-4 rounded w-full hover:bg-sky-700 ${
                isSubmitting ? "opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditTimeTable;
