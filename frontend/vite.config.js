import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		
	],
	build: {
		outDir: "dist",
	},
	publicDir: "public",
});