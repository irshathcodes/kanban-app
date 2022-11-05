const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: colors.indigo,
			},
			// screens: {
			// 	mobile: { max: "640px" },
			// },
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
