"use client";
import React, { useState, useEffect } from "react";
import Spinner from "@/ui-components/Spinner/Spinner";
import { showToast } from "@/ui-components/Toast/Toast";
import axiosInstance from "@/utils/axiosInstance";
import { MdDelete } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const CustomAccordion = ({
  data = [],
  isAdmin = false,
  onCallParentFunction,
  animation = false, // Default is false
}) => {
  const [openIndex, setOpenIndex] = useState(data.length > 0 ? 0 : null);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    if (animation) {
      AOS.init({ duration: 800, once: false });
    }
  }, [animation]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteCapability = async (id, index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await axiosInstance.delete(
        `api/logos/delete?aboutId=${id}`
      );
      showToast(response.data.msg, "success");
      onCallParentFunction();
    } catch (error) {
      showToast(error.response?.data?.msg);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 md:gap-[20px] custom-accordian">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
          {...(animation
            ? { "data-aos": "fade-up", "data-aos-delay": index * 200 }
            : {})} // Apply animation conditionally
        >
          <div className="w-full">
            <div className="flex items-center gap-2">
              <button
                className="w-full text-start bg-secondary md:text-2xl text-[16px] sm:text-[18px] font-semibold text-white rounded-[14px] flex justify-between items-center focus:outline-none font-gilmer leading-[28.80px] md:px-[25px] md:py-[16px] px-4 py-3"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                type="button"
              >
                <div className=" ">{item.title}</div>
                <span className="text-lg md:text-3xl transform duration-300 ease-in-out">
                  {openIndex === index ? (
                    <svg
                      width="16px"
                      height="16px"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                        fill="#FF805A"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="#FF805A"
                      width="12px"
                      height="12px"
                      viewBox="0 0 45.402 45.402"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                    </svg>
                  )}
                </span>
              </button>
              {isAdmin &&
                (loadingStates[index] ? (
                  <Spinner />
                ) : (
                  <MdDelete
                    className="md:text-3xl text-xl cursor-pointer"
                    onClick={() => handleDeleteCapability(item._id, index)}
                  />
                ))}
            </div>
            {openIndex === index && (
              <div
                className={` bg-white rounded-b-[23px] px-3 md:px-10 py-2 smd:mx-5 text-[15px] font-normal font-gilmerRegular leading-snug text-[#4a4a4a]  `}
              >
                <ul>
                  {item.subpoints.map((subpoint, subIndex) => (
                    <li key={subIndex}>{subpoint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
