import React from 'react';
import { IoBuild, IoTrashSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

// Sample employee data
const employees = [
    {
      "EmployeeId": "EMP001",
      "Email": "nimal.perera@example.lk",
      "Name": "Nimal Perera",
      "JoinDate": "2023-01-15",
      "RoadNo": "12A",
      "Street": "Galle Road",
      "City": "Colombo",
      "PostalCode": "00300",
      "Type": "Driver"
    },
    {
      "EmployeeId": "EMP002",
      "Email": "susan.dee@example.lk",
      "Name": "Susan Dee",
      "JoinDate": "2022-06-01",
      "RoadNo": "22B",
      "Street": "Dharamshala",
      "City": "Kandy",
      "PostalCode": "20000",
      "Type": "Collector"
    },
    {
      "EmployeeId": "EMP003",
      "Email": "kamal.jayawardena@example.lk",
      "Name": "Kamal Jayawardena",
      "JoinDate": "2021-03-20",
      "RoadNo": "34C",
      "Street": "Sri Jayawardenepura Kotte",
      "City": "Colombo",
      "PostalCode": "10100",
      "Type": "Admin"
    },
    {
      "EmployeeId": "EMP004",
      "Email": "shanthi.fernando@example.lk",
      "Name": "Shanthi Fernando",
      "JoinDate": "2020-09-30",
      "RoadNo": "56D",
      "Street": "Kollupitiya",
      "City": "Colombo",
      "PostalCode": "00300",
      "Type": "Driver"
    },
    {
      "EmployeeId": "EMP005",
      "Email": "rajitha.ranasinghe@example.lk",
      "Name": "Rajitha Ranasinghe",
      "JoinDate": "2019-11-12",
      "RoadNo": "78E",
      "Street": "Negombo Road",
      "City": "Negombo",
      "PostalCode": "11500",
      "Type": "Collector"
    },
    {
      "EmployeeId": "EMP006",
      "Email": "malini.mendis@example.lk",
      "Name": "Malini Mendis",
      "JoinDate": "2021-12-01",
      "RoadNo": "91F",
      "Street": "Pettah",
      "City": "Colombo",
      "PostalCode": "01000",
      "Type": "Driver"
    },
    {
      "EmployeeId": "EMP007",
      "Email": "nuwan.gunawardena@example.lk",
      "Name": "Nuwan Gunawardena",
      "JoinDate": "2023-04-10",
      "RoadNo": "110G",
      "Street": "Nugegoda",
      "City": "Colombo",
      "PostalCode": "10200",
      "Type": "Supervisor"
    },
    {
      "EmployeeId": "EMP008",
      "Email": "priyanka.senaratne@example.lk",
      "Name": "Priyanka Senaratne",
      "JoinDate": "2022-08-05",
      "RoadNo": "123H",
      "Street": "Rajagiriya",
      "City": "Colombo",
      "PostalCode": "10100",
      "Type": "Collector"
    }
];

  

export default function StafTable() {
  return (
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3'>
      <strong className='font-medium text-xl text-sky-600'>All Employees</strong>
      <div className='mt-3'>
        <table className='w-full text-gray-700'>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Email</th>
              <th>Name</th>
              <th>Join Date</th>
              <th>Road No</th>
              <th>Street</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.EmployeeId}>
                <td>{employee.EmployeeId}</td>
                <td>{employee.Email}</td>
                <td>{employee.Name}</td>
                <td>{employee.JoinDate}</td>
                <td>{employee.RoadNo}</td>
                <td>{employee.Street}</td>
                <td>{employee.City}</td>
                <td>{employee.PostalCode}</td>
                <td>{employee.Type}</td>
                <td>
                  <div className='flex flex-row gap-1'>
                    <Link to={'../EditEmployee'}>
                      <button className='bg-sky-500 text-white px-4 py-2 hover:bg-sky-600 rounded shadow-md outline-none border-none select-none'>
                        <IoBuild />
                      </button>
                    </Link>
                    <button className='bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none'>
                      <IoTrashSharp />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
