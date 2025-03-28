import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    text: "My Dashboard",
    path: ".",
    icon: <FaWpforms />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
 
  {
    text: "Traffic Signal Control",
    path: "trafficsignalviolation",
  
  }, 
  {
    text: "Traffic Violation",
    path: "traffic-violation",
  
  },
  {
    text: "Add Violation",
    path: "add-violation",
  
  },
 
 


 

 
];

export default links;
