import Image from 'next/image';
import React from 'react';
import imageOne from '@/assests/CategoryImage/1699881121737973.png'
import Link from 'next/link';

const Category = () => {
    return (
   <div className='max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-5 my-10'>



<div className='flex items-center justify-center'>
<div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>

<Link href="/Accessories" className="  ">
      <div>
        <Image src='https://i.ibb.co.com/BwY6pMF/mobile.png' className="block mx-auto" width={70} height={60} alt="portfolio" />
        <p className="pt-4 text-sm font-medium capitalize font-body text-gray-400 lg:text-lg md:text-base md:pt-6">
        Mobile & Accessories
        </p>
      </div>
    </Link>
<Link href="/SmartWatch" className="  text-center ">
      <div>
        <Image src='https://i.ibb.co.com/f13GvKk/smartwatch.png' className="block mx-auto" width={70} height={60} alt="portfolio" />
        <p className="pt-4 text-sm font-medium capitalize font-body text-gray-400 lg:text-lg md:text-base md:pt-6">
        smartwatches
        </p>
      </div>
    </Link>

<Link href="/AudioWearables" className="  text-center ">
      <div>
        <Image src='https://i.ibb.co.com/LzZxH5T/headphones.png' className="block mx-auto" width={70} height={60} alt="portfolio" />
        <p className="pt-4 text-sm font-medium capitalize font-body text-gray-400 lg:text-lg md:text-base md:pt-6">
        Audio & Wearables
        </p>
      </div>
    </Link>

<Link href="/TechEssentials" className="  text-center ">
      <div>
        <Image src='https://i.ibb.co.com/yPzPWsj/technology.png' className="block mx-auto" width={70} height={60} alt="portfolio" />
        <p className="pt-4 text-sm font-medium capitalize font-body text-gray-400 lg:text-lg md:text-base md:pt-6">
        Tech Essentials
        </p>
      </div>
    </Link>

<Link href="/SmartLightingDecor " className="  text-center ">
      <div>
        <Image src='https://i.ibb.co.com/L0cFs5r/table-lamp.png' className="block mx-auto" width={70} height={60} alt="portfolio" />
        <p className="pt-4 text-sm font-medium capitalize font-body text-gray-400 lg:text-lg md:text-base md:pt-6">
        SmartLighting & Decor
        </p>
      </div>
    </Link>
 
<Link href="/PortableTechGadge " className="  text-center ">
      <div>
        <Image src='https://i.ibb.co.com/VYwkYHS/gadget.png' className="block mx-auto" width={70} height={60} alt="portfolio" />
        <p className="pt-4 text-sm font-medium capitalize font-body text-gray-400 lg:text-lg md:text-base md:pt-6">
        Portable Tech & Gadgets
        </p>
      </div>
    </Link>
 

    </div>
</div>



   </div>
    );
};

export default Category;