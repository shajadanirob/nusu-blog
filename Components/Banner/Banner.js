'use client'
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const images = [
  'https://i.ibb.co.com/9YHW90t/hawkers-accessories-Banner.jpg',
  'https://i.ibb.co.com/JHLX4wm/Green-and-Black-Vivid-Bold-Blocks-Electronics-and-Appliances-Banner.png',
  'https://i.ibb.co.com/wWJTWSW/Blue-Technology-Gadgets-Facebook-Ad.png',
  
  
];



export const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const nextSlider = useCallback(() => {
    setCurrentSlider((prev) => (prev + 1) % images.length);
  }, []);

  // const prevSlider = () => {
  //   setCurrentSlider((prev) => (prev - 1 + images.length) % images.length);
  // };

  useEffect(() => {
    const intervalId = setInterval(nextSlider, 5000); // Change slide every 5 seconds
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <section className="relative hidden lg:block lg:h-screen overflow-hidden">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-5000 ease-linear"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {images.map((slide, idx) => (
          <div key={slide} className="flex-shrink-0 w-full h-[100vh] relative">
            <Image
            width={1500}
            height={500}
              src={slide}
              className="w-full h-full object-cover"
              alt={`Slider - ${idx + 1}`}
            />
          
           
           
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
     

      {/* Dots */}
      <div className="flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full ${currentSlider === idx ? "w-4 bg-white" : "w-2 bg-gray-300"} h-2 transition-all`}
          ></button>
        ))}
      </div>
    </section>
  );
};
