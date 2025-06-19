"use client";
import { showToast } from "@/ui-components/Toast/Toast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    await axios
      .get(`${apiBaseUrl}/api/mainSection/getAbout`)
      .then((response) => {
        const data = response?.data?.data;
        setDescription(data.description);
        setHeading(data.heading);
      })
      .catch((err) => {
        showToast(err.response.data.msg, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-gradient-to-l from-[#18361a] to-[#325336] rounded-[23px] text-white p-4 md:p-[24px]">
      <div className="container">
        <div
          className="grid grid-cols-12 md:gap-y-10 gap-6 gap-x-3 overflow-hidden"
          style={{
            backgroundImage: "url(/images/grid.svg)",
            backgroundPosition: "right",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="lg:col-span-4  col-span-12 flex items-center  "
            data-aos="zoom-in"
            data-aos-duration="600"
          >
            <div className="lg:w-[90%] ">
              <div className="text-[36px] smd:text-[42px] font-[600] leading-[40px] smd:leading-[50.4px] font-gilmerMedium">
                {loading ? "Loading Content..." : heading}
              </div>
              <div className="text-[15px] font-normal font-gilmerRegular leading-[18px] pt-4 text-[#FEFEFE]">
                {loading ? "Loading Content..." : description}
              </div>
              <div className="flex gap-3 pt-[22px] text-[14px] flex-wrap">
                <Link
                  href={"#core-capabilities"}
                  className=" gradient-btn text-nowrap"
                >
                  Explore our Capabilities
                </Link>
                <Link
                  href={"#contact"}
                  className="rounded-full text-nowrap flex items-center leading-[19.46px] px-6 text-[14px] !font-[600] py-2 hover:bg-primary border border-white hover:border-secondary"
                >
                  Want a Solution?
                </Link>
              </div>
              <div className="flex lg:flex-col md:flex-row flex-col pt-[42px] gap-6 md:gap-8 lg:gap-5">
                <div className="flex smd:items-center sm:flex-row flex-col gap-y-5 gap-x-10 lg:gap-x-20 ">
                  <Image
                    src="/images/Logo_Google_Analytics_white.svg"
                    alt="vector"
                    width={96}
                    height={33}
                  />{" "}
                  <Image
                    src="/images/adobeCc.png"
                    alt="vector"
                    width={150}
                    height={20}
                  />
                </div>
                <div className="flex smd:items-center sm:flex-row flex-col  gap-y-5 gap-x-8 lg:gap-x-16 ">
                  <Image
                    src="/images/power_bi_white.svg"
                    alt="vector"
                    width={113}
                    height={33}
                  />
                  <Image
                    src="/images/semrush_logo_white.svg"
                    alt="vector"
                    width={152}
                    height={19}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12  flex justify-center lg:justify-end items-center">
            <div className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px] rotate-center">
              <Image
                src="/images/floating-papaya.svg"
                alt="Floating Papaya"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
