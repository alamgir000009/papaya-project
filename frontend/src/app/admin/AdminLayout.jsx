"use client";
import Header from "@/Components/Header/Header";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div
      className="smd:p-4 p-2 min-h-dvh bg-secondary"
      style={{
        backgroundImage: "url(/images/grid.svg)",
        backgroundPosition: "right",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      <Header role="admin" />
      <div className="py-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
