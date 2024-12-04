import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [
		solidPlugin()
	],
	server: {
		port: 3000
	},
	preview: {
		port: 3000
	},
	build: {
		rollupOptions: {
			output: {
				entryFileNames: "index.js",
				assetFileNames: "assets/[name].[ext]",
			}
		}
	}
});