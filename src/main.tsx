import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AppContextProvider>
					<App />
				</AppContextProvider>
				<ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
