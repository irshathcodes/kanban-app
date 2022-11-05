import React, { useState, createContext, ReactNode } from "react";

interface ContextProps {
	showBoard: boolean;
	setShowBoard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext({} as ContextProps);

export default function AppContextProvider(props: { children: ReactNode }) {
	const [showBoard, setShowBoard] = useState(false);

	return (
		<AppContext.Provider value={{ showBoard, setShowBoard }}>
			{props.children}
		</AppContext.Provider>
	);
}
