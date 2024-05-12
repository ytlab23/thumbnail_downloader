/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      // 'xs': '0px',
      // => @media (min-width: 0px) { ... }

      xsm: "576px",
      // => @media (min-width: 576px) { ... }
      sm: "672px",
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }
      xl: "1096px",
      xxl: "1200px",
      // => @media (min-width: 1200px) { ... }

      mobile: { max: "768px" },
    },
    extend: {},
  },
  plugins: [],
};
