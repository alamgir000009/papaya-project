"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AboutMission = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [aboutDescription, setAboutDescription] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [loading, setLoading] = useState(false);
  const getAbout = () => {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/api/about/getAbout`)
      .then((response) => {
        const data = response.data.data;
        setAboutDescription(data.description);
        setMission(data.mission);
        setVision(data.vision);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAbout();
  }, []);
  return (
    <div className="opacity-90 bg-gradient-to-l from-[#18361a] to-[#325336] rounded-[22px] px-7 py-8 md:py-[42px]">
      <div className=" container">
        <div className={"grid grid-cols-12 col-span-12 gap-5 lg:gap-10"}>
          <div
            className="lg:col-span-6 col-span-12 text-white flex flex-col gap-[18px]"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="md:text-[40px] text-[36px] font-semibold font-gilmerMedium leading-[42px] tracking-wide">
              About
            </div>
            <div className="text-[15px] font-normal font-gilmerRegular leading-[17.25px] md:w-[439px]">
              {loading ? "Loading Content..." : aboutDescription}
            </div>
            <div className="flex">
              <Link href={"#core-capabilities"} className="gradient-btn ">
                Explore our Capabilities
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12 flex gap-4 smd:flex-row flex-col">
            <div
              className="md:p-10 p-5 rounded-[23px] bg-white text-black flex justify-center items-center w-full"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div>
                <div className=" text-[40px] font-semibold font-gilmerMedium capitalize leading-[48px] tracking-wide pb-2">
                  Mission
                </div>
                <div className=" text-[15px] font-normal font-gilmerRegular capitalize leading-tight">
                  {" "}
                  {loading ? "Loading Content..." : mission}
                </div>
              </div>
            </div>
            <div
              className="md:p-10 p-5 rounded-[23px] bg-white text-black flex justify-center items-center w-full"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div>
                <div className=" text-[40px] font-semibold font-gilmerMedium capitalize leading-[48px] tracking-wide pb-2">
                  Vision
                </div>
                <div className="text-[15px] font-normal font-gilmerRegular capitalize leading-tight">
                  {" "}
                  {loading ? "Loading Content..." : vision}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
