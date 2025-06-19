"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import Image from "next/image";
import "animate.css";
import { usePathname } from "next/navigation";
import { logout } from "@/utils/utils";
import { TbLogout2 } from "react-icons/tb";

const Header = ({ role = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerLinks =
    role === "admin"
      ? [
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Edit Content",
            href: "/admin/edit-content",
          },
          {
            label: "User Contact",
            href: "/admin/users-contact",
          },
        ]
      : [
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="px-4 md:px-[26px] py-4 md:py-[21px] bg-black flex justify-between items-center gap-3 rounded-[18px] text-white font-gilmer relative">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className="lg:flex gap-[30px] items-center hidden">
        {headerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`${
              pathname === link.href ? "text-primary" : ""
            } hover:text-primary text-[15px] font-semibold font-gilmer leading-none`}
            onClick={(e) => {
              if (!role === "admin" && link.href.startsWith("#")) {
                scrollToSection(link.href.slice(1));
              }
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {role === "admin" ? (
        <div
          onClick={logout}
          className="hidden cursor-pointer hover:text-primary md:flex items-center gap-2"
        >
          <TbLogout2 />
          Logout
        </div>
      ) : (
        <div className="lg:block hidden">
          <Link
            href="#contact"
            className=" gradient-btn text-nowrap"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Get in Touch
          </Link>
        </div>
      )}

      {/* Mobile Navbar */}
      <div
        className="lg:hidden cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Image
          src={"/images/burger-menu.svg"}
          width={35}
          height={35}
          alt="menu"
        />
      </div>

      {isOpen && (
        <div
          className={`absolute top-[70px] smd:top-[85px] left-0 w-full rounded-3xl p-4 bg-primary font-gilmer z-[12121] animate__animated animate__fadeInDown animate__fast md:hidden`}
        >
          <div className="flex flex-col">
            {headerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 px-2 font-gilmer text-[16px] hover:bg-black rounded-lg"
                onClick={(e) => {
                  if (!role === "admin" && link.href.startsWith("#")) {
                    scrollToSection(link.href.slice(1));
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {role === "admin" ? (
            <div
              onClick={logout}
              className="rounded-full text-white text-[14px] bg-black text-center px-4 py-2 w-full flex items-center gap-2 justify-center"
            >
              <TbLogout2 />
              Logout
            </div>
          ) : (
            <div className=" pt-2 w-full flex">
              <Link
                href="#contact"
                className="rounded-full text-[16px] bg-black text-center px-4 py-2 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Get in touch
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
