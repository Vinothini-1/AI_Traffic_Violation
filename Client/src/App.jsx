import React, { useEffect, useRef, useState } from "react";


import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Dashboard,
  AddItems,
  Profile,
  Ruleviolation,
  TrafficViolationDetection,
  AddViolation,
 
 

  Admin,
  EditItems,
  AllItems,
  AdminDashboard,
  AdminDashbordLayout,
  AdminDashbord,
  Request,
  Staf,
  Company,
  Item,
  Transaction,
  Vehicle,
  AddVehicle,
  EditVehicle,
  Route,
  AddRoute,
  EditRoute,
  Test,
 
  Paymentinfo,
  AddEmployee,
  Editemployee,
  Addcompany,
  EditCompany,
  DeleteCompany,
  AddcompanyItem,
  EditcompanyItem,
  DeleteCompanyItem,
  DailyWaste,
  DriverDashboard,
  DriverDashboardlayout,
  DriverProfile,
  EditDailyWaste,
  UserManagement,
  DeleteUser,
  Adduser,
  AddDailyWaste,
  CollectedWaste,
  Payment,
  TimeTable,
  AddTimeTable,
  deleteTimeTable,
  EditTimeTable,
} from "./pages/index";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as profileAction } from "./pages/Profile";
import { action as addRitemAction } from "./pages/AddItems";
import { loader as AllItemsLoader } from "./pages/AllItems";
import { loader as editItemLoader } from "./pages/EditItems";
import { action as editItemAction } from "./pages/EditItems";
import { action as deleteItemAction } from "./pages/DeleteItem";
import { loader as AdminDashboardLoader } from "./pages/AdminDashbordLayout";
import { loader as userDasboardLoader } from "./pages/Dashboard";

import { loader as EmployeeLoader } from "./pages/Staf";
import { action as addEmployee } from "./pages/AddEmployee";
import { action as DeleteEmploye } from "./pages/DeleteEmploye";
import { action as editempAction } from "./pages/EditEmployee";
import { loader as editEmpLoader } from "./pages/EditEmployee";
import { loader as comapnyLoader } from "./pages/Company";
import { action as AddCompanyAction } from "./pages/AddCompany";
import { action as EditcomapnyAction } from "./pages/EditCompany";
import { loader as EditcompanyLoader } from "./pages/EditCompany";
import { action as DeleteCompanyAction } from "./pages/DeleteCompany";
import { loader as itemLoader } from "./pages/Item";
import { action as addCitemAction } from "./pages/AddcompanyItem";
import { action as editcompanyItemAction } from "./pages/EditcompanyItem";
import { loader as editcompanyItemLoader } from "./pages/EditcompanyItem";
import { action as deleteCompanyItemAction } from "./pages/DeleteCompanyItem";
import { loader as UserManagementLoader } from "./pages/UserManagement";
import { action as DeleteUserAction } from "./pages/DeleteUser";
import { action as AdduserAction } from "./pages/Adduser";

import { action as DriverprofileAction } from "./pages/DriverProfile";
import { loader as DriverProfileLoader } from "./pages/DriverProfile";
import { action as addCollectedWaste } from "./pages/AddDailyWaste";
import { action as EditWasteAction } from "./pages/EditDailyWaste";
import { loader as EditWasteLoader } from "./pages/EditDailyWaste";
import { loader as driverDashboardLoader } from "./pages/DriverDashboard";
import { loader as dailyWasteLoader } from "./pages/DailyWaste";
import { loader as collectedWasteLoader } from "./pages/CollectedWaste";

import { loader as routeLoader } from "./pages/Route";
import { loader as addRouteLoader } from "./pages/AddRoute";
import { loader as editRouteLoader } from "./pages/EditRoute";
import { action as addRouteAction } from "./pages/AddRoute";
import { action as editRouteAction } from "./pages/EditRoute";

import { loader as RequestLoader } from "./pages/Request";

import { loader as vehicleLoader } from "./pages/Vehicle";
import { loader as editVehicleLoader } from "./pages/EditVehicel";
import { action as AddVehicleAction } from "./pages/AddVehicle";
import { action as editVehicleAction } from "./pages/EditVehicel";



import { loader as transactionLoader } from "./pages/Transaction";

import { loader as paymentLoader } from "./pages/Payment";



import { loader as dashbordLoaderForAdmin } from "./pages/Dashbord";


