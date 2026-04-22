// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { resolve } from "path";
// import fs from "fs";

// export default defineConfig({
// 	plugins: [
// 		react(),
// 		tailwindcss(),
// 		// manually copy _redirects to dist
// 		{
// 			name: "copy-redirects",
// 			closeBundle() {
// 				fs.copyFileSync(
// 					resolve(__dirname, "public/_redirects"),
// 					resolve(__dirname, "dist/_redirects")
// 				);
// 			},
// 		},
// 	],
// 	build: {
// 		outDir: "dist",
// 	},
// 	publicDir: "public",
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'copy-redirects',
			closeBundle() {
				copyFileSync('public/_redirects', 'dist/_redirects')
			}
		}
	]
})