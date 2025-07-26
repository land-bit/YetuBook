/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx}"];
export const darkMode = "class";
export const theme = {
  extend: {
    colors: {
      bg: "var(--color-bg)",
      primary: "var(--color-primary)",
      text: "var(--color-text)",
      border: "var(--color-border)",
    },
  },
};
export const plugins = [];
