/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "chat-background": "url('/background.jpg')",
      },
    },
  },
  plugins: [],
};
