import { useUser } from '@/context/user.provider';
import React from 'react';

const PromoBanner = () => {
    const { user, setIsLoading: userLoading } = useUser();
  return (
    <div className="">
      <div className="bg-teal-600">
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row lg:justify-center">
            <div className="flex flex-1 items-center lg:mr-3 lg:flex-none">
              <p className="ml-3 text-center font-medium text-white">
              
                wellcome <span className="font-semibold">{user?.name}</span> release, use{' '}
             
              </p>
            </div>
            <div className="mt-2 w-full flex-shrink-0 lg:mt-0 lg:w-auto">
              <a
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm hover:bg-teal-50"
                href="#pricing"
              >
                Buy now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
