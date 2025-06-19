"use client";
import { BiHomeAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { showSidebar, sidebarToggle, sidebarWidth } from "@/redux/sidebarSlice";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import style from "./AdminSidebar.module.css";
import Logo from "../Logo/Logo";
const AdminSidebar = () => {
  const sidebar_width = useSelector((state) => state.sidebar.width);
  const show_sidebar = useSelector((state) => state.sidebar.isShowSidebar);
  const sidebar_toggle = useSelector((state) => state.sidebar.toggle);
  const url = Router.pathname;

  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      dispatch(showSidebar(false));
    } else {
      dispatch(showSidebar(true));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        dispatch(sidebarWidth("280px"));
        dispatch(sidebarToggle(false));
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, sidebar_width, sidebar_toggle]);

  const sidebarLinks = [
    {
      route: "/admin/dashboard",
      label: "Dashboard",
      icon: BiHomeAlt2,
    },
  ];
  const handleLinkClick = () => {
    if (window.innerWidth < 769) {
      dispatch(showSidebar(!show_sidebar));
    }
  };

  return (
    <div
      className={`fixed top-0 md:top-[80px] left-0 z-[20] w-full bg-black/35 md:m-4`}
      style={{
        transform: !show_sidebar ? "translateX(0)" : "translateX(-100%)",
        transition: "width 0.3s ease",
      }}
      onClick={() => {
        dispatch(showSidebar(!show_sidebar));
      }}
    >
      <div className="md:fixed h-dvh md:h-[86vh] flex flex-col gap-2">
        <div
          className={`bg-black px-4 py-6 rounded-3xl`}
          style={{
            width:
              window.innerWidth < 768
                ? "280px"
                : sidebar_toggle && isHovered
                ? "280px"
                : sidebar_width,
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Logo />
        </div>
        <div
          className={`${style.sidebar} h-full  bg-secondary rounded-3xl`}
          style={{
            width:
              window.innerWidth < 768
                ? "280px"
                : sidebar_toggle && isHovered
                ? "280px"
                : sidebar_width,
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="px-[12px]">
            {sidebarLinks.map((item) => (
              <div
                className={`mb-3  `}
                key={item.label}
                onClick={handleLinkClick}
              >
                <Link
                  href={item.route}
                  className={`flex items-center text-nowrap hover:shadow-md ${
                    url === item.route ? "" : ""
                  } gap-2  `}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="text-md" /> {item.label}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
