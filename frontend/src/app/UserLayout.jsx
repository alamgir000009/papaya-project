"use client";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <>
      <div className={`p-2 smd:px-[24px] smd:py-[14px]`}>
        {" "}
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
