"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Services = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [allServices, setAllServices] = useState([]);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [formData, setFormData] = useState({
    mainHeading: "",
    mainImagePreview: "",
  });
  const handleGetAllServices = async () => {
    setGetDataLoading(true);
    await axios
      .get(`${apiBaseUrl}/api/services/getAbout`)
      .then((response) => {
        if (response.data.data.length === 0) {
          setFormData((prevState) => ({
            ...prevState,
            mainHeading: "",
            mainImagePreview: "",
          }));
          setAllServices([]);
          return;
        }
        const mainData = response.data.data;
        const updatedMainImage = `${apiBaseUrl}/${mainData.mainImage.replace(
          "uploads\\",
          ""
        )}`;

        setFormData((prevState) => ({
          ...prevState,
          mainHeading: mainData.sectionTitle || "",
          mainImagePreview: updatedMainImage,
        }));

        const updatedServices = mainData.services.map((service) => ({
          ...service,
          icon: service.icon
            ? `${apiBaseUrl}/${service.icon.replace("uploads\\", "")}`
            : "",
        }));

        setAllServices(updatedServices);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      })
      .finally(() => {
        setGetDataLoading(false);
      });
  };
  useEffect(() => {
    handleGetAllServices();
  }, []);

  return (
    <div className="bg-gradient-to-l from-[#18361a] to-[#325336] rounded-[22px] smd:p-6 p-4">
      <div className="container">
        <div className="text-[40px] text-white font-semibold font-gilmerMedium leading-[49.20px] tracking-wide text-center md:pt-[36px]">
          {formData.mainHeading}
        </div>
        <div className="grid grid-cols-12 gap-3 md:gap-6 pt-3 md:pt-[49px]">
          {getDataLoading ? (
            <div className="text-center text-lg font-bold">
              Loading Services{" "}
            </div>
          ) : (
            allServices.map((item, index) => {
              return (
                <div
                  className="md:col-span-4 col-span-12 rounded-[23px] bg-lightSecondary p-6 flex flex-col gap-3 cursor-pointer  shine-effect"
                  key={index}
                  data-aos="flip-left"
                  data-aos-duration="1000"
                >
                  <div className="smd:w-[75px] smd:h-[75px] w-[55px] h-[55px] relative">
                    <Image
                      src={item.icon}
                      alt="network"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-2xl font-semibold font-gilmerMedium leading-[28.80px] text-white ">
                    {item.title}
                  </div>
                  <div className=" text-[#fefefe] text-[15px] font-normal font-gilmerRegular leading-tight">
                    {item?.description}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {formData.mainImagePreview && (
          <div
            className="relative  rounded-[22px] w-full h-[300px] overflow-hidden  md:h-[518px] mt-4 md:mt-[45px]"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <Image
              src={formData.mainImagePreview}
              alt="peoples"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
