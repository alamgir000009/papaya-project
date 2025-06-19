/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(270deg, #FF8057 -23.81%, #FF6537 105.24%)",
        "secondary-gradient":
          "linear-gradient(273deg, #18361A -1.96%, #325337 122.01%)",
      },
      colors: {
        primary: "#ff805a",
        secondary: "#325434",
        lightSecondary: "#466547",
        cream: "#F6F2EF",
        gradientPrimary:
          "linear-gradient(270deg, #FF8057 -23.81%, #FF6537 105.24%)",
        gradientSecondary:
          "linear-gradient(273deg, #18361A -1.96%, #325337 122.01%)",
      },
      fontFamily: {
        primary: ["gilmer", "sans-serif"],
        gilmer: ["gilmer", "sans-serif"],
        gilmerMedium: ["gilmer-medium", "sans-serif"],
        gilmerRegular: ["gilmer-regular", "sans-serif"],
        peralta: ["peralta", "serif"],
      },
      container: {
        center: true,
        screens: {
          xxsm: "100%",
          xsm: "100%",
          sm: "100%",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      screens: {
        xxsm: "321px",
        xsm: "376px",
        sm: "426px",
        smd: "500px",
        md: "769px",
        lg: "1025px",
        xl: "1281px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
