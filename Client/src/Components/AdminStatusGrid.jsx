import React from 'react'
import { IoArchive , IoAccessibilitySharp, IoPeopleSharp, IoSpeedometer   } from 'react-icons/io5'

export default function AdminStatusGrid({ employeeCount, vehicleCount, requestCount, userCount }) {
  return (
    <div className='flex gap-4 w-full'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoAccessibilitySharp  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Employees</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{employeeCount}</strong> {/* Use curly braces */}
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-500'>
          <IoArchive  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Requests</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{requestCount}</strong> {/* Use curly braces */}
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-gray-500'>
          <IoPeopleSharp  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Customers</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{userCount}</strong> {/* Use curly braces */}
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-500'>
          <IoSpeedometer  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Vehicles</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{vehicleCount}</strong> {/* Use curly braces */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}

function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border-gray-200 flex items-center'>{children}</div>
}
