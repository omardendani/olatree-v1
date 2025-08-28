import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/olatree-v1/", // <-- nom exact de ton repo GitHub
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined, // Évite les problèmes de chunking
            }
        }
    }
});
