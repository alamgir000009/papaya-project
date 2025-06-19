"use client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "animate.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-gilmer">
        {children} <ToastContainer />
      </body>
    </html>
  );
}
