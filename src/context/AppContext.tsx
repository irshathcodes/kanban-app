import React, { useState, createContext, ReactNode, useEffect } from "react";

type Theme = "dark" | "light";

interface ContextProps {
	showSidebar: boolean;
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const AppContext = createContext({} as ContextProps);

export default function AppContextProvider(props: { children: ReactNode }) {
	const [showSidebar, setShowSidebar] = useState(false);
	const [theme, setTheme] = useState<Theme>("dark");

	useEffect(() => {
		const isSystemPreferDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		const defaultTheme = isSystemPreferDarkMode ? "dark" : "light";
		const savedTheme = localStorage.getItem("theme") as Theme | null;

		if (!savedTheme) {
			localStorage.setItem("theme", defaultTheme);
			setTheme(defaultTheme);
			return;
		}

		setTheme(savedTheme);
	}, []);

	return (
		<AppContext.Provider
			value={{ showSidebar, setShowSidebar, theme, setTheme }}
		>
			{props.children}
		</AppContext.Provider>
	);
}
