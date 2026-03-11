import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        burnt: {
          50: "#fff5ec",
          100: "#ffe3cd",
          300: "#f7ad6e",
          500: "#bf5700",
          700: "#8c3b00"
        },
        ink: "#1f2933",
        mist: "#eef4f6",
        pine: "#18363f"
      },
      boxShadow: {
        float: "0 24px 60px rgba(15, 23, 42, 0.14)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(191,87,0,.18), transparent 28%), radial-gradient(circle at top right, rgba(24,54,63,.22), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
