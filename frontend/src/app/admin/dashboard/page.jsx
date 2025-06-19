"use client";
import React from "react";
import AdminLayout from "../AdminLayout";
import Image from "next/image";
import withAuth from "@/utils/withAuth";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className=" h-[75dvh] flex justify-center items-center w-full ">
        <div className="font-gilmer flex flex-col gap-5 md:gap-10 ">
          <div className="text-3xl md:text-[50px] text-center font-bold text-white">
            Welcome to Papaya
          </div>
          <div className="flex justify-center overflow-hidden">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rotate-center">
              <Image
                src="/images/floating-papaya.svg"
                alt="Floating Papaya"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(Dashboard);
