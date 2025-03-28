import React from 'react';
import { IoMap  } from 'react-icons/io5';

export default function RouteStatusGrid({ total, sheduled, approved }) {
  return (
    <div className='flex gap-4 w-full'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-gray-500'>
          <IoMap  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Sheduled Routes</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{sheduled}</strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoMap  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Approved Routes</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{approved}</strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-500'>
          <IoMap  className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>All Routes</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{total}</strong>
          </div>
        </div>
      </BoxWrapper>

    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className='bg-white rounded-sm p-4 flex-1 border-gray-200 flex items-center'>
      {children}
    </div>
  );
}
