/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Tell Tailwind where your components are located
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FCE38A", // Main splash screen yellow
          cream: "#FFF9E3", // Soft background/canvas
          dark: "#1A1A1A", // Primary text/headers
        },
        note: {
          mint: "#B8F2E6", // "Lunch Time" note
          purple: "#D3C9FF", // "Going out with puppy" note
          blue: "#A3E4F8", // "Work on Project" note
          peach: "#FFD8B1", // "Gaming time" note
          pink: "#FFB7B2", // Small accents/pin colors
        },
        gray: {
          subtle: "#8E8E8E", // Timestamps and subtext
          border: "#F0F0F0", // Search bar outlines
        },
      },
    },
  },
  plugins: [],
  // 2. Add the nativewind preset
  presets: [require("nativewind/preset")],
};
