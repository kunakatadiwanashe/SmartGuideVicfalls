import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // NativeWind specific
  nativeWind: true,
};

export default config;