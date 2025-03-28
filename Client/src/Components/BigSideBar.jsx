import React from "react";
import { useDashbordContext } from "../pages/DashboardLayout";
import NavLiks from "./NavLiks";
import Wrapper from "../assets/wrappers/BigSidebar";

const BigSideBar = () => {
  const data = useDashbordContext();

  return (
    <div className="bg-black text-white shadow-2xl inline-block w-1/6 flex-none p-3">

      <NavLiks />
    </div>
  );
};

export default BigSideBar;
