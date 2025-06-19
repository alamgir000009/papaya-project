"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomAccordion from "../CustomAccordian/CustomAccordian";
import axios from "axios";

const CoreCapabilities = () => {
  const [allData, setAllData] = useState({});
  const [allDataLoading, setAllDataLoading] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getAllCapabilities = async () => {
    setAllDataLoading(true);
    await axios
      .get(`${apiBaseUrl}/api/capabilities/getAbout`)
      .then((response) => {
        setAllData(response.data.data);
      })
      .catch((error) => {})
      .finally(() => {
        setAllDataLoading(false);
      });
  };
  useEffect(() => {
    getAllCapabilities();
  }, []);
  return (
    <div className="bg-[#f6f2ef] rounded-[22px] md:px-6 px-4 pt-4 md:pt-[34px] font-gilmer">
      <div className="container">
        <div className="grid grid-cols-12 gap-3 ">
          <div className="lg:col-span-6 col-span-12 flex flex-col justify-between ">
            <div data-aos="zoom-in" data-aos-duration="1000">
              <div className="smd:text-[40px] text-[36px]  font-semibold font-gilmerMedium leading-[42px] pb-4 ">
                Core Capabilities
              </div>
              <div className="text-[#4a4a4a] text-[15px] font-normal font-gilmerRegular leading-tight lg:w-[450px]">
                {allDataLoading ? "Loading content ..." : allData?.description}
              </div>
            </div>
            <div
              className="flex justify-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="relative w-[280px] smd:w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                <Image src={"/images/flower.png"} alt="flower" fill />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12 pb-3">
            {allDataLoading ? (
              <div className="text-lg font-bold text-center">
                Loading content ...{" "}
              </div>
            ) : (
              <CustomAccordion data={allData?.capabilities} animation={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreCapabilities;
