import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/**/*[.tsx, .jsx, .js, .ts]"
	],
	theme: {
		fontFamily: {
			"montserrat": "Montserrat",
			"mona": "Mona-Sans"
		},
		extend: {
			animation: {
				"fade-in-left": "fade-in-left 0.5s ease-in-out forwards"
			},
			keyframes: {
				"fade-in-left": {
					"0%": {
						opacity: "0",
						transform: "translateX(-1rem)",
						filter: "blur(0.25rem)"
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
						filter: "blur(0)"
					}
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate")
	]
} as Config;