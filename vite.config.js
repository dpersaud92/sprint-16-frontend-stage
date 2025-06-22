import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Sprint-16-FrontEnd/", // ⚠️ replace with your actual repo name if different
  plugins: [react()],
});
