/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#06B6D4",
        ink: "#0F172A",
        soft: "#F8FAFC",
        panel: "#FFFFFF"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)",
        glow: "0 14px 40px rgba(79, 70, 229, 0.25)",
        card: "0 22px 70px rgba(2, 8, 23, 0.09)"
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top left, rgba(79,70,229,0.18), transparent 36%), radial-gradient(circle at right center, rgba(6,182,212,0.16), transparent 28%), linear-gradient(180deg, #f8fbff 0%, #f6f9fc 100%)'
      }
    },
  },
  plugins: [],
};
