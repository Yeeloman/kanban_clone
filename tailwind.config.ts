import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors:{
      'whitesecond':'#f4f7fd',
      'whitethird':'#eaf0fa',
      'purple':'#635fc7',
      'lightpurple':'#DFDDFF',
      'grayy':'#828fa3',
      'blackprime':'#2b2c37',
      'blacksecond':'#20212c',
      'blackthird':'#23242f',
      'whiteprime':'#ffffff',
      'black':'black',
      'neutral':'neutral',
      'darkHover':'#A29CFD',
      'red':'#EC0F12'
    }
  },
  plugins: [],
  darkMode:'class',
};
export default config;
