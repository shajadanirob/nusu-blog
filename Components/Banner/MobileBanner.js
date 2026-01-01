'use client'
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export const MobileBanner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const carouselImages = ['https://i.ibb.co.com/9YHW90t/hawkers-accessories-Banner.jpg','https://i.ibb.co.com/JHLX4wm/Green-and-Black-Vivid-Bold-Blocks-Electronics-and-Appliances-Banner.png'];
  const prevSlider = () => setCurrentSlider((currentSlider) => currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1);
  const nextSlider = useCallback(() => setCurrentSlider((currentSlider) => currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1), [carouselImages.length]);

  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
      <div className="h-60 w-full md:h-[470px] lg:h-[540px] relative overflow-hidden md:hidden">
          
          <div className="flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-1">
            {carouselImages.map((img, idx) => (
              <button key={`${img}_${idx}`} onClick={() => setCurrentSlider(idx)} className={`rounded-full duration-500 bg-white ${currentSlider === idx ? "w-8" : "wz-2"} h-2`}></button>
            ))}
          </div>
          {/* Carousel container */}
          <div className="ease-linear duration-500 flex transform-gpu" style={{ transform: `translateX(-${currentSlider * 100}%)`}}>
            {/* sliders */}
            {carouselImages.map((slide, idx) => (
              <Image width={500} height={500} key={slide} src={slide} className="min-w-full h-60 bg-black/20 sm:h-96 md:h-[540px] object-cover" alt={`Slider - ${idx + 1}`}/>
            ))}
          </div>
      </div>
  )
};
