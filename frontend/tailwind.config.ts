import type { Config } from "tailwindcss";
import flowbite from 'flowbite-react/tailwind'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sans-Serif Fonts
        roboto: ['"Roboto"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        lato: ['"Lato"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        
        // Serif Fonts
        merriweather: ['"Merriweather"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        georgia: ['"Georgia"', 'serif'],
        
        // Monospace Fonts
        sourceCodePro: ['"Source Code Pro"', 'monospace'],
        firaCode: ['"Fira Code"', 'monospace'],
        courierNew: ['"Courier New"', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

export default config;
