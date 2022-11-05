const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xs: "400px",
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				primary: colors.indigo,
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
