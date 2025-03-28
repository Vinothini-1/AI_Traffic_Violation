import React, { useState } from "react";
import { useAllRecycleItems } from "../pages/AllItems";
import image from "../assets/Images/signup.svg";
import { Form, Link } from "react-router-dom";
import { useNavigation } from "react-router-dom";

function RecycleItem({
  _id,
  name,
  description,
  Location,
  category,
  status,
  itemPhoto,
  phoneNo,
}) {
  console.log(name);
  console.log(Location);
  const navigation = useNavigation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  return (
    <div className="w-full max-w-md p-4 m-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out">
      {/* Card Image */}
      <img
        src={itemPhoto}
        alt={name}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Item Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>

        {/* Category Badge */}
        {/* <p
          className={`text-sm mx-4 font-medium inline-block px-3 py-1 rounded-full mb-2 ${
            category === "plastic"
              ? "bg-green-100 text-green-800"
              : category === "metal"
              ? "bg-gray-100 text-gray-800"
              : category === "paper"
              ? "bg-yellow-100 text-yellow-800"
              : category === "glass"
              ? "bg-blue-100 text-blue-800"
              : category === "wood"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {category}
        </p> */}

        {/* Status */}
        <p className="text-sm text-white bg-red-600 p-1 rounded-lg inline-block mb-4">
          {status}
        </p>

        {/* Description */}
        <p className="text-red-600 text-sm mb-4">{description}</p>

        {/* Location */}
        <div className="flex items-center mb-4">
          <span className="material-icons text-red-500 mr-2">location_on</span>
          <p className="text-gray-800 text-lg">{Location}</p>
        </div>

        {/* Phone Number */}
        <div className="flex items-center mb-4">
          <span className="material-icons text-red-500 mr-2">phone</span>
          <p className="text-gray-800 text-lg">{phoneNo}</p>{" "}
          {/* Display phone number */}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          {/* Edit Button */}
          <Link to={`../edit-items/${_id}`}>
            <button className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              Edit Item
            </button>
          </Link>

          <Form
            method="post"
            action={`../delete-item/${_id}`}
            onSubmit={handleDeleteClick}
          >
            <button
              disabled={isDeleting}
              className="bg-red-600 text-white bg-red p-2 rounded-lg mt-2 ml-2 shadow-lg hover:opacity-80 transition hover:translate-y-0.5 duration-150 "
            >
              <span className="text-black">
                {isDeleting ? "Deleting.." : "Delete"}
              </span>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RecycleItem;
