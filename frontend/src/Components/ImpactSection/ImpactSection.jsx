"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImpactSection = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [imageSize, setImageSize] = useState(160);

  const handleGetData = () => {
    setGetDataLoading(true);
    axios
      .get(`${apiBaseUrl}/api/logos/getAbout`)
      .then((response) => {
        // Update image URLs by removing 'uploads\\' and prepending the base URL
        const updatedData = response.data.data.map((item) => ({
          ...item,
          logoUrl: `${apiBaseUrl}/${item.logoUrl.replace("uploads\\", "")}`,
        }));
        setAllData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setGetDataLoading(false);
      });
  };
  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setImageSize(window.innerWidth < 500 ? 100 : 160);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  let settingsReverse = {
    ...settings,
    rtl: true,
  };
  return (
    <>
      <div className="text-black font-gilmer container md:flex-row flex-col flex justify-between md:gap-4">
        <div
          className="smd:text-[40px] text-[36px] font-semibold font-gilmerMedium leading-[49.20px] md:w-[350px]"
          data-aos="fade-right"
          data-aos-duration="700"
        >
          We Make Our Impact Through
        </div>
        <div
          className="md:text-right text-[#4a4a4a] text-[15px] font-normal font-gilmerRegular leading-tight md:w-[454px]"
          data-aos="fade-left"
          data-aos-duration="700"
        >
          We leverage industry-leading tools and technologies to deliver
          exceptional results across our services. Our expertise in these
          platforms ensures precision, innovation, and measurable impact
          for every project.
        </div>
      </div>
      <div className=" ">
        {getDataLoading ? (
          <div className="text-xl text-center py-3 font-bold">
            Loading content...
          </div>
        ) : (
          allData.length > 0 && (
            <>
              <div className="slider-container mt-6 smd:mt-10">
                <Slider {...settings}>
                  {allData?.map((item, index) => {
                    return (
                      <div
                        className="flex flex-col items-center text-center"
                        key={index}
                      >
                        <div className="gap-3 w-[150px] h-[130px] smd:w-[200px] smd:h-[180px]  px-4  pl-7 pr-[27px] bg-[#f6f2ef] rounded-xl shadow-[2px_2px_18px_0px_rgba(0,0,0,0.02)] border border-[#fcfcfc] justify-center items-center inline-flex overflow-hidden">
                          <div className=" ">
                            <Image
                              alt={item.name}
                              src={item.logoUrl}
                              width={imageSize}
                              height={imageSize}
                            />
                          </div>
                          <div className="smd:text-[24px] text-[18px] font-extrabold leading-[25px] break-words">
                            <div>{item.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <div className="slider-container mt-4 smd:mt-10">
                <Slider {...settingsReverse}>
                  {allData?.map((item, index) => {
                    return (
                      <div
                        className="flex flex-col items-center text-center"
                        key={index}
                      >
                        <div className="gap-3 w-[150px] h-[130px] smd:w-[200px] smd:h-[180px]  px-4  pl-7 pr-[27px] bg-[#f6f2ef] rounded-xl shadow-[2px_2px_18px_0px_rgba(0,0,0,0.02)] border border-[#fcfcfc] justify-center items-center inline-flex overflow-hidden">
                          <div className=" ">
                            <Image
                              alt={item.name}
                              src={item.logoUrl}
                              width={imageSize}
                              height={imageSize}
                            />
                          </div>
                          <div className="smd:text-[24px] text-[18px] font-extrabold leading-[25px] break-words">
                            <div>{item.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default ImpactSection;
