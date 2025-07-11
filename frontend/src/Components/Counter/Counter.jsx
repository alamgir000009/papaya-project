"use client";

import { useState, useEffect, useRef } from "react";
const Counter = () => {
  const [counter10, setCounter10] = useState(0);
  const [counter100, setCounter100] = useState(0);
  const [counter200, setCounter200] = useState(0);

  // Target values for the counters
  const targetValue10 = 10;
  const targetValue100 = 100;
  const targetValue200 = 20;

  // Refs for each counter section
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval10 = setInterval(() => {
        setCounter10(
          (prev) => (prev < targetValue10 ? prev + 2 : targetValue10) // Increased step from 1 to 2
        );
      }, 30); // Reduced interval time from 50ms to 30ms

      const interval100 = setInterval(() => {
        setCounter100(
          (prev) => (prev < targetValue100 ? prev + 5 : targetValue100) // Increased step from 1 to 5
        );
      }, 20); // Reduced interval time from 50ms to 20ms

      const interval200 = setInterval(() => {
        setCounter200(
          (prev) => (prev < targetValue200 ? prev + 2 : targetValue200) // Increased step from 1 to 2
        );
      }, 30); // Reduced interval time from 50ms to 30ms

      return () => {
        clearInterval(interval10);
        clearInterval(interval100);
        clearInterval(interval200);
      };
    }
  }, [isVisible]);

  return (
    <div className="container">
      <div
        ref={counterRef}
        className="grid grid-cols-12 gap-3 font-gilmer font-bold text-white"
      >
        {/* First counter (10) */}
        <div
          className="md:col-span-4 col-span-12 bg-black rounded-[22px] px-4 md:px-[24px] py-8 md:py-[40px]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <div className="smd:text-[76px] font-gilmer text-[60px] smd:leading-[95px] font-semibold">
            {counter10}+
          </div>
          <div className="text-base font-light font-gilmer leading-10">
            Years of Experience
          </div>
        </div>

        {/* Second counter (100) */}
        <div
          className="md:col-span-4 col-span-12 bg-black rounded-[22px] px-4 md:px-[24px] py-8 md:py-[40px]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <div className="smd:text-[76px] text-[60px] smd:leading-[95px] font-semibold font-gilmer">
            {counter100}+
          </div>
          <div className="text-base font-light font-gilmer leading-10">
            Projects Completed
          </div>
        </div>

        {/* Third counter (200) */}
        <div
          className="md:col-span-4 col-span-12 bg-primary-gradient rounded-[22px] px-4 md:px-[24px] py-8 md:py-[40px] font-gilmer"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <div className="flex items-end gap-4">
            <div className="smd:text-[76px] text-[60px] smd:leading-[95px] font-semibold">
              {counter200}M+
            </div>
            <div className=" text-[27px] font-semibold  leading-[66.42px]">
              SAR
            </div>
          </div>
          <div className="text-base font-light  leading-10">
            on Implementation{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
