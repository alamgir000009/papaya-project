import Image from "next/image";
import React from "react";

const Logo = ({ width = 172, height = 32.88, className = "" }) => {
  return (
    <div>
      <Image
        src={"/images/logo.svg"}
        width={width}
        height={height}
        className={`${className}`}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
