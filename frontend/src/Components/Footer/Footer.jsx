"use client";
import Spinner from "@/ui-components/Spinner/Spinner";
import { showToast } from "@/ui-components/Toast/Toast";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    details: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleContactUs = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("api/contact/create", formData)
      .then((response) => {
        showToast("Message sent successfully.", "success");
        setFormData({ name: "", email: "", contact: "", details: "" });
      })
      .catch((error) => {
        if (error.response.data.msg) {
          showToast(error.response.data.msg, "error");
        } else {
          showToast("Something went wrong.", "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Core Capabilities",
      href: "#core-capabilities",
    },
    {
      label: "Services",
      href: "#services",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];
  return (
    <div
      className="bg-gradient-to-l from-[#18361a] to-[#325336] rounded-t-[23px] md:px-[52px] md:pt-[23px] px-5 pt-4"
      id="contact"
    >
      <div
        style={{
          backgroundImage: "url(/images/grid.svg)",
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
        className="absolute top-0 left-0 h-full w-full opacity-70"
      ></div>
      <div className="container">
        <form onSubmit={handleContactUs}>
          <div className="grid grid-cols-12 gap-5 md:gap-10 font-gilmer">
            <div className="lg:col-span-4 md:col-span-6 col-span-12 ">
              <div className="lg:w-[357px]">
                <div className="md:text-[40px] text-[#fefefe] text-[28px] smd:text-[36px] font-semibold font-gilmer leading-[46.40px]">
                  Need a Valuable & Effective Impact?
                </div>
                <div className="relative w-full h-[10px] py-3 smd:py-6">
                  <div>
                    <Image src="/images/Arrow.svg" fill alt="arrow" />
                  </div>
                </div>
                <div className="pt-3 pb-2">
                  <div className="flex items-center rounded-md bg-[#e6e6e6]">
                    <input
                      type="text"
                      className=" text-[11px] font-light font-gilmer leading-3 px-3 py-2 bg-transparent w-full placeholder-gray-700 outline-none"
                      placeholder="Your Email (required)"
                    />
                    <button className="text-[15px] font-semibold bg-white leading-[17.40px] px-3 py-[7px] rounded-md font-gilmer ">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="text-[#9b9b9b] text-[15px] font-light font-gilmer leading-tight tracking-tight">
                  Subscribe to get special offers, free glveaways, &
                  once-in-a-lifetime deals
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6  col-span-12 ">
              <div className="flex flex-col md:gap-6 gap-3 ">
                <div>
                  <div className="text-[#fefefe] text-sm font-light font-gilmer leading-[18.70px] pb-1">
                    Full Name *
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-transparent h-[24px] opacity-30 rounded-md border-2 w-full  border-[#fefefe] lg:w-[70%] text-[#fefefe] px-2 outline-none text-sm"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <div className="text-[#fefefe] text-sm font-light font-gilmer leading-[18.70px] pb-1">
                    Email Address *
                  </div>
                  <input
                    type="email"
                    id="name"
                    name="email"
                    className="bg-transparent  h-[24px] opacity-30 rounded-md border-2 border-[#fefefe] w-full   lg:w-[70%] text-white px-2  text-sm  outline-none"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <div className="text-[#fefefe] text-sm font-light font-gilmer leading-[18.70px] pb-1">
                    Mobile Number *
                  </div>
                  <input
                    type="tel"
                    name="contact"
                    id="name"
                    className="bg-transparent  h-[24px] opacity-30 rounded-md border-2 border-[#fefefe] w-full  lg:w-[70%] text-[#fefefe] px-2  text-sm  outline-none"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 text-white">
              <div className="text-[#fefefe] text-sm font-light font-gilmer leading-[18.70px] pb-1">
                How can we help you? *
              </div>
              <textarea
                name="details"
                id=""
                className="bg-transparent opacity-30 rounded-md border-2 border-[#fefefe] w-full resize-none px-2 py-2 text-[14px]  outline-none placeholder-gray-700"
                rows={5}
                value={formData.details}
                onChange={handleInputChange}
                required
                placeholder="Enter some details"
              ></textarea>
              <button
                className="text-[11px] text-black font-semibold font-gilmer leading-3 px-3 py-2 bg-white w-full rounded-md my-2 flex justify-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Spinner width={23} height={23} color="green" />
                ) : (
                  "Submit"
                )}
              </button>
              <div className=" text-[#9b9b9b] text-[15px] font-light font-gilmer leading-[20.85px] tracking-tight">
                By contacting us, you agree to our Terms & Condition & Privacy
                Policy.
              </div>
            </div>
          </div>
        </form>

        <div className="border-t-2 border-lightSecondary mt-5 md:mt-[45px] pt-[36px] text-[#fefefe] text-[15px] font-light font-gilmer leading-none flex items-center flex-wrap gap-x-5 md:gap-x-10  gap-y-5 justify-between">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("#")) {
                  scrollToSection(link.href.slice(1));
                }
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href={"/privacy-policies"} className="text-[15px] font-[300]">
            Privacy Policy
          </Link>
          <a
            href="mailto:support@papayacomms.com"
            className="text-[15px] font-[300]"
          >
            support@papayacomms.com
          </a>
        </div>
        <div className="text-[#fefefe] text-[10.50px] font-light font-gilmer leading-[11.02px] py-[30px] text-center">
          All rights reserved - Papaya Comms - 2025
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 text-[15px] font-bold bg-primary text-secondary px-3 py-2 rounded-md hover:bg-gray-200 transition-colors shadow-lg z-50"
      >
        Back to Top
      </button>
    </div>
  );
};

export default Footer;