import { loader as TimeTableLoader } from "./pages/TimeTable";
import { action as deleteTimeTableAction } from "./pages/DeleteTimeTable";
import { loader as EditTimeTableLoader } from "./pages/EditTimeTable";
import { action as EditTimeTableAction } from "./pages/EditTimeTable";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <Dashboard />,
              loader: userDasboardLoader,
            },
            {
              path: "Add-Items",
              element: <AddItems />,
              action: addRitemAction,
            },
            {
              path: "all-items",
              element: <AllItems />,
              loader: AllItemsLoader,
            },
            
            {
              path: "profile",
              element: <Profile />,
              action: profileAction,
            },
            {
              path: "rule-violation",
              element: <Ruleviolation/>,
            
            },
            {
              path: "add-violation",
              element: <AddViolation/>,
            
            },
            {
              path: "traffic-violation",
              element: <TrafficViolationDetection/>,
            
            },
          


            {
              path: "edit-items/:id",
              element: <EditItems />,
              loader: editItemLoader,
              action: editItemAction,
            },
            {
              path: "trafficsignalviolation",
              element: <Paymentinfo />,
            
            },
            {
              path: "transactin",
              element: <Transaction />,
            
            },
             
          

            { path: "delete-item/:id", action: deleteItemAction },
          ],
        },
        {
          path: "AdminDashboard",
          element: <AdminDashbordLayout />,

          children: [
            {
              index: true,
              element: <AdminDashbord />,
              loader: dashbordLoaderForAdmin,
            },
            {
              path: "request",
              element: <Request />,
              loader: RequestLoader,
            },
            {
              path: "route",
              element: <Route />,
              loader: routeLoader,
            },
            {
              path: "staf",
              element: <Staf />,
              loader: EmployeeLoader,
            },
            {
              path: "company",
              element: <Company />,
              loader: comapnyLoader,
            },
            {
              path: "transaction",
              element: <Transaction />,
              loader: transactionLoader,
            },
            {
              path: "payment/:id",
              element: <Payment />,
              loader: paymentLoader,
            },
            {
              path: "vehicle",
              element: <Vehicle />,
              loader: vehicleLoader,
            },
            {
              path: "item",
              element: <Item />,
              loader: itemLoader,
            },
            {
              path: "addRoute/:id",
              element: <AddRoute />,
              loader: addRouteLoader,
              action: addRouteAction,
            },
            {
              path: "editRoute/:id",
              element: <EditRoute />,
              loader: editRouteLoader,
              action: editRouteAction,
            },
            {
              path: "AddVehicle",
              element: <AddVehicle />,
              action: AddVehicleAction,
            },
            {
              path: "EditVehicle/:id",
              element: <EditVehicle />,
              loader: editVehicleLoader,
              action: editVehicleAction,
            },
            {
              path: "add-employee",
              element: <AddEmployee />,
              action: addEmployee,
            },
            { path: "delete-employee/:id", action: DeleteEmploye },
            {
              path: "edit-employee/:id",
              element: <Editemployee />,
              action: editempAction,
              loader: editEmpLoader,
            },
            {
              path: "edit-company/:id",
              element: <EditCompany />,
              action: EditcomapnyAction,
              loader: EditcompanyLoader,
            },
            {
              path: "add-company",
              element: <Addcompany />,
              action: AddCompanyAction,
            },
            { path: "delete-company/:id", action: DeleteCompanyAction },
            {
              path: "add-CItem",
              element: <AddcompanyItem />,
              action: addCitemAction,
            },
            {
              path: "edit-CItem/:id",
              element: <EditcompanyItem />,
              action: editcompanyItemAction,
              loader: editcompanyItemLoader,
            },
            { path: "delete-CItem/:id", action: deleteCompanyItemAction },
            {
              path: "user-management",
              element: <UserManagement />,
              loader: UserManagementLoader,
            },
            { path: "delete-user/:id", action: DeleteUserAction },
            {
              path: "add-user",
              element: <Adduser />,
              action: AdduserAction,
            },
            {
              path: "time-table",
              element: <TimeTable />,
              loader: TimeTableLoader,
            },
            {
              path: "add-time-table",
              element: <AddTimeTable />,
            },
            { path: "delete-time-table/:id", action: deleteTimeTableAction },
            {
              path: "edit-timetable/:id",
              element: <EditTimeTable />,
              action: EditTimeTableAction,
              loader: EditTimeTableLoader,
            },
          ],
        },

        {
          path: "DriverDashboard",
          element: <DriverDashboardlayout />,
          children: [
            {
              index: true,
              element: <DriverDashboard />,
              loader: driverDashboardLoader,
            },
            {
              path: "driver-profile",
              element: <DriverProfile />,
              action: DriverprofileAction,
              loader: DriverProfileLoader,
            },
            {
              path: "daily-waste",
              element: <DailyWaste />,
              loader: dailyWasteLoader,
            },
            {
              path: "collected-waste",
              element: <CollectedWaste />,
              loader: collectedWasteLoader,
            },
            {
              path: "add-daily-waste",
              element: <AddDailyWaste />,
              action: addCollectedWaste,
            },
            {
              path: "edit-daily-waste/:id",
              element: <EditDailyWaste />,
              action: EditWasteAction,
              loader: EditWasteLoader,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
