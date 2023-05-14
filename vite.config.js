import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_SUPABASE_URL: "https://snpfxicbubuvqhuihxlv.supabase.co",
      REACT_APP_SUPABASE_API_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucGZ4aWNidWJ1dnFodWloeGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3NjYzNzgsImV4cCI6MTk5NjM0MjM3OH0.LtLnBmSF-ti0l7m6nxQGnrOhiUjnmP-X0HFruK2P5UY",
    },
  },
});
